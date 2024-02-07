// fetch.js
// Charge le fichier JSON et stocke les données dans la variable 'club'

fetch("/JavaScript/listing.json")
  .then((response) => response.json())
  .then((data) => {
    window.club = data.club; // Stockez les données dans une variable globale
  })
  .catch((error) =>
    console.error("Erreur lors du chargement du fichier JSON :", error)
  );

let input = document.getElementById("formul");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("bouton").click();
  }
});

// script.js
// Logique pour afficher la carte et les marqueurs

let map;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 48.68423, lng: 6.170488 }, // Coordonnées du centre de la carte
    zoom: 12, // Niveau de zoom
    mapId: "4504f8b37365c3d0",
  });
}

function search() {
  // Je récupère la discipline entrée par l'utilisateur
  const adressedVille = document.getElementById("formul").value.toLowerCase;
  const adressediscipline = document
    .getElementById("formul")
    .value.toLowerCase();

  // Je suppprime les marqueurs précédents
  clearMarkers();

  // Je parcour le tableau 'club' pour trouver les éléments correspondant à la discipline
  for (let i = 0; i < club.length; i++) {
    const element = club[i];
    const elementville = element.Ville.toLowerCase();
    const elementDiscipline = element.discipline.toLowerCase();

    // Je vérifie si la discipline correspond à celle entrée par l'utilisateur
    if (elementDiscipline.includes(adressediscipline)) {
      // Je créer un nouveau marqueur sur la carte
      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(element.Latitude), 
          lng: parseFloat(element.Longitude),
        },
        map: map,
        title: element.nom_club,
      });

      // J'ajoute le marqueur à la liste des marqueurs
      markers.push(marker);
    }
  }
}

// Ajouter un  listener click sur chaques marqueurs, et configurer la fenêtre.
marker.addListener("click", ({ domEvent, latLng }) => {
  const { target } = domEvent;

  infoWindow.close();
  infoWindow.setContent(marker.title);
  infoWindow.open(marker.map, marker);
});

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = []; // Je réinitialise la liste des marqueurs
}
