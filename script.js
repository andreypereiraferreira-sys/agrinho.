/* ================================
   FUNCIONALIDADES DO SITE
   ================================ */

// Elementos do DOM
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');
const btnTop = document.getElementById('btnTop');
const faqQuestions = document.querySelectorAll('.faq-question');
const contactForm = document.getElementById('contactForm');

// ================================
// 1. SISTEMA DE ABAS
// ================================

function initTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove classe active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona classe active ao botão clicado e seu conteúdo
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
            
            // Animação suave
            document.getElementById(tabName).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ================================
// 2. SISTEMA DE PESQUISA
// ================================

function searchContent() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        alert('👀 Digite algo para pesquisar!');
        return;
    }
    
    // Primeiro, vai para a aba de informações
    const infoTab = document.querySelector('[data-tab="info"]');
    infoTab.click();
    
    // Array com todo o conteúdo pesquisável
    const contentToSearch = {
        'agricultura de precisão': 'praticas',
        'drones': 'praticas',
        'sensores': 'praticas',
        'plantio direto': 'praticas',
        'rotação de culturas': 'praticas',
        'ilpf': 'praticas',
        'energia renovável': 'praticas',
        'controle biológico': 'praticas',
        'economia circular': 'praticas',
        'sustentável': 'info',
        'forte': 'info',
        'produtividade': 'info',
        'preservação': 'info',
        'inovação': 'info',
        'clima': 'faq',
        'custo': 'faq',
        'produção': 'faq',
        'renda': 'faq',
        'água': 'faq',
        'agrotóxico': 'faq'
    };
    
    // Encontra a aba mais relevante
    let targetTab = 'info';
    for (let keyword in contentToSearch) {
        if (searchTerm.includes(keyword)) {
            targetTab = contentToSearch[keyword];
            break;
        }
    }
    
    // Clica na aba relevante
    document.querySelector(`[data-tab="${targetTab}"]`).click();
    
    // Destaca o termo pesquisado no conteúdo
    highlightSearchTerm(searchTerm);
    
    // Mensagem de sucesso com animação
    showSearchFeedback(searchTerm);
}

function highlightSearchTerm(term) {
    const activeTab = document.querySelector('.tab-content.active');
    const walker = document.createTreeWalker(
        activeTab,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodesToReplace = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.nodeValue.toLowerCase().includes(term)) {
            nodesToReplace.push(node);
        }
    }
    
    nodesToReplace.forEach(node => {
        const regex = new RegExp(`(${term})`, 'gi');
        const span = document.createElement('span');
        span.innerHTML = node.nodeValue.replace(regex, '<span class="highlight">$1</span>');
        node.parentNode.replaceChild(span, node);
    });
}

function showSearchFeedback(term) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #FF6B6B, #FFB347);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        font-weight: bold;
        z-index: 2000;
        animation: slideDown 0.5s ease-out;
    `;
    feedback.textContent = `🔍 Pesquisando por: "${term}"`;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(() => feedback.remove(), 500);
    }, 2000);
}

// Event listeners para pesquisa
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchContent();
});

searchBtn.addEventListener('click', searchContent);

// ================================
// 3. ACCORDION FAQ
// ================================

function initFAQ() {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parent = question.parentElement;
            const isActive = parent.classList.contains('active');
            
            // Fecha todos os outros
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abre/fecha o clicado
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });
}

// ================================
// 4. BOTÃO "VOLTAR AO TOPO"
// ================================

function initScrollToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btnTop.classList.add('show');
        } else {
            btnTop.classList.remove('show');
        }
    });
    
    btnTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================
// 5. FORMULÁRIO DE CONTATO
// ================================

function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('.form-input');
        const isValid = Array.from(inputs).every(input => input.value.trim());
        
        if (!isValid) {
            alert('⚠️ Preencha todos os campos!');
            return;
        }
        
        // Simula envio
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✅ Mensagem enviada!';
        submitBtn.disabled = true;
        
        // Animação de sucesso
        showSuccessMessage();
        
        // Limpa formulário
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6BCB77, #4D96FF);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        font-size: 1.3rem;
        font-weight: bold;
        z-index: 3000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: scaleIn 0.5s ease-out;
        text-align: center;
    `;
    message.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
        <div>Obrigado pelo contato!</div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem;">Responderemos em breve!</div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'scaleOut 0.5s ease-out';
        setTimeout(() => message.remove(), 500);
    }, 2500);
}

// ================================
// 6. EFEITOS DE ENTRADA
// ================================

function initScrollAnimations() {
    const cards = document.querySelectorAll('.card, .pratica-card, .benefit-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => observer.observe(card));
}

// ================================
// 7. ADICIONAR ESTILOS DINÂMICOS
// ================================

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes scaleOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ================================
// 8. INICIALIZAÇÃO
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 Agro Forte & Sustentável - Carregado com sucesso!');
    
    initTabs();
    initFAQ();
    initScrollToTop();
    initContactForm();
    initScrollAnimations();
    addDynamicStyles();
    
    // Efeito de boas-vindas
    showWelcomeMessage();
});

function showWelcomeMessage() {
    const welcome = document.createElement('div');
    welcome.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        background: linear-gradient(135deg, #00D9FF, #00FFA3);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        font-weight: bold;
        z-index: 1500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInUp 0.6s ease-out;
    `;
    welcome.textContent = '👋 Bem-vindo ao Agro Forte & Sustentável!';
    document.body.appendChild(welcome);
    
    setTimeout(() => {
        welcome.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(() => welcome.remove(), 500);
    }, 4000);
}

// ================================
// 9. EASTER EGG
// ================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-8);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiPattern)) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    const eggs = [
        '🎉 Você é um eco-guerreiro!',
        '🌱 A sustentabilidade está no seu DNA!',
        '🌍 Parabéns por se importar com o planeta!',
        '💚 Você encontrou o segredo verde!'
    ];
    
    const randomEgg = eggs[Math.floor(Math.random() * eggs.length)];
    
    const easterEgg = document.createElement('div');
    easterEgg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 5000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: scaleIn 0.5s ease-out;
        text-align: center;
    `;
    easterEgg.textContent = randomEgg;
    document.body.appendChild(easterEgg);
    
    // Confete (simulado com emojis)
    createConfetti();
    
    setTimeout(() => {
        easterEgg.style.animation = 'scaleOut 0.5s ease-out';
        setTimeout(() => easterEgg.remove(), 500);
    }, 3000);
}

function createConfetti() {
    const emojis = ['🌱', '🌿', '🍃', '💚', '🌍', '☀️', '💧'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        confetti.textContent = emoji;
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -10px;
            font-size: ${Math.random() * 20 + 20}px;
            opacity: 1;
            z-index: 4999;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
    
    // Adiciona animação de queda
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                top: 100vh;
                opacity: 0;
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// ================================
// 10. LOGGER PARA DESENVOLVIMENTO
// ================================

console.log(`
╔════════════════════════════════════════╗
║  🌱 AGRO FORTE & SUSTENTÁVEL 🌍       ║
║  Desenvolvido com 💚 para o futuro    ║
╚════════════════════════════════════════╝

🎯 Funcionalidades:
✅ Sistema de abas dinâmicas
✅ Pesquisa em tempo real
✅ FAQ interativo
✅ Formulário de contato
✅ Animações suaves
✅ Responsivo (mobile, tablet, desktop)

🔓 Easter Egg: Tente a combinação Konami!
`);
