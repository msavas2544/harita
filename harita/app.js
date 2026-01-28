// Erzurum Harita Uygulaması
// Vanilla JS + Leaflet.js + LocalStorage

const map = L.map('map').setView([39.9043, 41.2717], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markerColors = ['blue', 'red', 'green', 'orange', 'purple'];
let markers = [];

function saveMarkers() {
  localStorage.setItem('erzurum_markers', JSON.stringify(markers.map(m => ({
    lat: m.marker.getLatLng().lat,
    lng: m.marker.getLatLng().lng,
    label: m.label,
    color: m.color
  }))));
}

function loadMarkers() {
  const data = localStorage.getItem('erzurum_markers');
  if (data) {
    JSON.parse(data).forEach(m => addMarker([m.lat, m.lng], m.label, m.color));
  }
}

function addMarker(latlng, label, color) {
  const icon = L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });
  const marker = L.marker(latlng, { icon, draggable: true }).addTo(map);
  marker.bindPopup(`<b>${label}</b>`);
  marker.on('dragend', () => {
    m.lat = marker.getLatLng().lat;
    m.lng = marker.getLatLng().lng;
    saveMarkers();
    renderMarkerList();
  });
  marker.on('click', () => marker.openPopup());
  const m = { marker, label, color };
  markers.push(m);
  saveMarkers();
  renderMarkerList();
}

function renderMarkerList() {
  const list = document.getElementById('marker-list');
  list.innerHTML = '';
  markers.forEach((m, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span style="color:${m.color}">●</span> ${m.label}`;
    const showBtn = document.createElement('button');
    showBtn.textContent = 'Göster';
    showBtn.onclick = () => {
      map.setView(m.marker.getLatLng(), 16);
      m.marker.openPopup();
    };
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Sil';
    delBtn.onclick = () => {
      map.removeLayer(m.marker);
      markers.splice(i, 1);
      saveMarkers();
      renderMarkerList();
    };
    li.appendChild(showBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function clearAllMarkers() {
  markers.forEach(m => map.removeLayer(m.marker));
  markers = [];
  saveMarkers();
  renderMarkerList();
}

document.getElementById('clear-btn').onclick = clearAllMarkers;
document.getElementById('export-btn').onclick = () => {
  const data = JSON.stringify(markers.map(m => ({
    lat: m.marker.getLatLng().lat,
    lng: m.marker.getLatLng().lng,
    label: m.label,
    color: m.color
  })), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'erzurum_markers.json';
  a.click();
  URL.revokeObjectURL(url);
};
document.getElementById('import-btn').onclick = () => {
  document.getElementById('import-file').click();
};
document.getElementById('import-file').onchange = function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      clearAllMarkers();
      const arr = JSON.parse(evt.target.result);
      arr.forEach(m => addMarker([m.lat, m.lng], m.label, m.color));
    } catch {
      alert('Geçersiz dosya!');
    }
  };
  reader.readAsText(file);
};

// Popup yönetimi
const popup = document.getElementById('popup');
const popupLabel = document.getElementById('popup-label');
const popupSave = document.getElementById('popup-save');
let popupLatLng = null;

map.on('click', function(e) {
  popupLatLng = e.latlng;
  popup.style.left = (e.originalEvent.pageX + 10) + 'px';
  popup.style.top = (e.originalEvent.pageY - 20) + 'px';
  popup.classList.remove('hidden');
  popupLabel.value = '';
  popupLabel.focus();
});
popupSave.onclick = function() {
  if (popupLabel.value.trim()) {
    const color = markerColors[Math.floor(Math.random() * markerColors.length)];
    addMarker([popupLatLng.lat, popupLatLng.lng], popupLabel.value.trim(), color);
    popup.classList.add('hidden');
  }
};
popupLabel.onkeydown = function(e) {
  if (e.key === 'Enter') popupSave.onclick();
};
document.body.addEventListener('click', function(e) {
  if (!popup.contains(e.target) && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
    popup.classList.add('hidden');
  }
});

// Adres veya koordinat ile ekleme
function geocodeAddress(address, callback) {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ' Erzurum')}`)
    .then(r => r.json())
    .then(data => {
      if (data && data.length > 0) {
        callback([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        alert('Adres bulunamadı!');
      }
    });
}

function tryAddByInput(input) {
  const coordMatch = input.match(/([0-9.]+)[,\s]+([0-9.]+)/);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lng = parseFloat(coordMatch[2]);
    if (!isNaN(lat) && !isNaN(lng)) {
      const color = markerColors[Math.floor(Math.random() * markerColors.length)];
      addMarker([lat, lng], input, color);
      return;
    }
  }
  geocodeAddress(input, function(latlng) {
    const color = markerColors[Math.floor(Math.random() * markerColors.length)];
    addMarker(latlng, input, color);
  });
}

// Arama kutusu
const searchBox = document.createElement('input');
searchBox.type = 'text';
searchBox.placeholder = 'Adres veya koordinat girin...';
searchBox.id = 'search-box';
searchBox.style.width = '100%';
searchBox.style.marginBottom = '8px';
document.getElementById('sidebar').insertBefore(searchBox, document.getElementById('marker-list'));
searchBox.onkeydown = function(e) {
  if (e.key === 'Enter' && searchBox.value.trim()) {
    tryAddByInput(searchBox.value.trim());
    searchBox.value = '';
  }
};
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    searchBox.focus();
    e.preventDefault();
  }
});

// Yükleme
loadMarkers();
renderMarkerList();
