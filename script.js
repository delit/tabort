// Ta bort mig - JavaScript för företagskort-funktionalitet
document.addEventListener('DOMContentLoaded', function() {
    const companyCards = document.querySelectorAll('.company-card');
    const upplysningCard = document.getElementById('upplysning-card');
    const modal = document.getElementById('upplysning-modal');
    const closeBtn = document.querySelector('.close');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    // Söksektion element
    const searchName = document.getElementById('searchName');
    const searchLocation = document.getElementById('searchLocation');
    const generateBtn = document.getElementById('generateBtn');
    const generatedLinks = document.getElementById('generatedLinks');
    const statusMessage = document.getElementById('status-message');
    
    // Lägg till click tracking för analytics
    function trackClick(companyName) {
        console.log(`Användare klickade på: ${companyName}`);
        
        // Exempel på Google Analytics tracking:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'click', {
        //         event_category: 'company_card',
        //         event_label: companyName
        //     });
        // }
    }
    
    // Funktion för att uppdatera ARIA live region
    function announceToScreenReader(message) {
        if (statusMessage) {
            statusMessage.textContent = message;
            // Rensa meddelandet efter 3 sekunder
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 3000);
        }
    }
    
    // Lägg till click tracking på alla företagskort (utom Upplysning)
    companyCards.forEach(card => {
        if (card.id !== 'upplysning-card') {
            card.addEventListener('click', function() {
                const companyName = this.querySelector('.company-name').textContent;
                trackClick(companyName);
                announceToScreenReader(`Öppnar ${companyName} i nytt fönster`);
                
                // Lägg till en liten loading-indikator
                const originalText = this.querySelector('.company-text').textContent;
                this.querySelector('.company-text').textContent = 'Öppnar...';
                this.style.opacity = '0.8';
                
                // Återställ text efter en kort fördröjning
                setTimeout(() => {
                    this.querySelector('.company-text').textContent = originalText;
                    this.style.opacity = '1';
                }, 1000);
            });
            
            // Lägg till keyboard navigation för företagskort
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });

    // Modal funktionalitet för Upplysning.se
    if (upplysningCard) {
        upplysningCard.addEventListener('click', function() {
            trackClick('Upplysning.se (modal)');
            announceToScreenReader('Öppnar instruktioner för Upplysning.se');
            openModal();
        });
        
        // Stöd för Enter-tangent
        upplysningCard.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trackClick('Upplysning.se (modal)');
                announceToScreenReader('Öppnar instruktioner för Upplysning.se');
                openModal();
            }
        });
    }
    
    function openModal() {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        announceToScreenReader('Modal öppnad. Använd Tab för att navigera eller Escape för att stänga');
        
        // Fokusera på stäng-knappen
        const closeButton = modal.querySelector('.close');
        if (closeButton) {
            closeButton.focus();
        }
    }
    
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        announceToScreenReader('Modal stängd');
        
        // Fokusera tillbaka på Upplysning-kortet
        if (upplysningCard) {
            upplysningCard.focus();
        }
    }

    // Stäng modal när man klickar på X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Stäng modal när man klickar på Stäng-knappen
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Stäng modal när man klickar utanför den
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Stäng modal med Escape-tangenten
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // FAQ funktionalitet
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = document.getElementById(this.getAttribute('aria-controls'));
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Stäng alla andra FAQ-objekt
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = document.getElementById(otherQuestion.getAttribute('aria-controls'));
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Toggle aktuell FAQ
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                announceToScreenReader('FAQ stängd');
            } else {
                this.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                announceToScreenReader('FAQ öppnad');
            }
        });
        
        // Keyboard navigation för FAQ
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Steg-för-steg funktionalitet
    const stepByStepQuestions = document.querySelectorAll('.step-by-step-question');
    
    stepByStepQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = document.getElementById(this.getAttribute('aria-controls'));
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Stäng alla andra steg-för-steg objekt
            stepByStepQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = document.getElementById(otherQuestion.getAttribute('aria-controls'));
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Toggle aktuell steg-för-steg
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                announceToScreenReader('Steg-för-steg instruktion stängd');
            } else {
                this.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                announceToScreenReader('Steg-för-steg instruktion öppnad');
            }
        });
        
        // Keyboard navigation för steg-för-steg
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Kalenderfunktion för att skapa påminnelser
    window.createCalendarEvent = function(calendarType) {
        const today = new Date();
        const reminderDate = new Date(today);
        reminderDate.setFullYear(today.getFullYear() + 1);
        
        const title = 'Kontrollera personuppgifter på webbplatser';
        const description = 'Påminnelse att kontrollera om dina personuppgifter har lagts tillbaka på svenska webbplatser som Ratsit, Hitta.se, Eniro etc. Besök https://delit.github.io/tabort för att ta bort dem igen.';
        
        const startDate = reminderDate.toISOString().split('T')[0].replace(/-/g, '');
        const endDate = startDate;
        
        let calendarUrl = '';
        
        switch(calendarType) {
            case 'google':
                calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}`;
                break;
            case 'apple':
                // Apple Calendar använder ICS-format
                const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//delit.github.io/tabort//Calendar Event//EN
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;
                
                const blob = new Blob([icsContent], { type: 'text/calendar' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'personuppgifter-paaminelse.ics';
                link.click();
                window.URL.revokeObjectURL(url);
                return;
            case 'outlook':
                calendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${reminderDate.toISOString()}&enddt=${reminderDate.toISOString()}&body=${encodeURIComponent(description)}`;
                break;
        }
        
        if (calendarUrl) {
            window.open(calendarUrl, '_blank');
        }
    };
    
    // Kopieringsfunktion för brevmallen
    window.copyBrevmall = function(icon) {
        // Hitta brevmall-texten, antingen i steg-för-steg eller FAQ
        let brevmallText = icon.closest('.brevmall-content')?.querySelector('.brevmall-text');
        if (!brevmallText) {
            brevmallText = icon.closest('.faq-brevmall-content')?.querySelector('.faq-brevmall-text');
        }
        
        if (!brevmallText) {
            console.error('Kunde inte hitta brevmall-text');
            return;
        }
        
        const text = brevmallText.innerText;
        
        // Kopiera texten till urklipp
        navigator.clipboard.writeText(text).then(function() {
            // Visa bekräftelse
            const originalIcon = icon.innerHTML;
            icon.innerHTML = '✅';
            icon.style.background = '#10b981';
            icon.style.color = 'white';
            
            // Återställ efter 2 sekunder
            setTimeout(function() {
                icon.innerHTML = originalIcon;
                icon.style.background = '#f7fafc';
                icon.style.color = '#2d3748';
            }, 2000);
        }).catch(function(err) {
            console.error('Kunde inte kopiera text: ', err);
            // Fallback för äldre webbläsare
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Visa bekräftelse även för fallback
            const originalIcon = icon.innerHTML;
            icon.innerHTML = '✅';
            icon.style.background = '#10b981';
            icon.style.color = 'white';
            
            setTimeout(function() {
                icon.innerHTML = originalIcon;
                icon.style.background = '#f7fafc';
                icon.style.color = '#2d3748';
            }, 2000);
        });
    };
    
    // Lägg till keyboard navigation mellan företagskort
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Lägg till fokus-styling för keyboard navigation
            const focusedCard = document.activeElement;
            if (focusedCard.classList.contains('company-card')) {
                focusedCard.style.outline = '2px solid #3b82f6';
                focusedCard.style.outlineOffset = '2px';
            }
        }
    });
    
    // Lägg till hover-effekter för bättre användarupplevelse
    companyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Lägg till loading state för hela sidan
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Lägg till en fade-in animation för företagskorten
        companyCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
    
    // Lägg till error handling för externa länkar
    companyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Kontrollera om länken öppnades i nytt fönster
            if (this.target === '_blank') {
                showNotification('Öppnar i nytt fönster...', 'info');
            }
        });
    });
    
    // Funktion för att visa notifieringar
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1e40af;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Anima in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Ta bort efter 3 sekunder
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Lägg till smooth scroll för bättre användarupplevelse
    const style = document.createElement('style');
    style.textContent = `
        .company-card {
            transition: all 0.3s ease;
        }
        
        .company-card:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }
        
        .company-card.loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        body.loaded .company-card {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Lägg till keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K för att fokusera första företagskortet
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (companyCards.length > 0) {
                companyCards[0].focus();
            }
        }
    });
    
    // Lägg till tooltip för keyboard shortcut
    const firstCard = companyCards[0];
    if (firstCard) {
        firstCard.title = 'Tryck Ctrl + K för att fokusera med tangentbordet';
    }
    
    // Lägg till ARIA-attribut för tillgänglighet
    companyCards.forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Ta bort mig från ${card.querySelector('.company-name').textContent}`);
        
        // Lägg till keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Lägg till intersection observer för animationer när kort kommer in i viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });
        
        companyCards.forEach(card => {
            observer.observe(card);
        });
    }


    // Generera länkar funktionalitet
    if (generateBtn && searchName && searchLocation && generatedLinks) {
        generateBtn.addEventListener('click', function() {
            const name = searchName.value.trim();
            const location = searchLocation.value.trim();
            
            if (!name || !location) {
                announceToScreenReader('Vänligen fyll i både namn och ort');
                alert('Vänligen fyll i både namn och ort.');
                return;
            }
            
            generateSearchLinks(name, location);
            announceToScreenReader(`Genererar sökningar för ${name} i ${location}`);
        });
        
        // Generera länkar vid Enter-tryck
        [searchName, searchLocation].forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    generateBtn.click();
                }
            });
        });
    }

    function generateSearchLinks(name, location) {
        // URL-encode namn och ort
        const encodedName = encodeURIComponent(name);
        const encodedLocation = encodeURIComponent(location);
        
        // Skapa länkar enligt specifikationen
        const links = [
            {
                name: 'Eniro',
                url: `https://www.eniro.se/${encodedName.toLowerCase().replace(/\s+/g, '+')}%2c+${encodedLocation.toLowerCase()}/personer`,
                icon: 'https://www.google.com/s2/favicons?sz=32&domain=eniro.se'
            },
            {
                name: 'Hitta.se',
                url: `https://www.hitta.se/s%C3%B6k?vad=${encodedName}%2C+${encodedLocation}`,
                icon: 'https://www.google.com/s2/favicons?sz=32&domain=hitta.se'
            },
            {
                name: 'Ratsit',
                url: `https://www.ratsit.se/sok/person?vem=${encodedName}%2C+${encodedLocation}&m=0&k=0&r=0&er=0&b=0&eb=0&amin=16&amax=120&fon=1&page=1`,
                icon: 'https://www.google.com/s2/favicons?sz=32&domain=ratsit.se'
            },
            {
                name: 'Merinfo',
                url: `https://www.merinfo.se/search?q=${encodedName}%2C+${encodedLocation}`,
                icon: 'https://www.google.com/s2/favicons?sz=32&domain=merinfo.se'
            },
            {
                name: 'Mrkoll',
                url: `https://mrkoll.se/resultat?n=${encodedName}&c=${encodedLocation}&min=16&max=120&sex=a&c_stat=all&company=`,
                icon: 'https://www.google.com/s2/favicons?sz=32&domain=mrkoll.se'
            },
            {
                name: 'Birthday.se',
                url: `https://www.birthday.se/sok?who=${encodedName}&where=${encodedLocation}`,
                icon: 'favicon/birthday-se.svg'
            },
            {
                name: 'Upplysning.se',
                url: `https://www.upplysning.se/person/?x=1300&who=${encodedName}&where=${encodedLocation}&m=1`,
                icon: 'https://www.google.com/s2/favicons?sz=32&domain=upplysning.se'
            }
        ];
        
        // Rensa tidigare länkar
        generatedLinks.innerHTML = '';
        
        // Skapa nya länkar
        links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.className = 'generated-link';
            
            linkElement.innerHTML = `
                <img src="${link.icon}" alt="${link.name}" class="generated-link-icon">
                <span class="generated-link-text">Sök ${name} i ${location} på ${link.name}</span>
            `;
            
            // Lägg till click tracking
            linkElement.addEventListener('click', function() {
                trackClick(`${link.name} (sök: ${name} ${location})`);
            });
            
            generatedLinks.appendChild(linkElement);
        });
        
        // Visa genererade länkar
        generatedLinks.classList.add('show');
        
        // Scrolla till genererade länkar
        generatedLinks.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});