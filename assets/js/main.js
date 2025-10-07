// Main JavaScript functionality

// Scroll to top functionality
class ScrollToTop {
  constructor() {
    this.button = null;
    this.init();
  }
  
  init() {
    this.createButton();
    this.bindEvents();
  }
  
  createButton() {
    this.button = document.createElement('button');
    this.button.className = 'scroll-to-top';
    this.button.innerHTML = '↑';
    this.button.title = 'Наверх';
    document.body.appendChild(this.button);
  }
  
  bindEvents() {
    window.addEventListener('scroll', () => this.toggleVisibility());
    this.button.addEventListener('click', () => this.scrollToTop());
  }
  
  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Tabs functionality
class TabsManager {
  constructor() {
    this.init();
  }
  
  init() {
    const tabsMenus = document.querySelectorAll('.tabs-menu');
    tabsMenus.forEach(menu => this.initTabMenu(menu));
  }
  
  initTabMenu(menu) {
    const tabLinks = menu.querySelectorAll('a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove current class from all tabs
        menu.querySelectorAll('li').forEach(li => li.classList.remove('current'));
        
        // Add current class to clicked tab
        link.parentElement.classList.add('current');
        
        // Hide all tab contents
        tabContents.forEach(content => content.style.display = 'none');
        
        // Show target tab content
        const targetId = link.getAttribute('href').substring(1);
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.style.display = 'block';
        }
      });
    });
  }
}

// Smooth scrolling for anchor links
class SmoothScrolling {
  constructor() {
    this.init();
  }
  
  init() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
}

// Mobile burger menu
class MobileMenu {
  constructor() {
    this.isOpen = false;
    this.checkAndInit();
  }
  
  checkAndInit() {
    // Only initialize on tablet/mobile screens
    if (window.innerWidth <= 1024) {
      this.init();
    }
    
    // Listen for window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1024 && !this.burgerMenu) {
        this.init();
      } else if (window.innerWidth > 1024 && this.burgerMenu) {
        this.destroy();
      }
    });
  }
  
  init() {
    if (this.burgerMenu) return; // Already initialized
    this.createBurgerMenu();
    this.bindEvents();
  }
  
  destroy() {
    if (this.burgerMenu) {
      this.close();
      document.body.removeChild(this.burgerMenu);
      document.body.removeChild(this.overlay);
      this.burgerMenu = null;
      this.overlay = null;
    }
  }
  
  createBurgerMenu() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'mobile-menu-overlay';
    
    // Create burger menu
    this.burgerMenu = document.createElement('div');
    this.burgerMenu.className = 'mobile-burger-menu';
    
    // Get data from header
    const phones = document.querySelector('.header-info .phones');
    const address = document.querySelector('.header-info .address');
    const worktime = document.querySelector('.header-info .worktime');
    const navMenu = document.querySelector('.nav-menu');
    const questionBtn = document.querySelector('.question-btn');
    
    // Create burger menu content
    this.burgerMenu.innerHTML = `
      <div class="burger-menu-header">
        <div class="logo">
          <img src="../assets/images/logo.png" alt="Территория ремонта" width="120" height="30">
        </div>
        <button class="burger-close">&times;</button>
      </div>
      <div class="burger-content">
        <div class="burger-section">
          <h3>Навигация</h3>
          <div class="burger-nav-menu">
            ${navMenu ? navMenu.innerHTML : ''}
          </div>
          ${questionBtn ? `<a href="#contact" class="burger-question-btn">Задать вопрос мастеру</a>` : ''}
        </div>
        
        ${phones ? `
        <div class="burger-section">
          <h3>Телефоны</h3>
          <div class="burger-phones">
            ${phones.innerHTML}
          </div>
        </div>
        ` : ''}
        
        ${address ? `
        <div class="burger-section">
          <h3>Адрес</h3>
          <div class="burger-address">
            ${address.innerHTML}
          </div>
        </div>
        ` : ''}
        
        ${worktime ? `
        <div class="burger-section">
          <h3>Время работы</h3>
          <div class="burger-worktime">
            ${worktime.innerHTML}
          </div>
        </div>
        ` : ''}
      </div>
    `;
    
    // Append to body
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.burgerMenu);
  }
  
  bindEvents() {
    // Toggle button
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }
    
    // Close button
    const closeBtn = this.burgerMenu.querySelector('.burger-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }
    
    // Overlay click
    this.overlay.addEventListener('click', () => this.close());
    
    // Menu links
    const menuLinks = this.burgerMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => this.close());
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Prevent scroll when menu is open
    this.preventScroll = (e) => {
      if (this.isOpen) {
        e.preventDefault();
      }
    };
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  open() {
    this.isOpen = true;
    this.burgerMenu.classList.add('active');
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
    
    // Update toggle button
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = '&times;';
      toggleBtn.style.fontSize = '24px';
    }
  }
  
  close() {
    this.isOpen = false;
    this.burgerMenu.classList.remove('active');
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('touchmove', this.preventScroll);
    
    // Update toggle button
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = '☰';
      toggleBtn.style.fontSize = '18px';
    }
  }
}

// Services carousel/slider (simplified version)
class ServicesSlider {
  constructor() {
    this.currentIndex = 0;
    this.init();
  }
  
  init() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;
    
    // Add touch/swipe support for mobile
    this.addTouchSupport(servicesGrid);
  }
  
  addTouchSupport(element) {
    let startX = 0;
    let scrollLeft = 0;
    
    element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    });
    
    element.addEventListener('touchmove', (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
    });
    
    element.addEventListener('touchend', () => {
      startX = 0;
    });
  }
}

// Initialize map (placeholder for Yandex Maps)
class MapManager {
  constructor() {
    this.init();
  }
  
  init() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Create simple placeholder map
    this.createPlaceholderMap(mapContainer);
    
    // If Yandex Maps API is available, initialize it
    if (typeof ymaps !== 'undefined') {
      this.initYandexMap();
    }
  }
  
  createPlaceholderMap(container) {
    container.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
        text-align: center;
        position: relative;
      ">
        <div>
          <div style="font-size: 48px; margin-bottom: 10px;">📍</div>
          <div style="font-weight: bold; margin-bottom: 5px;">Территория ремонта</div>
          <div style="font-size: 14px; opacity: 0.9;">пр-т Независимости, 40а, 2 этаж</div>
          <div style="font-size: 14px; opacity: 0.9;">ст.м. «Площадь Победы», Минск</div>
          <div style="margin-top: 15px;">
            <a href="https://yandex.by/maps/157/minsk/house/Zk4YcwJiSU0FQFtpfXVxeHljYg==/" 
               target="_blank" 
               style="
                 background: rgba(255,255,255,0.2);
                 color: white;
                 padding: 8px 16px;
                 border-radius: 5px;
                 text-decoration: none;
                 font-size: 14px;
                 border: 1px solid rgba(255,255,255,0.3);
                 transition: all 0.3s ease;
               "
               onmouseover="this.style.background='rgba(255,255,255,0.3)'"
               onmouseout="this.style.background='rgba(255,255,255,0.2)'">
              Открыть в Яндекс.Картах
            </a>
          </div>
        </div>
      </div>
    `;
  }
  
  initYandexMap() {
    ymaps.ready(() => {
      const myMap = new ymaps.Map("map", {
        center: [53.908888, 27.577695],
        zoom: 16
      });
      
      const myPlacemark = new ymaps.Placemark([53.908888, 27.577695], {
        hintContent: 'Территория ремонта',
        balloonContent: 'Территория ремонта<br/>пр-т Независимости, 40а, 2 этаж'
      });
      
      myMap.geoObjects.add(myPlacemark);
      myPlacemark.balloon.open();
    });
  }
}

// Modal Manager
class ModalManager {
  constructor() {
    this.modals = new Map();
    this.init();
  }
  
  init() {
    this.createModals();
    this.bindEvents();
  }
  
  createModals() {
    // Create consultation modal
    const consultationModal = this.createModal('consultation', {
      title: 'Получить консультацию',
      fields: [
        { name: 'name', type: 'text', label: 'Ваше имя', required: true },
        { name: 'phone', type: 'tel', label: 'Номер телефона', required: true },
        { name: 'device', type: 'select', label: 'Тип устройства', required: true, options: [
          'Выберите тип устройства',
          'Мобильный телефон',
          'Планшет', 
          'Ноутбук',
          'Фотоаппарат',
          'Наушники',
          'Акустика',
          'Плеер',
          'Детская игрушка',
          'Другое'
        ]},
        { name: 'message', type: 'textarea', label: 'Опишите проблему', required: false }
      ],
      submitText: 'Получить консультацию'
    });
    
    // Create question modal  
    const questionModal = this.createModal('question', {
      title: 'Задать вопрос мастеру',
      fields: [
        { name: 'name', type: 'text', label: 'Ваше имя', required: true },
        { name: 'email', type: 'email', label: 'Email для ответа', required: true },
        { name: 'phone', type: 'tel', label: 'Телефон (необязательно)', required: false },
        { name: 'question', type: 'textarea', label: 'Ваш вопрос', required: true }
      ],
      submitText: 'Отправить вопрос'
    });
    
    document.body.appendChild(consultationModal);
    document.body.appendChild(questionModal);
  }
  
  createModal(id, config) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = `modal-${id}`;
    
    const fieldsHtml = config.fields.map(field => {
      let fieldHtml = '';
      
      if (field.type === 'select') {
        const optionsHtml = field.options.map((option, index) => 
          `<option value="${index === 0 ? '' : option}">${option}</option>`
        ).join('');
        
        fieldHtml = `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}" for="${id}-${field.name}">
              ${field.label}
            </label>
            <select class="form-select" id="${id}-${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
              ${optionsHtml}
            </select>
          </div>
        `;
      } else if (field.type === 'textarea') {
        fieldHtml = `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}" for="${id}-${field.name}">
              ${field.label}
            </label>
            <textarea class="form-textarea" id="${id}-${field.name}" name="${field.name}" 
                      rows="4" ${field.required ? 'required' : ''}></textarea>
          </div>
        `;
      } else {
        fieldHtml = `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}" for="${id}-${field.name}">
              ${field.label}
            </label>
            <input type="${field.type}" class="form-input" id="${id}-${field.name}" 
                   name="${field.name}" ${field.required ? 'required' : ''}>
          </div>
        `;
      }
      
      return fieldHtml;
    }).join('');
    
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${config.title}</h3>
          <button type="button" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form class="modal-form" data-modal-type="${id}">
            ${fieldsHtml}
            <div class="form-group">
              <div class="form-checkbox-group">
                <input type="checkbox" id="${id}-privacy" name="privacy" class="form-checkbox" required>
                <label for="${id}-privacy" class="checkbox-label">
                  Я согласен на обработку персональных данных и получение информации о услугах компании
                </label>
              </div>
            </div>
            <button type="submit" class="modal-submit">${config.submitText}</button>
          </form>
        </div>
      </div>
    `;
    
    this.modals.set(id, modal);
    return modal;
  }
  
  bindEvents() {
    // Bind open modal buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('[href="#contact"]') || e.target.closest('[href="#contact"]')) {
        e.preventDefault();
        
        // Determine which modal to open based on button text
        const buttonText = e.target.textContent || e.target.closest('a').textContent;
        
        if (buttonText.includes('консультацию') || buttonText.includes('стоимость')) {
          this.openModal('consultation');
        } else if (buttonText.includes('вопрос')) {
          this.openModal('question');
        }
      }
    });
    
    // Bind close events for all modals
    this.modals.forEach((modal, id) => {
      // Close button
      const closeBtn = modal.querySelector('.modal-close');
      closeBtn.addEventListener('click', () => this.closeModal(id));
      
      // Overlay click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(id);
        }
      });
      
      // Form submit
      const form = modal.querySelector('.modal-form');
      form.addEventListener('submit', (e) => this.handleSubmit(e, id));
    });
    
    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }
  
  openModal(id) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus first input
      setTimeout(() => {
        const firstInput = modal.querySelector('.form-input, .form-textarea, .form-select');
        if (firstInput) firstInput.focus();
      }, 300);
    }
  }
  
  closeModal(id) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // Reset form
      const form = modal.querySelector('.modal-form');
      if (form) {
        form.reset();
        this.clearErrors(form);
      }
    }
  }
  
  closeAllModals() {
    this.modals.forEach((modal, id) => {
      if (modal.classList.contains('active')) {
        this.closeModal(id);
      }
    });
  }
  
  handleSubmit(e, modalId) {
    e.preventDefault();
    
    const form = e.target;
    const isValid = this.validateForm(form);
    
    if (isValid) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Show success message
      this.showSuccess(form, modalId);
      
      // Here you would typically send data to server
      console.log('Form submitted:', data);
    }
  }
  
  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    // Clear previous errors
    this.clearErrors(form);
    
    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (input.required && !value) {
      isValid = false;
      errorMessage = 'Это поле обязательно для заполнения';
    }
    
    // Type-specific validation
    if (value && type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Введите корректный email адрес';
      }
    }
    
    if (value && type === 'tel') {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Введите корректный номер телефона';
      }
    }
    
    // Show/hide error
    if (!isValid) {
      this.showFieldError(input, errorMessage);
    } else {
      this.clearFieldError(input);
    }
    
    return isValid;
  }
  
  showFieldError(input, message) {
    input.classList.add('error');
    
    let errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }
  
  clearFieldError(input) {
    input.classList.remove('error');
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  clearErrors(form) {
    form.querySelectorAll('.error').forEach(input => {
      input.classList.remove('error');
    });
    form.querySelectorAll('.error-message').forEach(error => {
      error.remove();
    });
  }
  
  showSuccess(form, modalId) {
    const submitBtn = form.querySelector('.modal-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправлено!';
    submitBtn.style.backgroundColor = '#27ae60';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      this.closeModal(modalId);
      
      // Reset button
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
      }, 500);
    }, 1500);
  }
}

// Form validation (legacy - keeping for compatibility)
class FormValidator {
  constructor() {
    // This class is now handled by ModalManager
  }
}

// Animation on scroll
class ScrollAnimations {
  constructor() {
    this.init();
  }
  
  init() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    elements.forEach(el => observer.observe(el));
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ScrollToTop();
  new TabsManager();
  new SmoothScrolling();
  new MobileMenu();
  new ServicesSlider();
  new MapManager();
  new ModalManager();
  new ScrollAnimations();
  
  // Add some loading animations
  document.body.classList.add('loaded');
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  body {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
  
  [data-animate] {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }
  
  [data-animate].animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .error {
    border-color: #e74c3c !important;
    background-color: #fdf2f2 !important;
  }
`;
document.head.appendChild(style);
