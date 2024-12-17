document.addEventListener("DOMContentLoaded", function () {

    // Target elements
    const menuButton = document.querySelector(".menu_btn button"); // Menu button
    const mobileMenu = document.getElementById("mobile-menu"); // Mobile menu
    const overlay = document.querySelector(".overlay"); // Overlay element

    // Open and close menu
    menuButton.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default button behavior
        mobileMenu.classList.toggle('active'); // Toggle mobile menu visibility
        overlay.classList.toggle('active'); // Toggle overlay visibility
    });

    // Close menu function
    window.close_menu = function () {
        mobileMenu.classList.remove('active'); // Remove active class from mobile menu
        overlay.classList.remove('active'); // Remove active class from overlay
    }

    // Overlay close menu
    overlay.addEventListener("click", close_menu); // Close menu when overlay is clicked

    // Create error message function
    function createErrorMessage(container, arg) {
        // Create error message HTML
        const error_html = `<div class="error-note">
                                <p>${arg}</p>
                            </div>`;
        container.insertAdjacentHTML('beforeend', error_html); // Insert error message into the container

        // Fade out error message after a timeout
        setTimeout(() => {
            var errors = container.querySelector(".error-note"); // Select the error note
            errors.classList.add("fade-out"); // Add fade-out class for animation
            errors.addEventListener("transitionend", function () {
                this.remove(); // Remove the error note after transition ends
            });
        }, 1500);
    }

    // Regular expressions for validation
    const name_regxp = /^[a-zA-Z\s]+$/; // Regex for names (letters and spaces only)
    const email_regxp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for emails
    const phone_regxp = /^[6-9]\d{9}$/; // Regex for Indian phone numbers (10 digits starting with 6-9)
    let discress = document.querySelector('#top-navbar').offsetHeight; // Get height of top navbar

    // Submit contact form
    const contact_form = document.getElementById("contact-form"); // Select the contact form

    contact_form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        const errorNotes = this.querySelectorAll(".error-note"); // Get existing error notes

        if (errorNotes) {
            errorNotes.forEach(note => note.remove()); // Remove existing error notes
        }

        // Get input values and trim whitespace
        const first_name = document.getElementById("first_name").value.trim();
        const last_name = document.getElementById("last_name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate required fields
        if ((first_name == null || first_name == "") || (last_name == null || last_name == "") || (email == null || email == "") || (phone == null || phone == "") || (message == null || message == "")) {
            createErrorMessage(this, "All fields are required"); // Show error if any field is empty
            return; // Stop form submission
        }
        // Validate names
        if (!name_regxp.test(first_name) || !name_regxp.test(last_name)) {
            createErrorMessage(this, "Please enter a valid name"); // Show error for invalid name
            return; // Stop form submission
        }
        // Validate email
        if (!email_regxp.test(email)) {
            createErrorMessage(this, "Please enter a valid email"); // Show error for invalid email
            return; // Stop form submission
        }
        // Validate phone number
        if (!phone_regxp.test(phone)) {
            createErrorMessage(this, "Please enter a valid phone number"); // Show error for invalid phone
            return; // Stop form submission
        }
        // Validate message length
        if (message.length < 10) {
            createErrorMessage(this, "Please enter a valid message"); // Show error for message too short
            return; // Stop form submission
        }

        this.reset(); // Reset form fields
        document.querySelector(".form-btn button").setAttribute("disabled", "true"); // Disable submit button
        // Show success message
        document.querySelector(".form-btn button").innerHTML = `<i class="fa fa-check" aria-hidden="true" style="margin-right:4px"></i>Form Submitted Successfully By ${first_name} ${last_name}`;

        setTimeout(() => {
            window.location.reload(); // Reload the page after a delay
        }, 2500);

    });

    // Click to view 
    function handleScroll() {
        // Fix navbar on scroll
        if (window.scrollY > 100) {
            document.querySelector('#top-navbar').classList.add('fix'); // Add fix class to navbar
        } else {
            document.querySelector('#top-navbar').classList.remove('fix'); // Remove fix class from navbar
        }

        const sections = document.querySelectorAll('section'); // Select all sections
        const navLinks = document.querySelectorAll('.nav-menu-links li a,.mobile-menus li a'); // Select all nav links

        sections.forEach(section => {
            const sectionTop = section.offsetTop - discress; // Get section top position
            const sectionHeight = section.offsetHeight; // Get section height
            const scrollPosition = window.scrollY; // Get current scroll position

            // Highlight nav link based on scroll position
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id'); // Get current section ID
                navLinks.forEach(link => {
                    link.classList.remove('active'); // Remove active class from all links
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active'); // Add active class to current link
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll); // Listen for scroll events
    window.addEventListener('load', handleScroll); // Execute on page load

    // Smooth scrolling when click
    document.querySelectorAll('.nav-menu-links li a[href^="#"], .mobile-menus li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href'); // Get target section ID
            const targetSection = document.querySelector(targetId); // Select target section

            if (targetSection) {
                const targetPosition = targetSection.offsetTop - discress; // Calculate target position
                window.scrollTo({
                    top: targetPosition, // Scroll to target position
                    behavior: 'smooth' // Smooth scrolling effect
                });
            }
        });
    });

});
