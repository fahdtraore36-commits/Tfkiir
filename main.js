document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. FILTRAGE DES RÉALISATIONS (EN PRIORITÉ)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Gestion de la couleur du bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Récupération de la catégorie choisie
            const filterValue = this.getAttribute('data-filter');

            // Tri des projets
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 2. ANIMATION DE LA DESCRIPTION D'ACCUEIL
    // ==========================================
    const animatedText = document.getElementById("animated-text");
    if (animatedText) {
        setTimeout(() => {
            animatedText.classList.add("show");
        }, 300);

        animatedText.addEventListener("mouseenter", function () {
            this.style.color = "#00F5D4";
            this.style.transition = "color 0.3s ease";
        });

        animatedText.addEventListener("mouseleave", function () {
            this.style.color = "#a0a0ab";
        });
    }

    // ==========================================
    // 3. GESTION DU MENU BURGER
    // ==========================================
    const menuToggle = document.getElementById("mobile-menu");
    const navbar = document.querySelector(".navbar");
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("active");
            menuToggle.classList.toggle("is-active");
        });
    }

    // ==========================================
    // 4. ANIMATION DES CARTES SERVICES AU SCROLL
    // ==========================================
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        const cardsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        serviceCards.forEach(card => cardsObserver.observe(card));
    }

    // ==========================================
    // 5. TRAITEMENT DU LOGO (EN DERNIER ET SÉCURISÉ)
    // ==========================================
    const logoImg = document.getElementById("logoPreview");
    function removeLogoBackground() {
        try {
            if (!logoImg || !logoImg.naturalWidth) return;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = logoImg.naturalWidth;
            canvas.height = logoImg.naturalHeight;
            ctx.drawImage(logoImg, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i + 1], b = data[i + 2];
                if ((r < 30 && g < 30 && b < 30) || (r > 230 && g > 230 && b > 230)) {
                    data[i + 3] = 0;
                }
            }
            ctx.putImageData(imgData, 0, 0);
            logoImg.src = canvas.toDataURL("image/png");
        } catch (err) {
            // Ignore l'erreur silencieusement en local pour ne rien bloquer
        }
    }

    if (logoImg) {
        if (logoImg.complete) removeLogoBackground();
        else logoImg.onload = removeLogoBackground;
    }

});
    // Filtrage des réalisations
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    // Gestion de l'envoi du formulaire vers WhatsApp
    const whatsappForm = document.getElementById("whatsapp-form");
    if (whatsappForm) {
        whatsappForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("client-name").value;
            const service = document.getElementById("project-type").value;
            const details = document.getElementById("project-details").value;

            // Mettez ici votre numéro WhatsApp avec l'indicatif (ex: 226XXXXXXXX pour le Burkina)
            const phoneNumber = "22677408616"; 

            const message = `Bonjour Fondarè Technologies ! 👋%0A%0A*Nom :* ${encodeURIComponent(name)}%0A*Service :* ${encodeURIComponent(service)}%0A*Projet :* ${encodeURIComponent(details)}`;

            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappURL, "_blank");
        });
    }

