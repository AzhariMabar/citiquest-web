


const pages = document.querySelectorAll('.page');
const pagination = document.getElementById('pagination');
let currentPageIndex = 0;
let lastPageChangeTime = performance.now(); // Waktu terakhir perubahan halaman
let isWheelLocked = false; // Apakah mouse wheel sedang terkunci
let currentScrollY = 0; // Penyimpanan posisi scroll saat perpindahan halaman terakhir
const wheelLockTimeout = 800; // Timeout untuk mengunci mouse wheel setelah perpindahan halaman (dalam milidetik)

// Membuat pagination
pages.forEach((page, index) => {
  const paginationItem = document.createElement('div');
  paginationItem.classList.add('pagination-item');
  paginationItem.addEventListener('click', () => goToPage(index));
  pagination.appendChild(paginationItem);
});

// Fungsi navigasi ke halaman tertentu
function goToPage(index) {
  if (index >= 0 && index < pages.length && index !== currentPageIndex) {
    pages.forEach((page, pageIndex) => {
      page.style.transform = `translateY(-${100 * index}vh)`;
    });
    currentPageIndex = index;
    updatePagination(index);
    lastPageChangeTime = performance.now(); // Update waktu terakhir perubahan halaman
    lockWheel(); // Kunci mouse wheel untuk sementara
  }
}

// Update status pagination
function updatePagination(index) {
  const paginationItems = document.querySelectorAll('.pagination-item');
  paginationItems.forEach((item, pageIndex) => {
    if (pageIndex === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Kunci mouse wheel untuk sementara setelah perpindahan halaman
function lockWheel() {
  isWheelLocked = true;
  setTimeout(() => {
    isWheelLocked = false;
  }, wheelLockTimeout);
}

// Event listener untuk mendeteksi pergerakan scroll dengan mouse wheel
window.addEventListener('wheel', (event) => {
  // Cek apakah mouse wheel sedang terkunci
  if (!isWheelLocked) {
    // Cek apakah sudah melewati timeout setelah perpindahan halaman terakhir
    if (performance.now() - lastPageChangeTime >= wheelLockTimeout) {
      if (event.deltaY > 0 && currentPageIndex < pages.length - 1) {
        goToPage(currentPageIndex + 1);
      } else if (event.deltaY < 0 && currentPageIndex > 0) {
        goToPage(currentPageIndex - 1);
      }
    }
  }
});

// Event listener untuk menyimpan posisi scroll saat menghentikan swipe
window.addEventListener('scroll', () => {
  if (!isWheelLocked) {
    currentScrollY = window.scrollY;
  }
});

// Set halaman pertama sebagai halaman aktif secara default
goToPage(0);

document.getElementById('explore').addEventListener('click', function () {
      goToPage(1);

    });

var modal = document.getElementById('video-modal')
var videoPlayer = document.getElementById('video-player');
var playButton = document.getElementById('play-button');

// Tambahkan event listener untuk video player
videoPlayer.addEventListener('play', function() {
  modal.style.display = 'block'; // Tampilkan modal saat video dimainkan
});

// Tambahkan event listener untuk tombol play
playButton.addEventListener('click', function() {
  videoPlayer.play(); // Mainkan video saat tombol play diklik
});



// Tambahkan fungsi untuk menampilkan modal saat thumbnail diklik
document.querySelector('.thumbnail').addEventListener('click', function() {
  modal.style.display = 'block';
  videoPlayer.play(); // Mainkan video saat tombol play diklik

});

// Tambahkan fungsi untuk menutup modal saat tombol close diklik
document.querySelector('.close').addEventListener('click', function() {
  modal.style.display = 'none';
  videoPlayer.pause();
});

// Tambahkan fungsi untuk menutup modal saat mengklik di luar modal
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    videoPlayer.pause();
  }
});

// Function to open popup form
    function openPopup() {
      document.getElementById('popupOverlay').style.display = 'flex';
    }

    // Function to close popup form
    function closePopup() {
      document.getElementById('popupOverlay').style.display = 'none';
    }

    // Function to subscribe
    function subscribe(event) {
      event.preventDefault();
      // Get input values
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let wallet = document.getElementById('wallet').value;
      // Here you can handle subscription, including both email and wallet address
      console.log("Subscribed! Name:", name, "Email:", email, "Wallet:", wallet);
      // After subscription, you may close the popup

      if (!isValidEmail(email)) {
            alert("Invalid email format. Please enter a valid email address.");
            return;
        }


       // Memeriksa apakah email sudah berlangganan sebelumnya
        checkIfSubscribed(email)
            .then((isSubscribed) => {
                if (isSubscribed) {
                    alert("You are already subscribed!");
                } else {
                    // Jika belum berlangganan, memanggil fungsi untuk menambahkan subscriber ke Firestore
                    addSubscriber(name, email,wallet);
                }
            })
            .catch((error) => {
                console.error("Error checking subscription status: ", error);
            });


      // Memanggil fungsi untuk menambahkan subscriber ke Firestore
     // addSubscriber(name, email);



      closePopup();
    }

    // Function to connect with Metamask
    function connectWithMetamask() {
      if (typeof window.ethereum !== 'undefined') {
        console.log('Metamask is installed!');
        // Request user permission
        ethereum.enable()
          .then(function (accounts) {
            // Get wallet address
            let walletAddress = accounts[0];
            console.log("Connected with wallet address:", walletAddress);
            // Add wallet address to input field
            document.getElementById('wallet').value = walletAddress;
            document.getElementById('walletInput').style.display = 'flex';
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        // Custom alert popup
        let alertPopup = document.createElement('div');
        alertPopup.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show');
        alertPopup.setAttribute('role', 'alert');
        alertPopup.innerHTML = `
          <strong>Metamask is not installed!</strong> Please install Metamask to proceed.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        `;
        // Append alert popup to body
        document.body.appendChild(alertPopup);
        // Redirect to Metamask download page after 5 seconds
        setTimeout(function () {
          window.location.href = 'https://metamask.io/download.html';
        }, 5000);
      }
    }




// Menggantikan dengan konfigurasi firebase proyek Anda
const firebaseConfig = {
  apiKey: "AIzaSyASxwUmab4zRBU8Dxg_KPHVaY19ciqIx38",
  authDomain: "citiquest-id.firebaseapp.com",
  projectId: "citiquest-id",
  storageBucket: "citiquest-id.appspot.com",
  messagingSenderId: "858119984754",
  appId: "1:858119984754:web:5eb7bed8dd5c931c4b54eb",
  measurementId: "G-6D9PKRN5XV"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Referensi Firestore
const db = firebase.firestore();


// Fungsi untuk menambahkan subscriber ke Firestore
function addSubscriber(name, email , metamask) {
  // Menambahkan data ke koleksi "subscribers"
  db.collection("subscribers").add({
    name: name,
    email: email,
    wallet: metamask

  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    alert("Subscription successful!");
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    alert("Subscription failed. Please try again.");
  });
}

function checkIfSubscribed(email) {
    return new Promise((resolve, reject) => {
        // Membuat kueri untuk memeriksa apakah email sudah ada dalam koleksi "subscribers"
        db.collection("subscribers")
            .where("email", "==", email)
            .get()
            .then((querySnapshot) => {
                // Jika querySnapshot tidak kosong, berarti email sudah ada
                resolve(!querySnapshot.empty);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
