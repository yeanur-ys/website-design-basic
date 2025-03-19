document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Initialize Three.js Particle System
  const initParticleSystem = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Append the renderer to the hero-background div
      const heroBackground = document.getElementById('hero-background');
      heroBackground.appendChild(renderer.domElement);

      // Style the canvas to act as a background
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.zIndex = '-1'; // Ensure it's behind the hero content

      // Create particles
      const particles = new THREE.BufferGeometry();
      const particleCount = 1000;
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 2000;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);

      camera.position.z = 500;

      // Animation loop
      const animate = () => {
          requestAnimationFrame(animate);
          particleSystem.rotation.y += 0.001;
          renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
      });
  };

  // Initialize the particle system
  initParticleSystem();

  // Slideshow Functionality for Each Section
  const slideshows = document.querySelectorAll(".slideshow-container");
  console.log(`Found ${slideshows.length} slideshows`);

  slideshows.forEach((slideshow) => {
      const slides = slideshow.querySelectorAll(".slide");
      let currentSlide = 0;

      // Function to show the current slide
      const showSlide = (index) => {
          slides.forEach((slide, i) => {
              slide.style.opacity = i === index ? "1" : "0"; // Toggle visibility
              slide.style.transition = "opacity 1s ease"; // Smooth transition
          });
      };

      // Initialize the first slide
      showSlide(currentSlide);

      // Automatically cycle through slides every 3 seconds
      setInterval(() => {
          currentSlide = (currentSlide + 1) % slides.length;
          showSlide(currentSlide);
      }, 3000);
  });

  // Smooth Scroll Implementation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
              target.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
              });
          }
      });
  });

  // Alternating Layout for Sections
  const sections = document.querySelectorAll(".section");
  console.log(`Found ${sections.length} sections`);

  sections.forEach((section) => {
      const slideshow = section.querySelector(".slideshow-container");
      const content = section.querySelector(".content");

      if (slideshow && content) {
          // Apply alternating layout based on section ID
          switch (section.id) {
              case "maintenance":
              case "gfx":
                  // Slideshow on the right, content on the left
                  slideshow.style.order = "2";
                  content.style.order = "1";
                  break;
              case "ai-ml":
              case "vfx":
                  // Slideshow on the left, content on the right
                  slideshow.style.order = "1";
                  content.style.order = "2";
                  break;
              case "contact":
                  // Contact form on the right, map on the left
                  const contactForm = section.querySelector(".contact-form");
                  const googleMap = section.querySelector(".google-map");
                  if (contactForm && googleMap) {
                      contactForm.style.order = "2";
                      googleMap.style.order = "1";
                  }
                  break;
              default:
                  // Default layout (slideshow on the left, content on the right)
                  slideshow.style.order = "1";
                  content.style.order = "2";
                  break;
          }
      }
  });

  // Animate Sections on Scroll
  const animateOnScroll = (entries, observer) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); // Stop observing once animated
          }
      });
  };

  const observerOptions = {
      threshold: 0.2, // Trigger animation when 20% of the element is visible
  };

  const observer = new IntersectionObserver(animateOnScroll, observerOptions);

  // Observe all sections and slideshows
  document
      .querySelectorAll(".section, .slideshow-container")
      .forEach((element) => {
          observer.observe(element);
      });

  // Button Hover and Click Animations
  const buttons = document.querySelectorAll(".animated-button");
  console.log(`Found ${buttons.length} buttons`);

  buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
          button.style.transform = "scale(1.05)";
          button.style.boxShadow = "0 5px 15px rgba(255, 64, 129, 0.5)";
      });

      button.addEventListener("mouseleave", () => {
          button.style.transform = "scale(1)";
          button.style.boxShadow = "none";
      });

      button.addEventListener("click", () => {
          button.style.transform = "scale(0.95)";
          setTimeout(() => {
              button.style.transform = "scale(1)";
          }, 200);
      });
  });
});
