// Healthcare Support Web App JavaScript

// Form display functionality
function showForm(formType) {
    // Hide all forms first
    document.getElementById('patient-form').classList.add('hidden');
    document.getElementById('volunteer-form').classList.add('hidden');
    
    // Show selected form
    if (formType === 'patient') {
        document.getElementById('patient-form').classList.remove('hidden');
        document.getElementById('patient-form').scrollIntoView({ behavior: 'smooth' });
    } else if (formType === 'volunteer') {
        document.getElementById('volunteer-form').classList.remove('hidden');
        document.getElementById('volunteer-form').scrollIntoView({ behavior: 'smooth' });
    }
}

// Form submission handlers
document.getElementById('patientSupportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Store form data (in real app, this would be sent to a server)
    console.log('Patient Support Request:', data);
    
    // Show success message
    showSuccessMessage('patient-form', 'Your support request has been submitted successfully! We will contact you soon.');
    
    // Reset form
    this.reset();
    
    // Store in localStorage for demo purposes
    const requests = JSON.parse(localStorage.getItem('patientRequests') || '[]');
    requests.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('patientRequests', JSON.stringify(requests));
});

document.getElementById('volunteerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Store form data (in real app, this would be sent to a server)
    console.log('Volunteer Registration:', data);
    
    // Show success message
    showSuccessMessage('volunteer-form', 'Thank you for registering as a volunteer! We will contact you soon with next steps.');
    
    // Reset form
    this.reset();
    
    // Store in localStorage for demo purposes
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    volunteers.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
});

function showSuccessMessage(formId, message) {
    const formContainer = document.getElementById(formId);
    const formCard = formContainer.querySelector('.form-card');
    
    // Remove existing success messages
    const existingMessage = formContainer.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and add success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    formCard.insertBefore(successDiv, formCard.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// AI Chatbot functionality
const healthcareFAQs = {
    // Common symptoms and conditions
    'fever': 'Fever is a common symptom that usually indicates your body is fighting an infection. For mild fever (under 102°F/38.9°C): rest, drink fluids, and consider over-the-counter fever reducers. Seek medical attention if fever is very high, lasts more than 3 days, or is accompanied by severe symptoms.',
    
    'headache': 'Most headaches are not serious. For tension headaches: rest in a quiet room, apply cold compress, or take OTC pain relievers. Seek immediate medical care if you have: sudden severe headache, headache with fever/stiff neck, or headache after head injury.',
    
    'cough': 'Coughs help clear your airways. For mild coughs: stay hydrated, use honey, or try over-the-counter cough medicine. See a doctor if cough lasts more than 2 weeks, produces blood, or is accompanied by shortness of breath.',
    
    'emergency': 'For medical emergencies, call 911 or your local emergency number immediately. Signs of emergency include: difficulty breathing, chest pain, severe bleeding, loss of consciousness, or signs of stroke (face drooping, arm weakness, speech difficulty).',
    
    'doctor': 'When choosing a doctor: check their credentials, read reviews, verify insurance acceptance, and consider their specialty. For primary care, look for family medicine or internal medicine specialists. Always verify they are licensed in your state.',
    
    'insurance': 'Health insurance helps cover medical costs. Key terms: Premium (monthly payment), Deductible (amount you pay before coverage), Co-pay (fixed amount for visits), and Co-insurance (percentage you pay after deductible). Contact your insurance provider for specific coverage details.',
    
    'medication': 'Always take medications as prescribed. Keep a list of all medicines you take, including over-the-counter drugs and supplements. Never share prescription medications. Store medications properly and check expiration dates. Ask your pharmacist about potential interactions.',
    
    'mental health': 'Mental health is as important as physical health. Common signs to seek help: persistent sadness, anxiety, mood changes, sleep problems, or loss of interest in activities. Resources include therapists, counselors, support groups, and crisis hotlines. You are not alone - help is available.',
    
    'nutrition': 'Balanced nutrition includes: fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, sugar, and saturated fats. Stay hydrated with water. Consider consulting a registered dietitian for personalized nutrition advice.',
    
    'exercise': 'Adults should aim for 150 minutes of moderate exercise weekly. This includes brisk walking, cycling, swimming, or dancing. Start slowly and gradually increase intensity. Always consult your doctor before starting a new exercise program, especially if you have health conditions.',
    
    'sleep': 'Adults need 7-9 hours of quality sleep nightly. Good sleep hygiene: consistent schedule, dark/quiet room, no screens before bed, avoid caffeine late in day. Poor sleep can affect physical health, mental clarity, and immune function.',
    
    'prevention': 'Preventive care includes: regular check-ups, vaccinations, screenings, and healthy lifestyle choices. Early detection saves lives. Keep up with recommended screenings for your age and risk factors. Practice good hygiene and stay up-to-date on vaccinations.',
    
    'resources': 'Healthcare resources: Emergency services (911), Community health centers, Mental health crisis lines, Prescription assistance programs, Local support groups, Telehealth services, and Public health departments. Many offer sliding scale fees based on income.',
    
    'volunteer': 'Volunteering in healthcare can include: hospital assistance, patient transport, health education, administrative support, or crisis line counseling. Requirements vary by role but often include background checks and training. Contact local hospitals or health organizations for opportunities.',
    
    'cost': 'Healthcare costs vary widely. Ways to manage: insurance coverage, payment plans, sliding scale clinics, prescription assistance programs, and comparing prices for procedures. Always ask about costs upfront and explore financial assistance options.',
    
    'telehealth': 'Telehealth allows virtual medical consultations via phone or video. Benefits: convenience, reduced exposure to germs, access to specialists. Good for: routine check-ups, follow-up visits, mental health support, and prescription refills. Not suitable for emergencies.',
    
    'children': 'Children\'s health needs regular check-ups, vaccinations, and monitoring of development. Keep current with pediatric visits, ensure proper nutrition and sleep, and create a safe environment. Know emergency signs and have a pediatrician\'s contact available.',
    
    'elderly': 'Senior health requires special attention to: fall prevention, medication management, chronic conditions, and mental health. Regular geriatric check-ups, home safety modifications, and social engagement are important. Consider advance care planning.',
    
    'chronic': 'Chronic conditions (diabetes, heart disease, arthritis) require ongoing management. Work with your healthcare team, follow treatment plans, monitor symptoms, and make lifestyle modifications. Join support groups and stay informed about your condition.',
    
    'covid': 'COVID-19 symptoms include fever, cough, fatigue, and loss of taste/smell. Most cases are mild, but risk increases with age and underlying conditions. Prevention: vaccination, hand washing, masking in crowded spaces, and staying home when sick. Seek testing if symptomatic.',
    
    'flu': 'Influenza (flu) is a respiratory virus. Symptoms: fever, body aches, cough, fatigue. Prevention: annual flu vaccine, hand washing, and avoiding sick people. Most recover with rest and fluids. High-risk individuals should seek medical care early.',
    
    'allergies': 'Common allergies include pollen, dust, food, and medication. Symptoms: sneezing, itching, rash, or breathing difficulty. For mild allergies: avoid triggers and use antihistamines. Severe allergic reactions (anaphylaxis) require immediate emergency care and epinephrine injection.',
    
    'diabetes': 'Diabetes affects blood sugar control. Type 1 requires insulin, Type 2 may be managed with diet, exercise, and medication. Regular monitoring of blood sugar, foot care, and eye exams are crucial. Work closely with your healthcare team for management.',
    
    'blood pressure': 'High blood pressure (hypertension) often has no symptoms but can lead to serious problems. Monitor regularly, reduce sodium intake, exercise, maintain healthy weight, and take prescribed medications. Normal blood pressure is below 120/80 mmHg.',
    
    'heart': 'Heart disease is a leading cause of death. Prevention: healthy diet, regular exercise, not smoking, managing blood pressure/cholesterol, and stress reduction. Warning signs: chest pain, shortness of breath, or irregular heartbeat. Seek immediate care for heart attack symptoms.',
    
    'cancer': 'Cancer risk reduction: avoid tobacco, limit alcohol, protect skin from sun, eat healthy foods, exercise, and get recommended screenings. Early detection through screenings saves lives. Know your family history and discuss risk factors with your doctor.',
    
    'pain': 'Pain management depends on cause and severity. Options: medications, physical therapy, heat/cold therapy, exercise, and relaxation techniques. Chronic pain may require specialized treatment. Always follow dosing instructions and discuss side effects with your doctor.',
    
    'dental': 'Oral health affects overall health. Brush twice daily, floss daily, and visit dentist regularly. Limit sugary foods and drinks. Problems like gum disease can affect heart health. Seek dental care for pain, bleeding, or other concerns.',
    
    'eye': 'Regular eye exams are important, especially with age or diabetes. Protect eyes from UV light, take screen breaks, and seek care for vision changes, pain, or injury. Many eye conditions are treatable when detected early.',
    
    'pregnancy': 'Prenatal care is crucial for maternal and fetal health. Attend all prenatal visits, take prenatal vitamins, avoid alcohol/tobacco, eat nutritious foods, and stay active. Discuss any concerns with your healthcare provider immediately.',
    
    'first aid': 'Basic first aid: For cuts, clean with water and apply pressure. For burns, cool with running water. For sprains, use RICE (Rest, Ice, Compression, Elevation). Keep a first aid kit and emergency numbers handy. Take a first aid course for comprehensive training.'
};

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(healthcareFAQs)) {
        if (message.includes(keyword)) {
            return response;
        }
    }
    
    // Default responses for common patterns
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return 'Hello! I\'m here to help with healthcare information. What would you like to know about?';
    }
    
    if (message.includes('thank')) {
        return 'You\'re welcome! Is there anything else I can help you with?';
    }
    
    if (message.includes('bye') || message.includes('goodbye')) {
        return 'Goodbye! Remember to seek professional medical care for serious health concerns. Stay healthy!';
    }
    
    if (message.includes('help')) {
        return 'I can help with information about common health conditions, finding healthcare resources, general wellness tips, and when to seek medical help. What specific topic would you like to know about?';
    }
    
    // If no specific match found
    return 'I can help with information about common health topics like fever, headache, emergency care, doctors, insurance, medications, mental health, nutrition, exercise, sleep, prevention, and healthcare resources. Could you be more specific about what you\'d like to know? Or try keywords like "emergency", "doctor", or "fever".';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot response delay
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 1000);
}

function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = message;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<span class="loading"></span> Thinking...';
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jarurat Care Healthcare Support App initialized');
    
    // Add some demo data for testing (optional)
    if (!localStorage.getItem('patientRequests')) {
        console.log('No existing patient requests found');
    }
    
    if (!localStorage.getItem('volunteers')) {
        console.log('No existing volunteers found');
    }
});

// Utility function to view stored data (for demo purposes)
function viewStoredData() {
    console.log('Patient Requests:', JSON.parse(localStorage.getItem('patientRequests') || '[]'));
    console.log('Volunteers:', JSON.parse(localStorage.getItem('volunteers') || '[]'));
}

// Make this function available in console for debugging
window.viewStoredData = viewStoredData;
