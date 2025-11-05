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

// Sons (usando Web Audio API para feedback sonoro)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSuccessSound() {
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
            levelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLevel = button.dataset.level;
            restartGame();
        });
    });
}

// Inicializar Jogo
function initGame() {
    score = 0;
    updateScore();
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
    
    // Remover objeto com animação
    draggedElement.style.transition = 'all 0.5s ease';
    draggedElement.style.transform = 'scale(0) rotate(360deg)';
    draggedElement.style.opacity = '0';
    
    setTimeout(() => {
        draggedElement.remove();
        objectsRemaining--;
        score += 10;
        updateScore();
        
        if (objectsRemaining === 0) {
            showVictory();
        }
    }, 500);
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
    feedback.style.color = type === 'success' ? '#44ff44' : '#ff4444';
    
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
        document.getElementById('finalScore').textContent = score;
        document.getElementById('victoryMessage').classList.remove('hidden');
        
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

// Reiniciar Jogo
function restartGame() {
    document.getElementById('victoryMessage').classList.add('hidden');
    score = 0;
    initGame();
}

// Prevenir comportamento padrão de arrastar imagens
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
});

