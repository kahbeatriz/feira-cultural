const scenarios = [
  {
    icon: "💬",
    title: "Uma publicação viral",
    text: "Uma pessoa publica um comentário ofensivo. Em pouco tempo, milhares de usuários começam a compartilhar o perfil dela e a enviar mensagens agressivas.",
    choices: [
      "Compartilhar para que mais pessoas ataquem.",
      "Não participar dos ataques e denunciar o conteúdo abusivo.",
      "Procurar entender o contexto e incentivar uma conversa respeitosa."
    ],
    feedback: [
      "Essa atitude amplia a exposição e pode transformar uma crítica em perseguição. Compartilhar também é participar da propagação.",
      "Boa reflexão! Denunciar conteúdos abusivos e não alimentar ataques ajuda a reduzir a violência digital.",
      "Buscar contexto e incentivar o diálogo pode contribuir para uma discussão mais responsável, sem normalizar ofensas."
    ]
  },
  {
    icon: "📱",
    title: "Um vídeo fora de contexto",
    text: "Um vídeo curto de uma estudante começa a circular. Muitas pessoas fazem julgamentos sem conhecer a situação completa.",
    choices: [
      "Acreditar em tudo e comentar sem verificar.",
      "Evitar compartilhar e procurar informações confiáveis antes de formar uma opinião.",
      "Fazer piadas para acompanhar os comentários."
    ],
    feedback: [
      "Conteúdos curtos podem não mostrar toda a situação. Julgar sem contexto pode espalhar desinformação e injustiça.",
      "Essa é uma atitude responsável: verificar informações e evitar compartilhar algo duvidoso reduz danos.",
      "Piadas também podem reforçar humilhações e aumentar a exposição de quem está sendo alvo."
    ]
  },
  {
    icon: "🤝",
    title: "Uma discussão nas redes",
    text: "Duas pessoas discordam sobre um assunto. Outros usuários começam a atacar uma delas por pensar diferente.",
    choices: [
      "Defender o direito ao diálogo e discordar sem ofender.",
      "Atacar também quem pensa diferente.",
      "Incentivar que todos denunciem a pessoa só por ter outra opinião."
    ],
    feedback: [
      "Muito bem! É possível discordar e questionar ideias sem atacar a dignidade de alguém.",
      "Responder com agressividade aumenta o conflito e dificulta qualquer possibilidade de diálogo.",
      "Denúncias devem ser usadas para conteúdos que violam regras, não como punição por uma opinião diferente."
    ]
  }
];

let scenarioIndex = 0;

const scenarioCount = document.getElementById("scenarioCount");
const scenarioTitle = document.getElementById("scenarioTitle");
const scenarioText = document.getElementById("scenarioText");
const scenarioIcon = document.getElementById("scenarioIcon");
const choicesBox = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const nextScenario = document.getElementById("nextScenario");
const progressBar = document.getElementById("progressBar");
const scenarioHint = document.getElementById("scenarioHint");

function renderScenario() {
  const scenario = scenarios[scenarioIndex];

  scenarioCount.textContent =
    `SITUAÇÃO 0${scenarioIndex + 1} DE 0${scenarios.length}`;

  scenarioTitle.textContent = scenario.title;
  scenarioText.textContent = scenario.text;
  scenarioIcon.textContent = scenario.icon;

  progressBar.style.width =
    `${((scenarioIndex + 1) / scenarios.length) * 100}%`;

  feedback.hidden = true;
  feedback.textContent = "";

  nextScenario.disabled = true;

  nextScenario.textContent =
    scenarioIndex === scenarios.length - 1
      ? "Voltar ao início ↻"
      : "Próxima situação →";

  scenarioHint.textContent =
    "Pense nas consequências de cada atitude.";

  choicesBox.innerHTML = "";

  scenario.choices.forEach((choice, index) => {
    const button = document.createElement("button");

    button.className = "choice";
    button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span>`;

    const label = document.createTextNode(choice);
    button.appendChild(label);

    button.addEventListener("click", () => {
      selectScenarioChoice(index);
    });

    choicesBox.appendChild(button);
  });
}

function selectScenarioChoice(index) {
  const scenario = scenarios[scenarioIndex];

  [...choicesBox.children].forEach((button, i) => {
    button.disabled = true;

    if (i === index) {
      button.classList.add("selected");
    }
  });

  feedback.textContent = scenario.feedback[index];
  feedback.hidden = false;

  nextScenario.disabled = false;

  scenarioHint.textContent =
    "Toda escolha tem consequências no ambiente digital.";
}

nextScenario.addEventListener("click", () => {
  scenarioIndex = (scenarioIndex + 1) % scenarios.length;
  renderScenario();
});

renderScenario();


// QUIZ INTERATIVO

const questions = [
  {
    q: "Qual alternativa descreve melhor o discurso de ódio?",
    a: [
      "Apenas uma opinião diferente.",
      "Uma comunicação que ataca ou incentiva discriminação contra pessoas ou grupos.",
      "Qualquer crítica feita na internet."
    ],
    correct: 1,
    why: "Discurso de ódio ataca pessoas ou grupos e pode incentivar discriminação ou hostilidade. Discordar, por si só, não é discurso de ódio."
  },
  {
    q: "Qual atitude ajuda a evitar a propagação de ataques virtuais?",
    a: [
      "Compartilhar para expor ainda mais.",
      "Responder com ofensas.",
      "Não alimentar ataques e denunciar conteúdos abusivos."
    ],
    correct: 2,
    why: "Não compartilhar ataques e utilizar os canais de denúncia são atitudes que ajudam a tornar os espaços digitais mais seguros."
  },
  {
    q: "Por que o cancelamento virtual é um tema sociológico?",
    a: [
      "Porque envolve normas, grupos, poder e exclusão social.",
      "Porque acontece somente com pessoas famosas.",
      "Porque não tem relação com a vida em sociedade."
    ],
    correct: 0,
    why: "A Sociologia estuda as relações sociais. O cancelamento envolve julgamentos coletivos, normas, influência e exclusão."
  },
  {
    q: "Liberdade de expressão significa poder atacar qualquer pessoa sem consequências?",
    a: [
      "Sim, tudo é permitido na internet.",
      "Não. A liberdade de expressão convive com direitos e responsabilidades.",
      "Sim, desde que seja em uma conta privada."
    ],
    correct: 1,
    why: "A liberdade de expressão é um direito importante, mas não elimina a responsabilidade por violações de direitos e práticas discriminatórias."
  }
];

let questionIndex = 0;
let score = 0;
let answered = false;
let quizFinished = false;

const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const quizFeedback = document.getElementById("quizFeedback");
const quizNext = document.getElementById("quizNext");
const quizProgress = document.getElementById("quizProgress");
const quizScore = document.getElementById("quizScore");
const quizBar = document.getElementById("quizBar");

function renderQuestion() {
  answered = false;

  const question = questions[questionIndex];

  quizProgress.textContent =
    `PERGUNTA ${questionIndex + 1} DE ${questions.length}`;

  quizScore.textContent =
    `${score} ${score === 1 ? "ACERTO" : "ACERTOS"}`;

  quizBar.style.width =
    `${(questionIndex / questions.length) * 100}%`;

  quizQuestion.textContent = question.q;
  quizFeedback.textContent = "";

  quizNext.disabled = true;

  quizNext.textContent =
    questionIndex === questions.length - 1
      ? "Ver resultado →"
      : "Próxima pergunta →";

  quizAnswers.innerHTML = "";

  question.a.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "quiz-answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      answerQuestion(index);
    });

    quizAnswers.appendChild(button);
  });
}

function answerQuestion(index) {
  if (answered) return;

  answered = true;

  const question = questions[questionIndex];
  const buttons = [...quizAnswers.children];

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === question.correct) {
      button.classList.add("correct");
    }

    if (i === index && i !== question.correct) {
      button.classList.add("wrong");
    }
  });

  if (index === question.correct) {
    score++;
  }

  quizScore.textContent =
    `${score} ${score === 1 ? "ACERTO" : "ACERTOS"}`;

  quizFeedback.textContent =
    `${index === question.correct ? "✓ Resposta correta! " : "Vamos refletir: "}${question.why}`;

  quizNext.disabled = false;

  quizBar.style.width =
    `${((questionIndex + 1) / questions.length) * 100}%`;
}

quizNext.addEventListener("click", () => {
  if (quizFinished) {
    questionIndex = 0;
    score = 0;
    quizFinished = false;

    renderQuestion();
  } else if (questionIndex < questions.length - 1) {
    questionIndex++;

    renderQuestion();
  } else {
    quizFinished = true;

    quizQuestion.textContent =
      `Você acertou ${score} de ${questions.length} perguntas!`;

    quizAnswers.innerHTML = "";

    quizFeedback.textContent =
      score === questions.length
        ? "Excelente! Você demonstrou conhecer os conceitos e a importância da responsabilidade digital."
        : "Obrigado por participar! Mais importante do que a pontuação é continuar refletindo sobre nossas atitudes na internet.";

    quizNext.textContent = "Refazer quiz ↻";
    quizNext.disabled = false;
  }
});

renderQuestion();


// MENU DE NAVEGAÇÃO

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});