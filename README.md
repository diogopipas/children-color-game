# 🎨 Jogo de Classificação de Cores para Crianças

Um mini-jogo educativo interativo projetado para ajudar crianças a desenvolver habilidades de classificação e reconhecimento de cores através de uma experiência de aprendizagem divertida e envolvente.

![Jogo de Cores](https://img.shields.io/badge/Status-Completo-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Descrição

O **Jogo de Classificação de Cores** é uma ferramenta educativa que permite às crianças praticar a discriminação e classificação de cores de forma intuitiva e divertida. O jogo utiliza a mecânica de arrastar e soltar (drag-and-drop) com objetos do quotidiano, proporcionando uma experiência de aprendizagem prática e visual.

## ✨ Características Principais

### 🎮 Mecânica de Jogo
- **Drag-and-Drop Intuitivo**: Interface simples e responsiva
- **4 Cores Principais**: Vermelho, Azul, Verde e Amarelo
- **Objetos do Dia-a-Dia**: Frutas, brinquedos e objetos familiares
- **Feedback Imediato**: Resposta visual e sonora a cada ação

### 🎯 Níveis de Dificuldade
1. **Nível Fácil**: 4 objetos para classificar
2. **Nível Médio**: 8 objetos diferentes
3. **Nível Difícil**: 12 objetos desafiantes

### 🎨 Design
- Interface limpa e colorida
- Animações suaves e atrativas
- Efeitos visuais de partículas
- Design responsivo para diferentes dispositivos

### 🔊 Feedback
- **Sucesso**: Som agradável, animação de estrelas e partículas coloridas
- **Erro**: Feedback gentil com animação de shake
- **Vitória**: Celebração com confetti e mensagem motivadora

## 🧠 Benefícios Educativos

Este jogo desenvolve o **Raciocínio Lógico** através da **Classificação**. A criança aprenderá a:

- Identificar que objetos diferentes podem ser agrupados sob uma característica comum (cor)
- Ignorar outros atributos como forma, tamanho ou categoria semântica
- Desenvolver conceitos abstratos de categorização
- Melhorar a coordenação motora com o drag-and-drop
- Aumentar a concentração e atenção aos detalhes

## 🚀 Como Usar

### Instalação

1. Clone ou baixe este repositório:
```bash
git clone https://github.com/seu-usuario/children-color-game.git
```

2. Navegue até a pasta do projeto:
```bash
cd children-color-game
```

3. Abra o arquivo `index.html` no seu navegador preferido

**Nota**: Este é um jogo puramente front-end que não requer servidor ou instalação de dependências!

### Como Jogar

1. **Escolha o Nível**: Selecione Fácil, Médio ou Difícil
2. **Leia as Informações**: Clique no botão "ℹ️ Informações" para ver os benefícios e instruções
3. **Arraste os Objetos**: Pegue cada objeto e arraste para a caixa da cor correspondente
4. **Receba Feedback**: Veja e ouça o feedback imediato
5. **Complete o Jogo**: Classifique todos os objetos corretamente para vencer!

## 📁 Estrutura do Projeto

```
children-color-game/
│
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica do jogo e interatividade
└── README.md           # Documentação
```

## 🎯 Público-Alvo

- Crianças em idade pré-escolar e escolar (3-8 anos)
- Crianças com necessidades especiais de desenvolvimento
- Contexto educativo com supervisão de:
  - Terapeutas
  - Pais
  - Educadores

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Animações, gradientes e design moderno
- **JavaScript ES6+**: Lógica de jogo e interatividade
- **Web Audio API**: Sons dinâmicos sem arquivos externos
- **Drag and Drop API**: Interação nativa do navegador

## 🌐 Compatibilidade

O jogo é compatível com navegadores modernos:
- ✅ Chrome/Edge (versão 90+)
- ✅ Firefox (versão 88+)
- ✅ Safari (versão 14+)
- ✅ Opera (versão 76+)

## 📱 Responsividade

O jogo adapta-se automaticamente a diferentes tamanhos de tela:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🎨 Personalização

### Adicionar Novos Objetos

Edite o arquivo `script.js` e adicione objetos ao `gameConfig`:

```javascript
const gameConfig = {
    easy: [
        { emoji: '🍎', name: 'Maçã', color: 'red' },
        // Adicione mais objetos aqui
    ]
};
```

### Alterar Cores

Modifique as cores no arquivo `styles.css`:

```css
#redBox {
    border-color: #ff4444; /* Sua cor personalizada */
}
```

## 🔮 Funcionalidades Futuras

- [ ] Modo de tempo cronometrado
- [ ] Sistema de rankings
- [ ] Mais níveis de dificuldade
- [ ] Novos temas (animais, formas, números)
- [ ] Modo multiplayer
- [ ] Estatísticas de progresso
- [ ] Exportação de dados para terapeutas

## 👥 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Submeter pull requests

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🙏 Agradecimentos

Desenvolvido com ❤️ para ajudar no desenvolvimento cognitivo de crianças através de jogos educativos interativos.

---

**Nota**: Este jogo foi desenvolvido com foco em acessibilidade e inclusão, proporcionando uma ferramenta útil para terapeutas, educadores e pais no apoio ao desenvolvimento infantil.

## 📞 Contato

Para questões, sugestões ou feedback, entre em contato através de:
- Issues do GitHub
- Email: [seu-email@exemplo.com]

---

**Versão**: 1.0.0  
**Última Atualização**: Novembro 2025