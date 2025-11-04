// --- DOM Elements ---
// Buttons that open the RSVP form modal
const saveSpotBtn = document.getElementById("save-spot-btn");
const rsvpMenuLink = document.getElementById("rsvp-menu-link");
const registerMiddleBtn = document.getElementById("register-middle-btn");

// The RSVP form modal itself
const rsvpFormModal = document.getElementById("rsvp-form-modal");
const closeRsvpFormModalBtn = document.getElementById("close-rsvp-form-modal");
const rsvpPopupForm = document.getElementById("rsvp-popup-form");
const popupNameInput = document.getElementById("popup-name");
const popupCityInput = document.getElementById("popup-city");
const popupEmailInput = document.getElementById("popup-email");

// The success modal (from previous project)
const successModal = document.getElementById("success-modal");
const modalMessage = document.getElementById("modal-message");
const modalImg = document.getElementById("modal-img");
const closeModalBtn = document.getElementById("close-modal"); // Close button for success modal

// Motion toggle (from previous project)
const reduceMotionToggle = document.getElementById("reduce-motion-toggle"); // Assuming you'll re-add this button
let reduceMotion = false; // State to control animation

let intervalId; // To store the ID for the image animation interval
let rotateFactor = 0; // To control the image rotation

// --- Functions to control Modals ---

/**
 * Opens a specified modal by changing its display style.
 * @param {HTMLElement} modalElement - The modal DOM element to open.
 */
function openModal(modalElement) {
    modalElement.style.display = "flex";
}

/**
 * Closes a specified modal by changing its display style.
 * @param {HTMLElement} modalElement - The modal DOM element to close.
 */
function closeModal(modalElement) {
    modalElement.style.display = "none";
}

/**
 * Displays the success modal with a personalized message and starts animation.
 * @param {string} name - The name of the registrant.
 * @param {string} city - The city of the registrant.
 */
function showSuccessModal(name, city) {
    modalMessage.textContent = `Thanks for RSVPing, ${name} from ${city}!`;
    openModal(successModal); // Open the success modal
    updateModalAnimation(); // Start the image animation

    // Set timeout to close success modal after 5 seconds
    setTimeout(() => {
        closeModal(successModal);
        clearInterval(intervalId); // Stop the animation when modal closes
    }, 5000); // 5 seconds
}

// --- Image Animation Logic (from previous project) ---

/**
 * Animates the image in the success modal by rotating it.
 */
function animateImage() {
    // Alternates rotation between 0 and -10 degrees for a "waving" effect
    rotateFactor = rotateFactor === 0 ? -10 : 0;
    modalImg.style.transform = `rotate(${rotateFactor}deg)`;
}

/**
 * Starts or stops the image animation based on the 'reduceMotion' flag.
 */
function updateModalAnimation() {
    clearInterval(intervalId); // Clear any existing animation first
    if (!reduceMotion) {
        intervalId = setInterval(animateImage, 500); // Start animation every 500ms
    }
}

// --- Event Listeners for Opening RSVP Form Modal ---

// Open RSVP form modal when "Save a Spot" button is clicked
saveSpotBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default button behavior
    openModal(rsvpFormModal);
});

// Open RSVP form modal when "RSVP" link in horizontal nav is clicked
rsvpMenuLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior (scrolling)
    openModal(rsvpFormModal);
});

// Open RSVP form modal when "Click to Register" button is clicked
registerMiddleBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default button behavior
    openModal(rsvpFormModal);
});

// --- Event Listener for Closing RSVP Form Modal ---

// Close RSVP form modal when its 'X' button is clicked
closeRsvpFormModalBtn.addEventListener("click", () => {
    closeModal(rsvpFormModal);
    // Optionally clear form fields when closed manually
    rsvpPopupForm.reset();
    // Clear any validation styling
    popupNameInput.style.border = "";
    popupCityInput.style.border = "";
    popupEmailInput.style.border = "";
});

// --- Event Listener for RSVP Form Submission ---

rsvpPopupForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission (page reload)

    // Get values from the form inputs
    const name = popupNameInput.value.trim();
    const city = popupCityInput.value.trim();
    const email = popupEmailInput.value.trim();

    let hasError = false;

    // Basic validation
    if (name.length < 2) {
        popupNameInput.style.border = "2px solid red";
        hasError = true;
    } else {
        popupNameInput.style.border = ""; // Clear error style
    }

    if (city.length < 2) {
        popupCityInput.style.border = "2px solid red";
        hasError = true;
    } else {
        popupCityInput.style.border = ""; // Clear error style
    }

    if (!email.includes("@") || email.length < 5) { // Basic email check
        popupEmailInput.style.border = "2px solid red";
        hasError = true;
    } else {
        popupEmailInput.style.border = ""; // Clear error style
    }

    // If there are errors, stop here
    if (hasError) {
        return;
    }

    // If validation passes:
    // 1. Close the RSVP form modal
    closeModal(rsvpFormModal);

    // 2. Show the success modal
    showSuccessModal(name, city);

    // 3. Reset the form fields
    rsvpPopupForm.reset();
});

// --- Event Listener for Closing Success Modal Manually ---
closeModalBtn.addEventListener("click", () => {
    closeModal(successModal);
    clearInterval(intervalId); // Stop the animation if closed manually
});


// --- Reduce Motion Toggle (if you re-add this button to your HTML) ---
// This part assumes you will add a button with id="reduce-motion-toggle" back into your HTML
// For example, you could add it near your logo or in a new settings area.
if (reduceMotionToggle) { // Check if the button exists before adding listener
    reduceMotionToggle.addEventListener("click", () => {
        reduceMotion = !reduceMotion;
        reduceMotionToggle.textContent = reduceMotion ? "Enable Motion" : "Reduce Motion";

        // If the success modal is currently open, update its animation
        if (successModal.style.display === "flex") {
            updateModalAnimation();
        }
    });
}


// --- Theme Toggle (from your previous project, if you want to keep it) ---
const themeToggle = document.getElementById('theme-toggle'); // Assuming you re-add this button
const body = document.body;

if (themeToggle) { // Check if the button exists
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentText = themeToggle.textContent;
        themeToggle.textContent = currentText === 'Dark Mode' ? 'Light Mode' : 'Dark Mode';
    });
}
