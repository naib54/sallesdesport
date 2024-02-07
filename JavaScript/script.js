function loadJSON(url, callback) {
  fetch(url)
      .then(response => response.json())
      .then(data => {
          callback(data);
      })
      .catch(error => {
          console.error('Erreur lors du chargement du fichier JSON : ', error);
      });
}

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 48.6833, lng: 6.2 },
      zoom: 2
  });

  loadJSON('http://localhost/listing.json', function(data) {
      data.forEach(item => {
          const marker = new google.maps.Marker({
              position: { lat: item.latitude, lng: item.longitude },
              map: map,
              title: item.nom
          });
      });
  });
}




