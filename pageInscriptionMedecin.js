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
    document.getElementById('confirmProfession').innerText = document.getElementById('Profession').value;
    document.getElementById('confirmNumprof').innerText = document.getElementById('numProf').value;
    document.getElementById('confirmFacturation').innerText = document.querySelector('input[name="factMedecin"]:checked').value;
    document.getElementById('confirmNumTel').innerText = document.getElementById('numTel').value;
    document.getElementById('confirmEmail').innerText = document.getElementById('email').value;
    document.getElementById('confirmClinique').innerText = document.getElementById('clinique').value;





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
