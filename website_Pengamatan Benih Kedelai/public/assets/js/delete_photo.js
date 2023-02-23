var delete_foto = document.getElementById("delete_photo")

firebase.storage().ref().child('pictures/').listAll().then(async(res) => {
  for (let i=0; i<res.items.length; i++)
   {
    let itemRef = res.items[i];
    let url = await itemRef.getDownloadURL();
    
    delete_foto.innerHTML += (`
      <img src = "${url}" id="${url}" class="col-lg-6">
      <button onClick="hapusfoto('${url}')">Hapus</button>
      `);
   }
});   

function hapusfoto(gambar){
  if (confirm("Apakah Anda yakin menghapus gambar ini?")) {
    var fileRef = firebase.storage().refFromURL(gambar);
    fileRef.delete().then(function () {
      alert("Foto berhasil dihapus!");
      location.reload();
    });
  }
};