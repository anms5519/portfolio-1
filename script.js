(() => {
    "use strict";
    const config = {
        particleCount: 1000,
        particleColor: 0xff6f61,
        particleSize: 0.15,
        debounceWait: 16,
        themeToggleIcons: { dark: "🌙", light: "🌞" },
    };
    function debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this,
                args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    emailjs.init("QCLwAOKe38NGkZrCE");
    window.addEventListener("load", () => {
        gsap.to("#preloader", {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                document.getElementById("preloader").style.display = "none";
            },
        });
    });
    document.querySelectorAll(".nav-links a").forEach((anchor) => {
        const scrollToSection = (e) => {
            e.preventDefault();
            const targetSection = document.querySelector(
                e.target.getAttribute("href")
            );
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        };
        anchor.addEventListener("mouseenter", scrollToSection);
        anchor.addEventListener("click", scrollToSection);
    });
    const navToggle = document.getElementById("nav-toggle");
    const slideMenu = document.getElementById("slide-menu");
    const toggleSlideMenu = () => {
        if (slideMenu.classList.contains("active")) {
            gsap.to(slideMenu, {
                left: -300,
                duration: 0.5,
                ease: "power2.inOut",
            });
            slideMenu.classList.remove("active");
            navToggle.classList.remove("active");
        } else {
            gsap.to(slideMenu, {
                left: 0,
                duration: 0.5,
                ease: "power2.inOut",
            });
            gsap.fromTo(
                slideMenu.querySelectorAll("li"),
                { opacity: 0, y: 20, rotationX: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.1,
                }
            );
            slideMenu.classList.add("active");
            navToggle.classList.add("active");
        }
    };
    navToggle.addEventListener("mouseenter", toggleSlideMenu);
    navToggle.addEventListener("click", toggleSlideMenu);
    document.querySelectorAll("#slide-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            gsap.to(slideMenu, {
                left: -300,
                duration: 0.5,
                ease: "power2.inOut",
            });
            slideMenu.classList.remove("active");
            navToggle.classList.remove("active");
        });
    });
    const themeToggle = document.getElementById("theme-toggle");
    const applyTheme = (theme) => {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            themeToggle.innerHTML = config.themeToggleIcons.dark;
        } else {
            document.body.classList.remove("dark-mode");
            themeToggle.innerHTML = config.themeToggleIcons.light;
        }
        localStorage.setItem("theme", theme);
    };
    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme");
        const systemPrefersDark =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (systemPrefersDark) {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from(".hero-content h1", {
                duration: 1,
                opacity: 0,
                y: -50,
                ease: "power2.out",
            })
            .from(
                "#typed",
                { duration: 1, opacity: 0, y: 50, ease: "power2.out" },
                "-=0.5"
            )
            .from(
                ".btn",
                { duration: 1, opacity: 0, scale: 0.8, ease: "back.out(1.7)" },
                "-=0.5"
            );
        gsap.utils.toArray("section").forEach((section) => {
            gsap.from(section, {
                scrollTrigger: { trigger: section, start: "top 80%" },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
            });
        });
        document
            .querySelectorAll(".project-card, .certificate-card")
            .forEach((card) => {
                card.addEventListener("mouseenter", () => {
                    gsap.to(card, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power1.out",
                    });
                });
                card.addEventListener("mouseleave", () => {
                    gsap.to(card, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power1.out",
                    });
                });
            });
        new Typed("#typed", {
            strings: [
                "AI Enthusiast.....",
                "3D Explorer.....",
                "Web Innovator.....",
                "Game Developer.....",
                "Creative Coder.....",
                "Tech Visionary.....",
                "Digital Nomad.....",
                "Cybersecurity Expert.....",
            ],
            typeSpeed: 20,
            backSpeed: 20,
            loop: true,
            showCursor: false,
        });
    });
    themeToggle.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
            applyTheme("light");
        } else {
            applyTheme("dark");
        }
    });
    const certificateModal = document.getElementById("certificate-modal");
    const certificateImage = document.getElementById("certificate-image");
    const modalContent = document.querySelector(".certificate-modal-content");
    const openModal = (imgSrc) => {
        certificateImage.src = imgSrc;
        certificateModal.style.display = "flex";
        gsap.fromTo(
            modalContent,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
        );
    };
    const closeModal = () => {
        gsap.to(modalContent, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                certificateModal.style.display = "none";
                certificateImage.src = "";
            },
        });
    };
    document.querySelectorAll(".certificate-card").forEach((card) => {
        card.addEventListener("click", () => {
            const imgSrc = card.getAttribute("data-img");
            openModal(imgSrc);
        });
    });
    const closeCertificateModal = document.querySelector(
        "#certificate-modal .close-btn"
    );
    closeCertificateModal.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === certificateModal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && certificateModal.style.display === "flex")
            closeModal();
    });
    const showToast = (message) => {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.style.display = "block";
        gsap.fromTo(
            toast,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
        );
        setTimeout(() => {
            gsap.to(toast, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    toast.style.display = "none";
                },
            });
        }, 3000);
    };
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        emailjs
            .sendForm("service_0ietc2e", "template_jihmbkn", contactForm)
            .then((response) => {
                console.log("SUCCESS!", response.status, response.text);
                showToast("Message sent successfully!");
                contactForm.reset();
            })
            .catch((error) => {
                console.error("FAILED...", error);
                showToast("Failed to send message. Please try again later.");
            });
    });
    const canvas = document.getElementById("bg-canvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(config.particleCount * 3);
    for (let i = 0; i < config.particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: config.particleColor,
        size: config.particleSize,
        transparent: true,
        opacity: 0.7,
    });
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    const animateParticles = () => {
        requestAnimationFrame(animateParticles);
        particleSystem.rotation.y += 0.0008;
        renderer.render(scene, camera);
    };
    animateParticles();
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    document.addEventListener(
        "mousemove",
        debounce((e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            gsap.to(camera.rotation, {
                x: mouseY * 0.2,
                y: mouseX * 0.2,
                duration: 0.5,
            });
        }, config.debounceWait)
    );
    const cursorFollower = document.getElementById("cursor-follower");
    document.addEventListener("mousemove", (e) => {
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: "power2.out",
        });
    });
    document.addEventListener("click", () => {
        gsap.to(cursorFollower, {
            scale: 1.5,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
        });
    });
    const scrollToTopBtn = document.getElementById("scroll-to-top");
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            gsap.to(scrollToTopBtn, {
                opacity: 1,
                display: "block",
                duration: 0.3,
            });
        } else {
            gsap.to(scrollToTopBtn, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    scrollToTopBtn.style.display = "none";
                },
            });
        }
    });
    document.addEventListener("DOMContentLoaded", () => {
        const lightboxModal = document.getElementById("lightbox-modal");
        const lightboxImg = document.getElementById("lightbox-img");
        const closeBtn = document.querySelector(".close");
        document.querySelectorAll(".lightbox").forEach((item) => {
            item.addEventListener("click", function (event) {
                event.preventDefault();
                lightboxImg.src = this.href;
                lightboxModal.style.display = "flex";
            });
        });
        closeBtn.addEventListener("click", () => {
            lightboxModal.style.display = "none";
        });
        lightboxModal.addEventListener("click", (event) => {
            if (event.target === lightboxModal) {
                lightboxModal.style.display = "none";
            }
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightboxModal.style.display === "flex") {
                lightboxModal.style.display = "none";
            }
        });
    });
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "f") {
            if (!document.fullscreenElement) {
                canvas.requestFullscreen().catch((err) => console.error(err));
            } else {
                document.exitFullscreen();
            }
        }
    });
    let particleSpeedMultiplier = 1;
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "l") {
            particleSpeedMultiplier = particleSpeedMultiplier === 1 ? 3 : 1;
            gsap.to(particleSystem.rotation, {
                y: particleSystem.rotation.y * particleSpeedMultiplier,
                duration: 0.5,
            });
            console.log(
                "Legendary particle speed toggled to",
                particleSpeedMultiplier
            );
        }
    });
    console.log("Ultra Pro Legendary Mode Activated");
})();