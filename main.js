        (function() {
            'use strict';

            const APP = {
                elements: {
                    form: document.getElementById('contact-form'),
                    output: document.getElementById('output'),
                    deleteBtn: document.getElementById('delete-btn'),
                    menuCheckbox: document.getElementById('menu-checkbox'),
                    successMessage: document.getElementById('success-message')
                },
                
                init() {
                    this.loadUserInfo();
                    this.attachEventListeners();
                },

                attachEventListeners() {
                    this.elements.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
                    this.elements.deleteBtn.addEventListener('click', () => this.handleDelete());
                    
                    document.querySelectorAll('.faq-question').forEach(question => {
                        question.addEventListener('click', (e) => this.handleFaqToggle(e));
                    });

                    document.querySelectorAll('.faq-content .delete-btn').forEach(btn => {
                        btn.addEventListener('click', (e) => this.handleFaqDelete(e));
                    });

                    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                        anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
                    });
                },

                sanitizeInput(input) {
                    const div = document.createElement('div');
                    div.textContent = input;
                    return div.innerHTML;
                },

                validateEmail(email) {
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return re.test(email);
                },

                validatePhone(phone) {
                    const re = /^[0-9\s\-\+\(\)]+$/;
                    return re.test(phone) && phone.replace(/\D/g, '').length >= 9;
                },

                showSuccessMessage() {
                    this.elements.successMessage.classList.add('show');
                    setTimeout(() => {
                        this.elements.successMessage.classList.remove('show');
                    }, 3000);
                },

                handleFormSubmit(e) {
                    e.preventDefault();

                    const formData = {
                        firstName: this.elements.form.querySelector('#firstName').value.trim(),
                        lastName: this.elements.form.querySelector('#lastName').value.trim(),
                        phone: this.elements.form.querySelector('#phone').value.trim(),
                        city: this.elements.form.querySelector('#city').value.trim(),
                        email: this.elements.form.querySelector('#email').value.trim(),
                        aboutMe: this.elements.form.querySelector('#aboutMe').value.trim()
                    };

                    if (!this.validateEmail(formData.email)) {
                        alert('Please enter a valid email address');
                        return;
                    }

                    if (!this.validatePhone(formData.phone)) {
                        alert('Please enter a valid phone number');
                        return;
                    }

                    try {
                        localStorage.setItem('userInfo', JSON.stringify(formData));
                        this.displayUserInfo(formData);
                        this.elements.form.reset();
                        this.showSuccessMessage();
                        this.elements.deleteBtn.style.display = 'block';
                    } catch (error) {
                        console.error('Storage error:', error);
                        alert('Error saving information. Please try again.');
                    }
                },

                loadUserInfo() {
                    try {
                        const data = localStorage.getItem('userInfo');
                        if (data) {
                            const userInfo = JSON.parse(data);
                            this.displayUserInfo(userInfo);
                            this.elements.deleteBtn.style.display = 'block';
                        } else {
                            this.elements.output.innerHTML = '<em>No information saved yet</em>';
                            this.elements.deleteBtn.style.display = 'none';
                        }
                    } catch (error) {
                        console.error('Load error:', error);
                        this.elements.output.innerHTML = '<em>Error loading information</em>';
                    }
                },

                displayUserInfo(data) {
                    this.elements.output.innerHTML = `
                        <p><strong>Name:</strong> ${this.sanitizeInput(data.firstName)}</p>
                        <p><strong>Lastname:</strong> ${this.sanitizeInput(data.lastName)}</p>
                        <p><strong>Phone:</strong> ${this.sanitizeInput(data.phone)}</p>
                        <p><strong>City:</strong> ${this.sanitizeInput(data.city)}</p>
                        <p><strong>Email:</strong> ${this.sanitizeInput(data.email)}</p>
                        <p><strong>About me:</strong> ${this.sanitizeInput(data.aboutMe)}</p>
                    `;
                },

                handleDelete() {
                    if (confirm('Are you sure you want to delete your information?')) {
                        try {
                            localStorage.removeItem('userInfo');
                            this.elements.output.innerHTML = '<em>Information deleted successfully</em>';
                            this.elements.deleteBtn.style.display = 'none';
                            this.elements.form.reset();
                        } catch (error) {
                            console.error('Delete error:', error);
                            alert('Error deleting information. Please try again.');
                        }
                    }
                },

                handleFaqToggle(e) {
                    const faqItem = e.currentTarget.closest('.faq-item');
                    const wasActive = faqItem.classList.contains('active');
                    
                    document.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    if (!wasActive) {
                        faqItem.classList.add('active');
                    }
                },

                handleFaqDelete(e) {
                    e.stopPropagation();
                    const faqItem = e.target.closest('.faq-item');
                    
                    if (confirm('Are you sure you want to delete this FAQ item?')) {
                        faqItem.style.opacity = '0';
                        faqItem.style.transform = 'translateX(-20px)';
                        setTimeout(() => {
                            faqItem.remove();
                        }, 300);
                    }
                },

                handleSmoothScroll(e) {
                    e.preventDefault();
                    const targetId = e.currentTarget.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        this.elements.menuCheckbox.checked = false;
                        
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => APP.init());
            } else {
                APP.init();
            }
        })();
