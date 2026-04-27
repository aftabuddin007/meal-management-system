// --- Preloader ---
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => { preloader.style.display = 'none'; }, 500);
});

// --- Dark/Light Mode Toggle ---
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeBtn.querySelector('i');

// Check local storage for theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  icon.classList.replace('fa-moon', 'fa-sun');
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  let theme = 'light';
  
  if (body.classList.contains('dark-mode')) {
    theme = 'dark';
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
  localStorage.setItem('theme', theme);
});

// --- Scroll Reveal Animation ---
// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Trigger counter animation
      if(entry.target.id === 'hero') {
        runCounters();
      }

      // NEW: Trigger Bar Chart Animation
      if(entry.target.id === 'dashboard') {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
          // Grabs the target height from the HTML data attribute and applies it
          const targetHeight = bar.getAttribute('data-height');
          bar.style.height = targetHeight;
        });
      }
    }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// --- Animated Counters ---
let countersRun = false;
function runCounters() {
  if (countersRun) return;
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // lower is slower

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace('+', '');
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  });
  countersRun = true;
}

// --- Testimonial Carousel ---
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 4000); // Change slide every 4 seconds

// --- Modal Popup Logic ---
const modal = document.getElementById('login-modal');

function openModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// --- Form Validation (Newsletter) ---
const form = document.getElementById('newsletter-form');
const formMsg = document.getElementById('form-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email-input').value;
  
  if(email) {
    formMsg.innerText = "Thanks for subscribing!";
    formMsg.style.color = "var(--primary)";
    form.reset();
    setTimeout(() => { formMsg.innerText = ""; }, 3000);
  }
});

// --- AI Meal Suggestion Demo (Bonus WOW Feature) ---
const aiBtn = document.getElementById('ai-btn');
const aiInput = document.getElementById('ai-input');
const aiOutput = document.getElementById('ai-output');

aiBtn.addEventListener('click', () => {
  const query = aiInput.value.toLowerCase();
  
  if(!query) return;

  // Loading state
  aiBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
  aiOutput.classList.add('hidden');

  setTimeout(() => {
    aiBtn.innerHTML = '<i class="fas fa-magic"></i> Generate';
    aiOutput.classList.remove('hidden');
    
    // Fake AI logic based on keywords
    let responseText = "";
    if (query.includes('low calorie') || query.includes('weight loss')) {
      responseText = "<strong>Suggested Meal:</strong> Zucchini Noodles with Lemon-Garlic Shrimp.<br><em>Estimated: 320 kcal | 35g Protein | 12g Carbs</em>";
    } else if (query.includes('protein') || query.includes('muscle')) {
      responseText = "<strong>Suggested Meal:</strong> Grilled Chicken Quinoa Bowl with Black Beans & Avocado.<br><em>Estimated: 550 kcal | 52g Protein | 45g Carbs</em>";
    } else if (query.includes('vegan') || query.includes('plant')) {
      responseText = "<strong>Suggested Meal:</strong> Spicy Chickpea & Sweet Potato Curry.<br><em>Estimated: 410 kcal | 15g Protein | 60g Carbs</em>";
    } else {
      responseText = "<strong>Suggested Meal:</strong> Baked Salmon with Roasted Asparagus and Wild Rice.<br><em>Estimated: 480 kcal | 40g Protein | 30g Carbs</em>";
    }

    aiOutput.innerHTML = responseText;
  }, 1200); // Artificial delay to simulate AI processing
});
// --- Scroll Reveal Animation ---
