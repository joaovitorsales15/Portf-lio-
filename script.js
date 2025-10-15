const typingText = document.getElementById('typing-text');
const langToggleBtn = document.getElementById('lang-toggle');

// ====== FRASES DIGITADAS ======
const phrasesPT = [
  "Formado em Análise e Desenvolvimento de Sistemas.",
  "Pós-graduação em Ciência de Dados e Big Data Analytics.",
  "Certificado em Engenharia de Dados, SQL, Power BI e Excel.",
  "Apaixonado por transformar dados em insights estratégicos."
];

const phrasesEN = [
  "Graduated in Systems Analysis and Development.",
  "Postgraduate in Data Science and Big Data Analytics.",
  "Certified in Data Engineering, SQL, Power BI and Excel.",
  "Passionate about turning data into strategic insights."
];

// ====== VARIÁVEIS DE ESTADO ======
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let isEnglish = false;
let isWaiting = false;

// ====== FUNÇÃO DE COR DINÂMICA ======
function setTypingColor(progress) {
  const startColor = [70, 107, 176]; // azul claro
  const endColor = [26, 46, 74];     // azul escuro
  const color = startColor.map((startC, i) => {
    const endC = endColor[i];
    return Math.round(startC + (endC - startC) * progress);
  });
  typingText.style.color = `rgb(${color.join(",")})`;
}

// ====== EFEITO DE DIGITAÇÃO ======
function type() {
  const phrases = isEnglish ? phrasesEN : phrasesPT;
  const fullText = phrases[currentPhrase];

  if (isWaiting) return;

  if (!isDeleting) {
    typingText.textContent = fullText.substring(0, currentChar + 1) + "|";
    setTypingColor(currentChar / fullText.length);
    currentChar++;

    if (currentChar === fullText.length) {
      isWaiting = true;
      setTimeout(() => {
        isDeleting = true;
        isWaiting = false;
        type();
      }, 2000);
      return;
    }
  } else {
    typingText.textContent = fullText.substring(0, currentChar - 1) + "|";
    setTypingColor(currentChar / fullText.length);
    currentChar--;

    if (currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
        type();
      }, 500);
      return;
    }
  }

  const delay = isDeleting ? 50 : 120;
  setTimeout(type, delay);
}

// ====== CURSOR PISCANDO ======
setInterval(() => {
  if (typingText.textContent.endsWith("|")) {
    typingText.textContent = typingText.textContent.slice(0, -1);
  } else {
    typingText.textContent += "|";
  }
}, 600);

// ====== BOTÃO ANIMADO ======
langToggleBtn.style.transition = 'background-color 0.4s ease, transform 0.3s ease';
langToggleBtn.addEventListener('mouseenter', () => {
  langToggleBtn.style.backgroundColor = '#2e4569';
  langToggleBtn.style.transform = 'scale(1.1)';
});
langToggleBtn.addEventListener('mouseleave', () => {
  langToggleBtn.style.backgroundColor = '#1a2e4a';
  langToggleBtn.style.transform = 'scale(1)';
});

// ====== TROCA DE IDIOMA ======
langToggleBtn.addEventListener('click', () => {
  // Troca estado do idioma
  isEnglish = !isEnglish;
  langToggleBtn.textContent = isEnglish ? '🌐 PT' : '🌐 EN';

  // Atualiza os textos com base nos atributos data-pt / data-en
  document.querySelectorAll('[data-pt]').forEach(el => {
    el.textContent = isEnglish ? el.dataset.en : el.dataset.pt;
  });

  // Reinicia o efeito de digitação no novo idioma
  currentPhrase = 0;
  currentChar = 0;
  isDeleting = false;
  isWaiting = false;
  typingText.textContent = '';
  type();
});

// ====== ANO AUTOMÁTICO NO RODAPÉ ======
document.getElementById('year').textContent = new Date().getFullYear();

// ====== INICIA O EFEITO ======
type();