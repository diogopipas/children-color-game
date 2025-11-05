// Configuração do Jogo
const gameConfig = {
    easy: [
        { image: 'images/red-apple.png', name: 'Maçã', color: 'red' },
        { image: 'images/blue-car.png', name: 'Carro', color: 'blue' },
        { image: 'images/green-leaf.png', name: 'Folha', color: 'green' },
        { image: 'images/yellow-banana.png', name: 'Banana', color: 'yellow' }
    ],
    medium: [
        { image: 'images/red-apple.png', name: 'Maçã', color: 'red' },
        { image: 'images/red-strawberry.png', name: 'Morango', color: 'red' },
        { image: 'images/blue-car.png', name: 'Carro', color: 'blue' },
        { image: 'images/blue-butterfly.png', name: 'Borboleta', color: 'blue' },
        { image: 'images/green-leaf.png', name: 'Folha', color: 'green' },
        { image: 'images/green-frog.png', name: 'Sapo', color: 'green' },
        { image: 'images/yellow-banana.png', name: 'Banana', color: 'yellow' }
    ],
    hard: [
        { image: 'images/red-apple.png', name: 'Maçã', color: 'red' },
        { image: 'images/red-strawberry.png', name: 'Morango', color: 'red' },
        { image: 'images/red-rose.png', name: 'Rosa', color: 'red' },
        { image: 'images/blue-car.png', name: 'Carro', color: 'blue' },
        { image: 'images/blue-butterfly.png', name: 'Borboleta', color: 'blue' },
        { image: 'images/green-leaf.png', name: 'Folha', color: 'green' },
        { image: 'images/green-frog.png', name: 'Sapo', color: 'green' },
        { image: 'images/green-tree.png', name: 'Árvore', color: 'green' },
        { image: 'images/yellow-banana.png', name: 'Banana', color: 'yellow' },
        { image: 'images/yellow-rubber-ducky.png', name: 'Patinho', color: 'yellow' }
    ]
};

// Estado do Jogo
let currentLevel = 'easy';
let score = 0;
let objectsRemaining = 0;
let draggedElement = null;
let soundEnabled = true;

// Sistema de Progresso de Níveis
const levelOrder = ['easy', 'medium', 'hard'];
let unlockedLevels = loadProgress();

// Funções de Progresso
function loadProgress() {
    const saved = localStorage.getItem('colorGameProgress');
    if (saved) {
        return JSON.parse(saved);
    }
    // Por padrão, apenas o nível fácil está desbloqueado
    return ['easy'];
}

function saveProgress() {
    localStorage.setItem('colorGameProgress', JSON.stringify(unlockedLevels));
}

function unlockNextLevel() {
    const currentIndex = levelOrder.indexOf(currentLevel);
    if (currentIndex < levelOrder.length - 1) {
        const nextLevel = levelOrder[currentIndex + 1];
        if (!unlockedLevels.includes(nextLevel)) {
            unlockedLevels.push(nextLevel);
            saveProgress();
            updateLevelButtons();
            return nextLevel;
        }
    }
    return null;
}

function isLevelUnlocked(level) {
    return unlockedLevels.includes(level);
}

// Sons (usando Web Audio API para feedback sonoro)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSuccessSound() {
    if (!soundEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523.25; // C5
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Segunda nota para melodia
    setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        
        osc2.frequency.value = 659.25; // E5
        osc2.type = 'sine';
        
        gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.5);
    }, 100);
}

function playErrorSound() {
    if (!soundEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 350;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupModal();
    setupLevelButtons();
    setupSoundToggle();
    
    // Garantir que o jogo inicia no primeiro nível desbloqueado
    if (!isLevelUnlocked(currentLevel)) {
        currentLevel = unlockedLevels[0] || 'easy';
    }
    
    initGame();
});

// Modal de Informações
function setupModal() {
    const modal = document.getElementById('infoModal');
    const infoButton = document.getElementById('infoButton');
    const closeButton = document.querySelector('.close');
    
    // Mostrar modal no início
    modal.style.display = 'flex';
    
    infoButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// Seletor de Nível
function setupLevelButtons() {
    const levelButtons = document.querySelectorAll('.level-btn');
    
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.dataset.level;
            
            // Verificar se o nível está desbloqueado
            if (!isLevelUnlocked(level)) {
                showFeedback('🔒 Complete o nível anterior primeiro!', 'error');
                return;
            }
            
            levelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLevel = level;
            restartGame();
        });
    });
    
    updateLevelButtons();
}

function updateLevelButtons() {
    const levelButtons = document.querySelectorAll('.level-btn');
    
    levelButtons.forEach(button => {
        const level = button.dataset.level;
        const isUnlocked = isLevelUnlocked(level);
        
        if (isUnlocked) {
            button.classList.remove('locked');
            button.disabled = false;
            // Remover ícone de cadeado se existir
            const lockIcon = button.querySelector('.lock-icon');
            if (lockIcon) {
                lockIcon.remove();
            }
        } else {
            button.classList.add('locked');
            button.disabled = true;
            // Adicionar ícone de cadeado se não existir
            if (!button.querySelector('.lock-icon')) {
                const lockIcon = document.createElement('span');
                lockIcon.className = 'lock-icon';
                lockIcon.textContent = ' 🔒';
                button.appendChild(lockIcon);
            }
        }
    });
}

// Toggle de Som
function setupSoundToggle() {
    const soundButton = document.getElementById('soundButton');
    
    soundButton.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        updateSoundButton();
    });
    
    updateSoundButton();
}

function updateSoundButton() {
    const soundButton = document.getElementById('soundButton');
    soundButton.textContent = soundEnabled ? '🔊 Som' : '🔇 Som';
    soundButton.classList.toggle('sound-off', !soundEnabled);
}

// Limpar Caixas
function clearBoxes() {
    const boxes = document.querySelectorAll('.color-box');
    boxes.forEach(box => {
        const boxContent = box.querySelector('.box-content');
        if (boxContent) {
            boxContent.remove();
        }
    });
}

// Inicializar Jogo
function initGame() {
    score = 0;
    updateScore();
    clearBoxes();
    createObjects();
    setupDragAndDrop();
}

// Criar Objetos
function createObjects() {
    const container = document.getElementById('objectsContainer');
    container.innerHTML = '';
    
    const objects = gameConfig[currentLevel];
    objectsRemaining = objects.length;
    
    // Embaralhar objetos
    const shuffledObjects = [...objects].sort(() => Math.random() - 0.5);
    
    shuffledObjects.forEach((obj, index) => {
        const objectElement = document.createElement('div');
        objectElement.className = 'draggable-object';
        objectElement.draggable = true;
        objectElement.dataset.color = obj.color;
        objectElement.dataset.index = index;
        
        objectElement.innerHTML = `
            <img src="${obj.image}" alt="${obj.name}" class="object-image" draggable="false">
            <div class="object-name">${obj.name}</div>
        `;
        
        container.appendChild(objectElement);
    });
}

// Drag and Drop
function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable-object');
    const boxes = document.querySelectorAll('.color-box');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });
    
    boxes.forEach(box => {
        box.addEventListener('dragover', handleDragOver);
        box.addEventListener('drop', handleDrop);
        box.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    e.target.closest('.color-box').classList.add('drag-over');
    return false;
}

function handleDragLeave(e) {
    e.target.closest('.color-box').classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    const box = e.target.closest('.color-box');
    box.classList.remove('drag-over');
    
    const draggedColor = draggedElement.dataset.color;
    const boxColor = box.dataset.color;
    
    if (draggedColor === boxColor) {
        handleCorrectDrop(box);
    } else {
        handleIncorrectDrop();
    }
    
    return false;
}

function handleCorrectDrop(box) {
    playSuccessSound();
    showFeedback('✨ Muito Bem! ✨', 'success');
    
    // Animação de sucesso
    box.classList.add('success-animation');
    setTimeout(() => box.classList.remove('success-animation'), 500);
    
    // Criar partículas
    createParticles(box, draggedElement.dataset.color);
    
    // Tornar o objeto não-arrastável
    draggedElement.draggable = false;
    draggedElement.classList.add('placed-in-box');
    draggedElement.classList.remove('dragging');
    
    // Adicionar o objeto à caixa
    const boxContent = box.querySelector('.box-content');
    if (!boxContent) {
        const content = document.createElement('div');
        content.className = 'box-content';
        box.appendChild(content);
    }
    box.querySelector('.box-content').appendChild(draggedElement);
    
    // Atualizar pontuação e estado
    objectsRemaining--;
    score += 10;
    updateScore();
    
    if (objectsRemaining === 0) {
        showVictory();
    }
}

function handleIncorrectDrop() {
    playErrorSound();
    showFeedback('❌ Tenta Outra Vez! ❌', 'error');
    
    // Animação de erro
    draggedElement.classList.add('error-animation');
    setTimeout(() => draggedElement.classList.remove('error-animation'), 500);
}

// Criar Partículas
function createParticles(box, color) {
    const colors = {
        red: '#ff4444',
        blue: '#4444ff',
        green: '#44ff44',
        yellow: '#ffdd44'
    };
    
    const rect = box.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = colors[color];
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Feedback Visual
function showFeedback(message, type) {
    const container = document.getElementById('feedbackContainer');
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.textContent = message;
    feedback.style.color = type === 'success' ? '#22aa22' : '#cc4444';
    
    container.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 1000);
}

// Atualizar Pontuação
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Mostrar Vitória
function showVictory() {
    setTimeout(() => {
        // Desbloquear próximo nível
        const nextLevel = unlockNextLevel();
        
        document.getElementById('finalScore').textContent = score;
        
        // Atualizar mensagem de vitória se desbloqueou novo nível
        const victoryMessage = document.getElementById('victoryMessage');
        const victoryText = victoryMessage.querySelector('p');
        const nextLevelButton = document.getElementById('nextLevelButton');
        
        // Verificar se não está no último nível
        const currentIndex = levelOrder.indexOf(currentLevel);
        const isLastLevel = currentIndex === levelOrder.length - 1;
        
        // Mostrar ou esconder o botão de próximo nível
        if (!isLastLevel) {
            nextLevelButton.style.display = 'inline-block';
        } else {
            nextLevelButton.style.display = 'none';
        }
        
        if (nextLevel) {
            const levelNames = {
                'easy': 'Fácil',
                'medium': 'Médio',
                'hard': 'Difícil'
            };
            victoryText.textContent = `Parabéns! Nível ${levelNames[nextLevel]} desbloqueado! 🔓`;
        } else if (currentLevel === 'hard') {
            victoryText.textContent = 'Incrível! Completaste TODOS os níveis! És um mestre das cores! 🏆';
        } else {
            victoryText.textContent = 'Classificaste todas as cores corretamente!';
        }
        
        victoryMessage.classList.remove('hidden');
        
        // Efeito de confetti
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 30);
        }
    }, 500);
}

function createConfetti() {
    const colors = ['#ff4444', '#4444ff', '#44ff44', '#ffdd44', '#ff69b4', '#ffa500'];
    const confetti = document.createElement('div');
    confetti.className = 'particle';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.animation = 'particleFloat 3s ease-out forwards';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
}

// Ir para o Próximo Nível
function goToNextLevel() {
    const currentIndex = levelOrder.indexOf(currentLevel);
    if (currentIndex < levelOrder.length - 1) {
        const nextLevel = levelOrder[currentIndex + 1];
        
        // Mudar para o próximo nível
        currentLevel = nextLevel;
        
        // Atualizar botões de nível
        const levelButtons = document.querySelectorAll('.level-btn');
        levelButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.level === nextLevel) {
                btn.classList.add('active');
            }
        });
        
        // Fechar popup e reiniciar jogo no novo nível
        document.getElementById('victoryMessage').classList.add('hidden');
        score = 0;
        initGame();
    }
}

// Reiniciar Jogo
function restartGame() {
    document.getElementById('victoryMessage').classList.add('hidden');
    score = 0;
    initGame();
}

// Reiniciar Progresso (desbloquear todos os níveis)
function resetProgress() {
    if (confirm('Tem certeza que deseja reiniciar todo o progresso? Todos os níveis serão bloqueados novamente, exceto o Fácil.')) {
        unlockedLevels = ['easy'];
        saveProgress();
        currentLevel = 'easy';
        updateLevelButtons();
        
        // Atualizar botão ativo
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.level === 'easy') {
                btn.classList.add('active');
            }
        });
        
        restartGame();
        showFeedback('✨ Progresso reiniciado! Comece do nível Fácil!', 'success');
    }
}

// Prevenir comportamento padrão de arrastar imagens
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
});

