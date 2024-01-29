// Fonction pour gérer le blocage de la journée entière
function handleFullDayBlock(cell) {
    cell.classList.toggle('selected');
    updateSelectedDatesAppearance();
}


// Fonction pour gérer le clic sur une date dépendamment du type de blocage
function handleDateClick(cell) {
    let blockType = document.getElementById("typeBlocage").value;

    if (blockType === "journeeEntiere") {
        handleFullDayBlock(cell);
    } else if (blockType === "horaireSpecific") {
        handleSpecificTimeBlock(cell);
    }
}


// Fonction pour gérer le blocage avec plage horaire spécifique
function handleSpecificTimeBlock(cell) {
    cell.classList.toggle('selected');
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;

    if (startTime && endTime) {

        cell.setAttribute("data-start-time", startTime);
        cell.setAttribute("data-end-time", endTime);
        updateSelectedDatesAppearance();
    } else {
        alert("Veuillez sélectionner une heure de début et une heure de fin.");
    }
}

// Fonction pour afficher ou masquer les sélecteurs de temps en fonction du type de blocage choisi
function toggleSpecificTimeContainer() {
    let blockType = document.getElementById("typeBlocage").value;
    let specificTimeContainer = document.getElementById("specificTimeContainer");

    specificTimeContainer.style.display = blockType === "horaireSpecific" ? "block" : "none";
}

// Fonction pour sauvegarder les dates bloquées
function sauvegardeDatesBloquees() {
    let blockedDates = document.querySelectorAll('.date-picker.selected');
    let blockedDatesArray = [];

    blockedDates.forEach(date => {
        let blockedDateObj = {
            day: date.getAttribute('data-date'),
            month: date.getAttribute('data-month'),
            year: date.getAttribute('data-year'),
            startTime: date.getAttribute('data-start-time') || null,
            endTime: date.getAttribute('data-end-time') || null
        };
        blockedDatesArray.push(blockedDateObj);
    });


    // Affichage tableau dans la console
    /*
    console.log("Tableau de dates bloquées :");
    console.table(blockedDatesArray);
*/


    // Mettre à jour l'apparence des dates sélectionnées
    updateSelectedDatesAppearance();


    displaySelectedDates(blockedDatesArray);
}

// Affichage du tableau des dates sélectionnées
function displaySelectedDates(datesArray) {
    let displayDiv = document.getElementById('selectedDatesDisplay');
    displayDiv.innerHTML = '<h3>Dates Indisponibles :</h3>';

    if (datesArray.length > 0) {
        datesArray.forEach(date => {
            let dateStr = `${date.day}/${date.month}/${date.year}`;

            if (date.startTime && date.endTime) {
                dateStr += ` (${date.startTime} - ${date.endTime})`;
            }

            displayDiv.innerHTML += `<p>${dateStr}</p>`;
        });
    } else {
        displayDiv.innerHTML += '<p>Aucune date sélectionnée</p>';
    }

    displayDiv.style.display = 'block';
}


// Gestionnaire d'événements pour le clic sur le bouton Enregistrer Modification
document.getElementById("btnEnregistrerModif").addEventListener("click", function () {
    sauvegardeDatesBloquees();
    //Mis à jour de l'apparence après l'enregistrement
    updateSelectedDatesAppearance();
});


// Génération d'une plage d'année pour une selection donnée
function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" +
            year + "'>" + year + "</option>";
    }
    return years;
}

// Initialize date-related variables
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

createYear = generate_year_range(1970, 2050);

document.getElementById("year").innerHTML = createYear;

let calendar = document.getElementById("calendar");

let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

$dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" +
        days[dhead] + "'>" +
        days[dhead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;

monthAndYear =
    document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

// Fonction pour aller au mois suivant
function next() {
    currentYear = currentMonth === 11 ?
        currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

// Fonction pour aller au mois précédent
function previous() {
    currentYear = currentMonth === 0 ?
        currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ?
        11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

// Fonction pour aller à un mois spécifique
function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

// Fonction création calendrier
function showCalendar(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";

                if (
                    date === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth()
                ) {
                    cell.className = "date-picker selected";
                }

                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}

// Fonction pour obtenir le nombre de jour du mois
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

// Fonction pour afficher le calendrier
showCalendar(currentMonth, currentYear);

// Gestionnaire d'événements pour le clic sur les cellules du calendrier
document.getElementById("calendar-body").addEventListener("click", function (event) {
    if (event.target.classList.contains("date-picker")) {
        handleDateClick(event.target);
    }
});

// Gestionnaire d'événement du changement du type de blocage
document.getElementById("typeBlocage").addEventListener("change", toggleSpecificTimeContainer);


// Fonction pour mettre à jour l'apparence des dates sélectionnées
function updateSelectedDatesAppearance() {
    //Rangement des dates sélectionnées dans une collection
    let selectedDates = document.querySelectorAll('.date-picker.selected');

    // Supprimer la classe 'selected' de toutes les dates en guise de nettoyage
    document.querySelectorAll('.date-picker').forEach(date => {
        // Suppression de la classe 'selected' en guise de nettoyage
        date.classList.remove('selected');
        // Suppression de la classe 'selected-saved' en guise de nettoyage
        date.classList.remove('selected-saved');
    });

    // Ajout de la classe 'selected' aux dates sélectionnées
    selectedDates.forEach(date => {
        date.classList.add('selected');
    });

    // Ajout de la classe 'selected-saved' pour gérer la couleur après l'enregistrement
    selectedDates.forEach(date => {
        date.classList.add('selected-saved');
    });
}


