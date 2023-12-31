let currentStep = 1;

function nextStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
    currentStep = step + 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
    updateConfirmation();
}

function prevStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
    currentStep = step - 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
    updateConfirmation();
}

function updateConfirmation() {
    document.getElementById('confirmNom').innerText = document.getElementById('nom').value;
    document.getElementById('confirmPrenom').innerText = document.getElementById('prenom').value;
    document.getElementById('confirmNumAssurance').innerText = document.getElementById('numAssurance').value;
    document.getElementById('confirmNumSeq').innerText = document.getElementById('numSeq').value;
    document.getElementById('confirmDateNaissance').innerText = document.getElementById('dateNaissance').value;
    document.getElementById('confirmGenre').innerText = document.querySelector('input[name="genre"]:checked').value;
}

function showPopup() {

    $('#successModal').modal('show');
}

function submitForm() {

    showPopup();
}

function redirectToHomePage() {
    
    window.location.href = 'pageAcceuil.html'; 
}

let $ = jQuery.noConflict();
