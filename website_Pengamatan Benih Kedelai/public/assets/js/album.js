var hasil_gambar= document.querySelector('#album_gambar')

firebase.storage().ref().child('pictures/').listAll().then(async(res) => {
  for (let i=0; i<res.items.length; i++)
   {
    let itemRef = res.items[i];
    let url = await itemRef.getDownloadURL()
      hasil_gambar.innerHTML += (`
      <div class="card" style="width: 270px; padding : 5px 5px;margin: 5px;">
        <img src="${url}" onClick="popup('${url}')" class="card-img-top" style="width:260px;height:195px;object-fit:cover;" >
        <div class="card-body">
          <p class="card-text">${i+1}</p>
        </div>
      </div>

      `);
   }
});  
// Popup
var popUp = document.getElementById("popUp");
var popUpImg = document.getElementById("popUp-img");

function popup(gambar) {
    popUp.style.display = "block";
    popUpImg.src = gambar;
}
