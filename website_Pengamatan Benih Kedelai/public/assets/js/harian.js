//Foto Harian
firebase.storage().ref().child('pictures/').listAll().then(async(res) => {
  let itemRef = res.items[res.items.length-1];
  let url = await itemRef.getDownloadURL()
    document.getElementById("id_hasil_benih").src = url;
});

//Sensor
const hasil_suhu = document.getElementById("hasil_suhu")
const hasil_kondisicahaya = document.getElementById("hasil_kondisicahaya")
const hasil_intensitas = document.getElementById("hasil_intensitas")
const hasil_kelembaban = document.getElementById("hasil_kelembaban")
const hasil_kondisimedia = document.getElementById("hasil_kondisimedia")

firebase.database().ref('DHT11').on("value", (snap)=>{
snap.forEach(function(childShapshot){
  var childData = childShapshot.val();
  hasil_suhu.innerHTML = (`<div> Suhu : ${childData}</div>`);
});
});

firebase.database().ref('/Sensor Light Intensity/Kondisi').on("value", (snap)=>{
snap.forEach(function(childShapshot){
  var childData = childShapshot.val();
  hasil_kondisicahaya.innerHTML = (`<div> Kondisi Cahaya: ${childData}</div>`); 
});
});

firebase.database().ref('/Sensor Light Intensity/Cahaya').on("value", (snap)=>{
snap.forEach(function(childShapshot){
  var childData = childShapshot.val();
  hasil_intensitas.innerHTML = (`<div> Intensitas Cahaya: ${childData}</div>`);
});
});

firebase.database().ref('/Sensor Soil Moisture/Kelembaban Tanah').on("value", (snap)=>{
snap.forEach(function(childShapshot){
  var childData = childShapshot.val();
  hasil_kelembaban.innerHTML = (`<div> Kelembaban Media : ${childData}</div>`);
});
});

firebase.database().ref('/Sensor Soil Moisture/Kondisi').on("value", (snap)=>{
snap.forEach(function(childShapshot){
  var childData = childShapshot.val();
  if (childData == "Tanah Kering"){
    var kondisimedia = "Media Kering"
  }
  else{
    var kondisimedia= "Media Basah"
  }
  hasil_kondisimedia.innerHTML = (`<div> Kondisi Media : ${kondisimedia}</div>`);
});
});