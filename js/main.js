/**
 * GreenScape Lawn & Landscape — Interactive JavaScript Logic
 * AppVanta Web Portfolio Demonstration
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- 2. Mobile Navigation Drawer ---
  const navToggleBtn = document.querySelector('.nav-toggle-btn');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (navToggleBtn && mobileNavDrawer) {
    const openMenu = () => {
      mobileNavDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      navToggleBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      mobileNavDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
      navToggleBtn.setAttribute('aria-expanded', 'false');
    };

    navToggleBtn.addEventListener('click', openMenu);
    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', closeMenu);
    }

    mobileNavDrawer.addEventListener('click', (e) => {
      if (e.target === mobileNavDrawer) {
        closeMenu();
      }
    });

    const mobileNavLinks = mobileNavDrawer.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- 3. Gallery Category Filter ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- 4. Lightbox Modal ---
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-image-wrap img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxTag = document.querySelector('.lightbox-tag');
  const lightboxClose = document.querySelector('.lightbox-close-btn');

  if (lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h4') ? item.querySelector('h4').textContent : 'GreenScape Landscaping';
        const tag = item.querySelector('.gallery-item-tag') ? item.querySelector('.gallery-item-tag').textContent : 'Residential';

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          if (lightboxTitle) lightboxTitle.textContent = title;
          if (lightboxTag) lightboxTag.textContent = tag;
          lightboxModal.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-container-wrap')) {
        closeLightbox();
      }
    });
  }

  // --- 5. Quick Quote Modal ---
  const quoteModal = document.querySelector('.quote-modal');
  const openQuoteBtns = document.querySelectorAll('[data-open-quote-modal]');
  const quoteModalClose = document.querySelector('.quote-modal-close');

  if (quoteModal) {
    const openQuote = (e) => {
      if (e) e.preventDefault();
      quoteModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    const closeQuote = () => {
      quoteModal.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    openQuoteBtns.forEach(btn => {
      btn.addEventListener('click', openQuote);
    });

    if (quoteModalClose) {
      quoteModalClose.addEventListener('click', closeQuote);
    }

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        closeQuote();
      }
    });
  }

  // --- 6. Form Validation & Submission Handler ---
  const initForm = (formId, successBoxId) => {
    const form = document.getElementById(formId);
    const successBox = document.getElementById(successBoxId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Required fields
      const nameInput = form.querySelector('[name="fullName"]');
      const emailInput = form.querySelector('[name="email"]');
      const zipInput = form.querySelector('[name="zipCode"]');
      const serviceSelect = form.querySelector('[name="serviceNeeded"]');

      // Helper to set error
      const validateField = (input, condition, errorSelector) => {
        const errorMsg = form.querySelector(errorSelector);
        if (condition) {
          input.classList.remove('is-invalid');
          if (errorMsg) errorMsg.style.display = 'none';
        } else {
          input.classList.add('is-invalid');
          if (errorMsg) errorMsg.style.display = 'block';
          isValid = false;
        }
      };

      if (nameInput) {
        validateField(nameInput, nameInput.value.trim().length >= 2, '.error-name');
      }

      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(emailInput, emailRegex.test(emailInput.value.trim()), '.error-email');
      }

      if (zipInput) {
        // Lakeland Florida area zip codes typically 33801-33815 or general 5 digit
        const zipRegex = /^\d{5}$/;
        validateField(zipInput, zipRegex.test(zipInput.value.trim()), '.error-zip');
      }

      if (serviceSelect) {
        validateField(serviceSelect, serviceSelect.value !== '', '.error-service');
      }

      if (isValid) {
        // Form submitted successfully in demonstration mode
        form.style.display = 'none';
        if (successBox) {
          successBox.classList.add('is-visible');
          
          // Populate reference code
          const refEl = successBox.querySelector('.ref-number');
          if (refEl) {
            const randomRef = 'GS-' + Math.floor(100000 + Math.random() * 900000);
            refEl.textContent = randomRef;
          }

          // Populate applicant name
          const nameEl = successBox.querySelector('.success-name');
          if (nameEl && nameInput) {
            nameEl.textContent = nameInput.value.trim();
          }
        }
      }
    });

    // Reset button inside success box if exists
    if (successBox) {
      const resetBtn = successBox.querySelector('.btn-reset-form');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          form.reset();
          form.style.display = 'block';
          successBox.classList.remove('is-visible');
        });
      }
    }
  };

  // Initialize both main contact form and modal quote form
  initForm('contactQuoteForm', 'contactSuccessBox');
  initForm('modalQuoteForm', 'modalSuccessBox');

  // --- 7. Global Keyboard Accessibility ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('is-open')) {
        mobileNavDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      if (lightboxModal && lightboxModal.classList.contains('is-open')) {
        lightboxModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      if (quoteModal && quoteModal.classList.contains('is-open')) {
        quoteModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }
  });
});
