let currentStep = 1;


//Fonction permettant d'aller à l'étape suivante
function nextStep(step) {


    document.getElementById(`step${step}`).classList.remove('active');
    currentStep = step + 1;
    //Ceci permet de rendre visible les informations du bloc courant en lui ajoutant la classe active
    document.getElementById(`step${currentStep}`).classList.add('active');
    updateConfirmation();


}

//Fonction permettant de retourner à l'étape précédente
function prevStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
    currentStep = step - 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
     updateConfirmation();
}


//Fonction permettant de récupérer les informations du formulaire lors de l'inscription de la clinique
function updateConfirmation() {
    document.getElementById('confirmNomClinique').innerText = document.getElementById('nomClinique').value;
    document.getElementById('confirmNumeroRueClinique').innerText = document.getElementById('numRueClinique').value;
    document.getElementById('confirmNomRueClinique').innerText = document.getElementById('nomRueClinique').value;
    document.getElementById('confirmCodePostalClinique').innerText = document.getElementById('codePostalClinique').value;
    document.getElementById('confirmNumTelephoneClinique').innerText = document.getElementById('numTelephoneClinique').value;
    document.getElementById('confirmCourrielClinique').innerText = document.getElementById('courrielClinique').value;
}

function showPopup() {

    $('#successModal').modal('show');
}

function submitForm() {

    showPopup();
}



function redirectToHomePage() {

    window.location.href = 'pageAccueil.html';
}

let $ = jQuery.noConflict();