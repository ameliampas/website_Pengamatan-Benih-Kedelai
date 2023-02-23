const container = document.getElementById("admin");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        dasboard_admin();
    } else {
        login_admin();
    }
  });

function login_admin(){
    container.innerHTML = (`
    <div class="section-header">
        <h2>Admin</h2>
        <p>Masuk ke<span> Akun Anda</span></p>
    </div>
    <div class="card">
        <h5>Masuk ke Akun Anda</h5>
        <p>Masukkan e-mail & password untuk login</p>
        <div style="text-align: left;">
            <form>
            <label>Email</label>
            <input type="text" name="email" class="form-control" id="email" placeholder="Masukkan e-mail" required>
            <label>Password</label>
            <input type="password" class="form-control" id="password" placeholder="Masukkan password" required>
            <input type="checkbox" onclick="cekpass()">Show Password
            </form>
        </div>
        <div>
            <button type="submit" class="btn" id="login">Login</button>
        </div>
    </div>
    `);
    
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const btnlogin = document.getElementById("login")
    
    btnlogin.onclick=() =>{
        firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {
            alert(`Selamat Datang, Anda berhasil masuk!`);
        })
        .catch((error) => {
            alert(error);
        });

        
    }
}
function dasboard_admin(){
    container.innerHTML=(`
    <div class="container" data-oas="fade-up">
      <div style="text-align: right">
        <button id="logout">Logout</button>
      </div>
      <div class="section-header">
          <h2>Hapus Gambar</h2>
          <p>Pilih Gambar <span>yang Ingin dihapus</span></p>
      </div>
      <div id="delete_photo"></div>
    </div>
    </section>
    `);
    const delete_foto = document.getElementById("delete_photo")
    const btnlogout = document.getElementById("logout")
    
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

    btnlogout.onclick=() =>{
        firebase.auth().signOut().then(() => {
            alert("Anda Berhasil Logout!")
            window.location.href = "admin.html";
          }).catch((error) => {
            console.log(error)
          });      
    }

}
function hapusfoto(gambar){
    if (confirm("Apakah Anda yakin menghapus gambar ini?")) {
        var fileRef = firebase.storage().refFromURL(gambar);
        fileRef.delete().then(function () {
        alert("Foto berhasil dihapus!");
        location.reload();
        });
    }
}