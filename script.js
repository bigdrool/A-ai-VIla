// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopButton = document.getElementById('back-to-top');
const cupFill = document.getElementById('cup-fill');
const cupText = document.getElementById('cup-text');
const progressBar = document.getElementById('progress-bar');
const ingredientsContainer = document.getElementById('ingredients-container');
const bowl = document.getElementById('bowl');
const bowlContent = document.getElementById('bowl-content');
const resetBowlButton = document.getElementById('reset-bowl');
const addToCartButton = document.getElementById('add-to-cart');
const testimonialSlider = document.getElementById('testimonial-slider');
const prevTestimonialButton = document.getElementById('prev-testimonial');
const nextTestimonialButton = document.getElementById('next-testimonial');
const testimonialDots = document.getElementById('testimonial-dots');

// Testimonials Data
const testimonials = [
  {
    name: 'Ana Silva',
    role: 'Cliente Frequente',
    content: 'O melhor açaí da cidade! Sempre fresco e saboroso. Minha sobremesa favorita depois do trabalho.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Carlos Oliveira',
    role: 'Nutricionista',
    content: 'Como nutricionista, recomendo o Açaí da Vila pela qualidade dos ingredientes e opções saudáveis no cardápio.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Mariana Santos',
    role: 'Influencer Fitness',
    content: 'Adoro as opções fitness do Açaí da Vila! Perfeito para quem busca energia e sabor sem culpa.',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    name: 'Rafael Costa',
    role: 'Atleta',
    content: 'Depois do treino, meu açaí preferido! Ótima combinação de nutrientes para a recuperação muscular.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/75.jpg'
  },
  {
    name: 'Juliana Lima',
    role: 'Mãe de Família',
    content: 'Meus filhos amam! É um lanche saudável que toda a família aprova. E o atendimento é excelente!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/33.jpg'
  }
];

// Ingredients Data
const ingredients = [
  { name: 'Morango', emoji: '🍓', color: 'bg-red-200 dark:bg-red-900/30' },
  { name: 'Banana', emoji: '🍌', color: 'bg-yellow-200 dark:bg-yellow-900/30' },
  { name: 'Kiwi', emoji: '🥝', color: 'bg-green-200 dark:bg-green-900/30' },
  { name: 'Manga', emoji: '🥭', color: 'bg-orange-200 dark:bg-orange-900/30' },
  { name: 'Granola', emoji: '🌾', color: 'bg-amber-200 dark:bg-amber-900/30' },
  { name: 'Leite Ninho', emoji: '🥛', color: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Paçoca', emoji: '🥜', color: 'bg-amber-100 dark:bg-amber-800/30' },
  { name: 'Leite Condensado', emoji: '🥛', color: 'bg-gray-100 dark:bg-gray-700/30' },
  { name: 'Nutella', emoji: '🍫', color: 'bg-amber-800/20 dark:bg-amber-900/30' },
  { name: 'Coco Ralado', emoji: '🥥', color: 'bg-white/50 dark:bg-gray-600/30' },
  { name: 'Castanha', emoji: '🌰', color: 'bg-amber-100 dark:bg-amber-800/30' },
  { name: 'Mel', emoji: '🍯', color: 'bg-yellow-100 dark:bg-yellow-900/30' }
];

// Current slide index for testimonials
let currentSlide = 0;

// Check for saved theme preference or use system preference
function checkThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Toggle between light and dark theme
function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle('hidden');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
}

// Show/hide back to top button based on scroll position
function toggleBackToTop() {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.remove('opacity-100', 'visible');
    backToTopButton.classList.add('opacity-0', 'invisible');
  }
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Animate cup fill on scroll
function animateCupOnScroll() {
  const cupSection = document.getElementById('diferenciais');
  const cupPosition = cupSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;
  
  if (cupPosition < screenPosition) {
    const scrollPercentage = (1 - (cupPosition / screenPosition)) * 100;
    const fillHeight = Math.min(Math.max(scrollPercentage, 0), 100);
    
    cupFill.style.height = `${fillHeight}%`;
    progressBar.style.width = `${fillHeight}%`;
    
    if (fillHeight > 80) {
      cupText.classList.add('opacity-100');
      cupText.classList.remove('opacity-0');
    } else {
      cupText.classList.remove('opacity-100');
      cupText.classList.add('opacity-0');
    }
  }
}

// Initialize drag and drop functionality
function initDragAndDrop() {
  // Add ingredients to the container
  ingredients.forEach((ingredient, index) => {
    const ingredientElement = document.createElement('div');
    ingredientElement.className = `ingredient ${ingredient.color} p-3 rounded-full cursor-grab active:cursor-grabbing text-center shadow-md hover:shadow-lg transition-shadow`;
    ingredientElement.draggable = true;
    ingredientElement.dataset.name = ingredient.name;
    ingredientElement.innerHTML = `
      <div class="text-2xl mb-1">${ingredient.emoji}</div>
      <div class="text-xs font-medium">${ingredient.name}</div>
    `;
    
    // Add drag start event
    ingredientElement.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', JSON.stringify(ingredient));
      setTimeout(() => {
        ingredientElement.classList.add('opacity-50');
      }, 0);
    });
    
    // Add drag end event
    ingredientElement.addEventListener('dragend', () => {
      ingredientElement.classList.remove('opacity-50');
    });
    
    ingredientsContainer.appendChild(ingredientElement);
  });
  
  // Add dragover and drop events to bowl
  bowl.addEventListener('dragover', (e) => {
    e.preventDefault();
    bowl.classList.add('ring-2', 'ring-primary-light', 'dark:ring-primary-dark');
  });
  
  bowl.addEventListener('dragleave', () => {
    bowl.classList.remove('ring-2', 'ring-primary-light', 'dark:ring-primary-dark');
  });
  
  bowl.addEventListener('drop', (e) => {
    e.preventDefault();
    bowl.classList.remove('ring-2', 'ring-primary-light', 'dark:ring-primary-dark');
    
    const data = e.dataTransfer.getData('text/plain');
    if (data) {
      const ingredient = JSON.parse(data);
      addIngredientToBowl(ingredient);
    }
  });
  
  // Make bowl droppable on touch devices
  bowl.addEventListener('touchmove', (e) => {
    e.preventDefault();
  }, { passive: false });
  
  // Add touch support for ingredients
  document.querySelectorAll('.ingredient').forEach(ingredient => {
    ingredient.addEventListener('touchstart', handleTouchStart, false);
    ingredient.addEventListener('touchmove', handleTouchMove, false);
    ingredient.addEventListener('touchend', handleTouchEnd, false);
  });
}

// Add ingredient to bowl
function addIngredientToBowl(ingredient) {
  const existingIngredient = document.querySelector(`#bowl-content [data-name="${ingredient.name}"]`);
  
  if (existingIngredient) {
    // If ingredient already exists, increase count
    const countElement = existingIngredient.querySelector('.count');
    const count = parseInt(countElement.textContent) + 1;
    countElement.textContent = count > 1 ? `x${count}` : '';
  } else {
    // Add new ingredient to bowl
    const ingredientElement = document.createElement('div');
    ingredientElement.className = `ingredient-in-bowl ${ingredient.color} p-2 rounded-full flex items-center justify-center relative m-1 shadow-md`;
    ingredientElement.dataset.name = ingredient.name;
    ingredientElement.innerHTML = `
      <span class="text-xl">${ingredient.emoji}</span>
      <span class="count text-xs font-bold absolute -top-1 -right-1 bg-white dark:bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center shadow"></span>
    `;
    
    // Add click to remove functionality
    ingredientElement.addEventListener('click', () => {
      const countElement = ingredientElement.querySelector('.count');
      const count = parseInt(countElement.textContent) || 1;
      
      if (count > 1) {
        countElement.textContent = count > 2 ? `x${count - 1}` : '';
      } else {
        ingredientElement.remove();
      }
    });
    
    bowlContent.appendChild(ingredientElement);
    bowlContent.style.display = 'flex';
    document.getElementById('bowl-placeholder').style.display = 'none';
  }
  
  // Show success feedback
  showFeedback(`${ingredient.name} adicionado!`);
}

// Reset bowl
function resetBowl() {
  bowlContent.innerHTML = '';
  bowlContent.style.display = 'none';
  document.getElementById('bowl-placeholder').style.display = 'block';
  showFeedback('Tigela reiniciada!');
}

// Add to cart
function addToCart() {
  const ingredientsInBowl = [];
  document.querySelectorAll('.ingredient-in-bowl').forEach(ingredient => {
    const name = ingredient.dataset.name;
    const count = parseInt(ingredient.querySelector('.count').textContent) || 1;
    ingredientsInBowl.push({ name, count });
  });
  
  if (ingredientsInBowl.length === 0) {
    showFeedback('Adicione ingredientes à tigela primeiro!', 'error');
    return;
  }
  
  // Here you would typically send the order to your backend
  const order = {
    items: ingredientsInBowl,
    timestamp: new Date().toISOString()
  };
  
  console.log('Order:', order);
  showFeedback('Pedido adicionado ao carrinho!');
  resetBowl();
  
  // In a real app, you would redirect to checkout or show a modal
  // window.location.href = '/checkout';
}

// Show feedback message
function showFeedback(message, type = 'success') {
  const feedback = document.createElement('div');
  feedback.className = `fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white font-medium`;
  feedback.textContent = message;
  
  document.body.appendChild(feedback);
  
  // Animate in
  setTimeout(() => {
    feedback.classList.add('opacity-0', 'translate-y-2');
  }, 10);
  
  setTimeout(() => {
    feedback.classList.remove('opacity-0', 'translate-y-2');
  }, 50);
  
  // Remove after delay
  setTimeout(() => {
    feedback.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      feedback.remove();
    }, 300);
  }, 3000);
}

// Initialize testimonials slider
function initTestimonials() {
  // Clear existing content
  testimonialSlider.innerHTML = '';
  testimonialDots.innerHTML = '';
  
  // Create testimonial slides
  testimonials.forEach((testimonial, index) => {
    // Create slide
    const slide = document.createElement('div');
    slide.className = 'min-w-full px-4 transition-opacity duration-500';
    slide.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
        <div class="flex items-center mb-6">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full object-cover mr-4">
          <div>
            <h4 class="font-bold text-lg">${testimonial.name}</h4>
            <p class="text-gray-500 dark:text-gray-400 text-sm">${testimonial.role}</p>
            <div class="flex mt-1">
              ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
            </div>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-300 italic">"${testimonial.content}"</p>
      </div>
    `;
    
    // Only show the first slide initially
    if (index !== 0) {
      slide.classList.add('hidden');
    }
    
    testimonialSlider.appendChild(slide);
    
    // Create dot
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full mx-1 focus:outline-none ${index === 0 ? 'bg-primary-light dark:bg-primary-dark' : 'bg-gray-300 dark:bg-gray-600'}`;
    dot.dataset.index = index;
    dot.addEventListener('click', () => goToSlide(index));
    testimonialDots.appendChild(dot);
  });
  
  // Set up event listeners for navigation
  prevTestimonialButton.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextTestimonialButton.addEventListener('click', () => goToSlide(currentSlide + 1));
  
  // Auto-advance slides
  setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

// Go to specific slide
function goToSlide(index) {
  const slides = document.querySelectorAll('#testimonial-slider > div');
  const dots = document.querySelectorAll('#testimonial-dots button');
  
  // Update current slide
  currentSlide = (index + slides.length) % slides.length;
  
  // Update slides
  slides.forEach((slide, i) => {
    if (i === currentSlide) {
      slide.classList.remove('hidden');
      slide.classList.add('block');
    } else {
      slide.classList.add('hidden');
      slide.classList.remove('block');
    }
  });
  
  // Update dots
  dots.forEach((dot, i) => {
    if (i === currentSlide) {
      dot.classList.add('bg-primary-light', 'dark:bg-primary-dark');
      dot.classList.remove('bg-gray-300', 'dark:bg-gray-600');
    } else {
      dot.classList.remove('bg-primary-light', 'dark:bg-primary-dark');
      dot.classList.add('bg-gray-300', 'dark:bg-gray-600');
    }
  });
}

// Touch event variables
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let touchMoved = false;

// Handle touch start event
function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchMoved = false;
  
  // Add active class to the touched element
  this.classList.add('active');
  
  // Prevent default to avoid scrolling while dragging
  e.preventDefault();
}

// Handle touch move event
function handleTouchMove(e) {
  if (!touchMoved) {
    touchMoved = true;
    this.classList.add('dragging');
  }
  
  touchEndX = e.touches[0].clientX;
  touchEndY = e.touches[0].clientY;
  
  // Move the ingredient with the touch
  const x = touchEndX - (this.offsetWidth / 2);
  const y = touchEndY - (this.offsetHeight / 2);
  
  this.style.position = 'fixed';
  this.style.left = `${x}px`;
  this.style.top = `${y}px`;
  this.style.zIndex = '1000';
  this.style.transform = 'scale(1.1)';
  this.style.transition = 'none';
  
  e.preventDefault();
}

// Handle touch end event
function handleTouchEnd(e) {
  // Check if touch ended over the bowl
  const bowlRect = bowl.getBoundingClientRect();
  const touch = e.changedTouches[0];
  
  if (
    touch.clientX >= bowlRect.left &&
    touch.clientX <= bowlRect.right &&
    touch.clientY >= bowlRect.top &&
    touch.clientY <= bowlRect.bottom
  ) {
    // Get the ingredient data from the dragged element
    const ingredientData = {
      name: this.dataset.name,
      emoji: this.querySelector('div').textContent.trim(),
      color: Array.from(this.classList).find(cls => cls.includes('bg-'))
    };
    
    addIngredientToBowl(ingredientData);
  }
  
  // Reset the element
  this.style.position = '';
  this.style.left = '';
  this.style.top = '';
  this.style.zIndex = '';
  this.style.transform = '';
  this.style.transition = '';
  
  // Remove active and dragging classes
  this.classList.remove('active', 'dragging');
  
  // Reset touch variables
  touchMoved = false;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for fixed header
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (!mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    }
  });
});

// Initialize the page
function init() {
  // Check theme preference
  checkThemePreference();
  
  // Set up event listeners
  themeToggle.addEventListener('click', toggleTheme);
  mobileMenuButton.addEventListener('click', toggleMobileMenu);
  backToTopButton.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', () => {
    toggleBackToTop();
    animateCupOnScroll();
  });
  
  // Initialize drag and drop
  initDragAndDrop();
  
  // Set up bowl controls
  resetBowlButton.addEventListener('click', resetBowl);
  addToCartButton.addEventListener('click', addToCart);
  
  // Initialize testimonials
  initTestimonials();
  
  // Add animation on scroll for elements with data-aos attribute
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
  });
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
