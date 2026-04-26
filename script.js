/* ═══════════════════════════════════════════════
   BILLIONNAIRE TRAVEL INDIA — Premium JS
═══════════════════════════════════════════════ */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ── 1. CUSTOM CURSOR ─────────────────────────
    const cursorGlow = document.getElementById("cursorGlow");
    const cursorRing = document.getElementById("cursorRing");
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorGlow) {
            cursorGlow.style.left = `${mouseX}px`;
            cursorGlow.style.top = `${mouseY}px`;
        }
    });

    const animateCursor = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactables = document.querySelectorAll('a, button, select, input, textarea');
    interactables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            if (cursorRing) {
                cursorRing.style.transform = "translate(-50%, -50%) scale(1.5)";
                cursorRing.style.borderColor = "var(--peach)";
                cursorRing.style.backgroundColor = "rgba(232, 170, 155, 0.1)";
            }
            if (cursorGlow) cursorGlow.style.transform = "translate(-50%, -50%) scale(0)";
        });
        el.addEventListener("mouseleave", () => {
            if (cursorRing) {
                cursorRing.style.transform = "translate(-50%, -50%) scale(1)";
                cursorRing.style.borderColor = "rgba(229,110,68,.5)";
                cursorRing.style.backgroundColor = "transparent";
            }
            if (cursorGlow) cursorGlow.style.transform = "translate(-50%, -50%) scale(1)";
        });
    });


    // ── 2. NAVBAR SCROLL ─────────────────────────
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    }, { passive: true });


    // ── 3. MOBILE MENU ───────────────────────────
    const navHamburger = document.getElementById("navHamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link, .mobile-cta");

    const toggleMenu = () => {
        if (!navHamburger || !mobileMenu) return;
        navHamburger.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    };

    if (navHamburger) navHamburger.addEventListener("click", toggleMenu);
    mobileLinks.forEach(link => link.addEventListener("click", toggleMenu));





    /* ── 4. HERO AUTO ZOOM SLIDER ───────────────────────────── */
    const heroLayers = document.querySelectorAll(".hero-layer");
    let currentHeroLayer = 0;

    if (heroLayers.length > 0) {
        // Initialize layers
        heroLayers.forEach((layer, idx) => {
            layer.style.transition = "opacity 2s ease, transform 6s linear";
            layer.style.opacity = idx === 0 ? "1" : "0";
            layer.style.transform = idx === 0 ? "scale(1.08)" : "scale(1)";
        });

        setInterval(() => {
            // Hide current
            heroLayers[currentHeroLayer].style.opacity = "0";
            // Reset transform for next time after fade out
            setTimeout((layerToReset) => {
                layerToReset.style.transition = "none";
                layerToReset.style.transform = "scale(1)";
                // Restore transition
                setTimeout(() => {
                    layerToReset.style.transition = "opacity 2s ease, transform 6s linear";
                }, 50);
            }, 2000, heroLayers[currentHeroLayer]);

            // Show next
            currentHeroLayer = (currentHeroLayer + 1) % heroLayers.length;
            heroLayers[currentHeroLayer].style.opacity = "1";
            heroLayers[currentHeroLayer].style.transform = "scale(1.08)";
        }, 5000);
    }


    // ── 5. SCROLL REVEAL ANIMATIONS ──────────────
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);
                observer.unobserve(el);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));


    // ── 6. STAT COUNTERS ─────────────────────────
    const statNums = document.querySelectorAll('.stat-num');
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                let current = 0;
                const increment = target / 60; // 60 frames ~ 1 sec
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        el.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(stat => statObserver.observe(stat));


    // ── 7. DESTINATIONS FILTER TABS ──────────────
    const filterBtns = document.querySelectorAll('.dft-btn');
    const destCards = document.querySelectorAll('.dest-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter cards
            destCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });


    // ── 8. SMOOTH SCROLLING ──────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // ── 9. INQUIRY FORM SUBMISSION ───────────────
    const inquiryForm = document.getElementById("inquiryForm");
    const submitBtn = document.getElementById("submitInquiry");
    const submitText = document.getElementById("submitText");
    const successMsg = document.getElementById("inqSuccess");

    if (inquiryForm) {
        inquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Show processing state
            const originalText = submitText.innerText;
            submitText.innerText = "Processing Details...";
            submitBtn.style.opacity = "0.7";
            submitBtn.style.pointerEvents = "none";

            // Simulate API request
            setTimeout(() => {
                inquiryForm.style.display = "none";
                successMsg.style.display = "block";

                // Reset form state in background (optional if staying on page)
                submitText.innerText = originalText;
                submitBtn.style.opacity = "1";
                submitBtn.style.pointerEvents = "auto";
                inquiryForm.reset();
            }, 1800);
        });
    }

    // ── 10. FINAL CTA CINEMATIC REVEAL ───────────
    const fctRevealWrap = document.querySelector('.fct-reveal-wrap');
    if (fctRevealWrap) {
        const fctObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Slight delay to ensure smooth scrolling before heavy animation starts
                    setTimeout(() => {
                        fctRevealWrap.classList.add('fct-visible');
                    }, 150);
                    // Only trigger once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.15
        });

        fctObserver.observe(fctRevealWrap);
    }

});
