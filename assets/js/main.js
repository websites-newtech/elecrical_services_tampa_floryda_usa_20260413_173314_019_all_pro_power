/* ═══════════════════════════════════════════════════════════════
   ALL-PRO POWER — Main JavaScript
   Handles: scroll animations, nav behavior, interactions
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Scroll-triggered Animations ──────────────────────────── */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    // If reduced motion is preferred, show all immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* ─── Smooth Nav Link Highlighting ─────────────────────────── */
  function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .footer-link, .mobile-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPage = href.split('/').pop();
      if (linkPage === currentPath) {
        link.classList.add('active');
        if (link.classList.contains('nav-link')) {
          link.setAttribute('aria-current', 'page');
        }
      }
    });
  }

  /* ─── Phone Number Click Tracking ──────────────────────────── */
  function initPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Analytics hook — replace with actual tracking if needed
        console.log('[All-Pro Power] Phone call initiated:', link.href);
      });
    });
  }

  /* ─── Hamburger Accessibility ───────────────────────────────── */
  function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    if (!hamburger) return;

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu.open');
        if (mobileMenu) {
          // Trigger Alpine close via dispatching a click away event
          hamburger.click();
          hamburger.focus();
        }
      }
    });
  }

  /* ─── Stagger animation delays for dynamic lists ────────────── */
  function initStaggerDelays() {
    const staggerGroups = document.querySelectorAll('.testimonials-grid, .services-full-grid');
    staggerGroups.forEach(group => {
      const children = group.querySelectorAll('[data-animate]');
      // Only override if no inline delay is set
      children.forEach((el, i) => {
        if (!el.style.animationDelay && !el.style.getPropertyValue('animation-delay')) {
          el.style.setProperty('animation-delay', `${i * 60}ms`);
        }
      });
    });
  }

  /* ─── Prevent layout shift on image load ────────────────────── */
  function initImageLoading() {
    const heroImages = document.querySelectorAll('.hero-img, .page-hero-bg img');
    heroImages.forEach(img => {
      if (img.complete) return;
      img.style.opacity = '0';
      img.style.transition = 'opacity 400ms cubic-bezier(0.23, 1, 0.32, 1)';
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    });
  }

  /* ─── Form field interaction enhancement ────────────────────── */
  function initFormEnhancements() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('focus', function () {
        this.closest('.form-group')?.classList.add('focused');
      });
      input.addEventListener('blur', function () {
        this.closest('.form-group')?.classList.remove('focused');
      });
    });
  }

  /* ─── Header scroll shadow ───────────────────────────────────── */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    // For Alpine.js driven headers, this is handled in markup.
    // This is a fallback for non-Alpine context.
    if (!header.hasAttribute('x-data')) {
      const update = () => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
    }
  }

  /* ─── Initialize ─────────────────────────────────────────────── */
  function init() {
    initScrollAnimations();
    initActiveNav();
    initPhoneTracking();
    initHamburger();
    initStaggerDelays();
    initImageLoading();
    initFormEnhancements();
    initHeaderScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();