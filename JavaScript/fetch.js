
let jsonData;

fetch("listing.json") /* Je fais une requette pour récupérer mon fichier JSON*/
.then(response => response.json()) /*J'initialise  */
.then(data => afficheObj(data));


function afficheObj(data) {
  jsonData=data.Club;
  
  jsonData.forEach(function (club) {
    
    var marker = new google.maps.Marker({
      position: { lat: parseFloat(club.Latitude), lng: parseFloat(club.Longitude) }, /*parsefloat: convertir en numériqiue*/
      map: map,	
      title: club.nom_club,
      icon: {
        url: './img/gant3.png ',
      scaledSize: new google.maps.Size(25, 25)
      }
    });
  });
}

let map;
let marker;
let geocoder;
let responseDiv;
let response;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: {lat:48.68,lng: 6.2},
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  
  
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
}

function clear() {
  marker.setMap(null);
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}


window.initMap = initMap;

function search() {

  
  // Discipline entrée par l'utilisateur
  const adressedVille = document.getElementById("search-form").value.toLowerCase;
  const adresseSport_pratique = document
    .getElementById("search-form")
    .value.toLowerCase();

  
    // Suppprime les marqueurs précédents
  clearMarkers();

  
  
  // Je parcour le tableau 'club' pour trouver les éléments correspondant à la discipline
  for (let i = 0; i < club.length; i++) {
    const element = club[i];
    const elementVille = element.Ville.toLowerCase();
    const elementSport_pratique = element.Sport_pratique.toLowerCase();


    
    // Je vérifie si la discipline correspond à celle entrée par l'utilisateur
    if (elementSport_pratique.includes(adresseSport_pratique)) {

       
      // Je créer un nouveau marqueur sur la carte
      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(element.Latitude),
          lng: parseFloat(element.Longitude),
        },
        map: map,
        title: element.nom_club,
      });


      // J'ajoute le marqueur à la liste des marqueurs.
      markers.push(marker);
    }


  }
}

// Sélectionnez l'élément HTML où afficher les informations JSON.
var jsonContainer = document.getElementById('search-results');

// Parcourez les données JSON et affichez-les dans la page.
jsonData.forEach(function (club) {
  var element = document.createElement('div');
  element.innerHTML = `
    <h2>${club.nom_club}</h2>
    <p>${club.Sport_pratique}</p>
    <p>${club.Sport_Adresse}</p>
    <p>${club.Sport_Ville}</p>
    
    `;


  jsonContainer.appendChild(element);
});






