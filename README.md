# 🔬 Laboratório Tech — Batalha Matemática

**Projeto pedagógico gamificado** desenvolvido pelo **Prof. Alessandro Barbosa (Prof. Alê)**  
Escola Estadual PEI Prof. Milton de Tolosa — Campinas/SP  
Pós-graduação em Ensino de Ciências e Matemática — IFSP Campus Capivari  
Supervisão: Profa. Dra. Débora Alfaro

---

## Sobre o Projeto

Jogo de batalha matemática para uso em telão no pátio escolar, desenvolvido com princípios do **Desenho Universal para a Aprendizagem (DUA)** e metodologias ativas de gamificação.

Evento: **Dia da Matemática — 06 de maio de 2026**  
Público: Turmas 7ºA e 7ºB — Ensino Fundamental

---

## Estrutura Real do Projeto

```
laboratorio-tech-batalha-matematica/
├── index.html                          # Interface principal
├── css/
│   └── style.css                       # Estilos (sem conflitos de merge)
├── js/
│   ├── main.js                         # Orquestrador principal — v6.0
│   ├── ui-manager.js                   # HUD, modais, voz, dashboard BNCC
│   ├── game-engine.js                  # Canvas e animações
│   ├── engine/
│   │   ├── gameState.js                # Estado global do jogo (G)
│   │   └── selector.js                 # Seleção inteligente de questões
│   └── data/
│       └── questions/
│           ├── index.js                # Mapa central dos blocos
│           ├── bloco1.js               # Bloco 1: Inteiros — Soma e Subtração
│           ├── bloco2.js               # Bloco 2: Múltiplos e Divisores
│           ├── bloco3.js               # Bloco 3: Inteiros — Multiplicação
│           ├── bloco4.js               # Bloco 4: Frações
│           ├── bloco5.js               # Bloco 5: MMC e MDC
│           ├── trilha1.js              # 40 questões — Inteiros: Soma/Subtração
│           ├── trilha2.js              # 40 questões — Múltiplos e Divisores
│           ├── trilha3.js              # 40 questões — Inteiros: Multiplicação
│           ├── trilha5.js              # 25 questões — Frações
│           └── trilha6.js              # 25 questões — MMC e MDC
├── avatar_estatico.png                 # Avatar do Prof. Alê Chocolate
├── avatar_jump.mp4                     # Animação de acerto
├── avatar_chute.mp4                    # Animação de erro
└── trilha.mp3                          # Música de fundo
```

---

## Blocos de Conteúdo (1º Bimestre — 6º e 7º anos)

| Bloco | Conteúdo | BNCC |
|-------|----------|------|
| 1 | Inteiros: Soma e Subtração | EF07MA03 |
| 2 | Múltiplos, Divisores e Critérios | EF07MA01 / EF06MA06 |
| 3 | Inteiros: Multiplicação e Divisão | EF07MA04 |
| 4 | Frações: conceito, operações, decimal, % | EF06MA07-09 |
| 5 | MMC e MDC | EF06MA05 |

---

## Modo Batalha — 7ºA vs 7ºB

- Placar em tempo real no telão
- Sistema de combo (acertos consecutivos aumentam pontuação)
- Bônus relâmpago para respostas rápidas
- Rodada especial a cada 5 questões (pontos dobrados)
- Tela de campeão com fogos ao atingir 100 pontos
- **Modo Buzzer**: teclas [A] e [B] para controle de turno pelo professor

---

## Acessibilidade (DUA)

- Alto contraste e botões grandes
- Navegação por teclado (Tab + Enter)
- Síntese de voz (TTS em português)
- Feedback visual e auditivo imediato
- Adaptado para alunos TEA, TDAH, dislexia e discalculia

---

## Ferramentas do Professor

- **📊 Dashboard BNCC**: mapa de desempenho por habilidade com análise clínica
- **📥 Exportar CSV**: relatório completo para registro e devolutiva
- **🔄 / 🎯 Modo Buzzer**: alterna entre turno automático e buzzer por teclado
