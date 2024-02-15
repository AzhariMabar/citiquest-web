


const pages = document.querySelectorAll('.page');
const pagination = document.getElementById('pagination');
let currentPageIndex = 0;
let lastPageChangeTime = performance.now();
let isWheelLocked = false;
let currentScrollY = 0;
const wheelLockTimeout = 800;

pages.forEach((page, index) => {
  const paginationItem = document.createElement('div');
  paginationItem.classList.add('pagination-item');
  paginationItem.addEventListener('click', () => goToPage(index));
  pagination.appendChild(paginationItem);
});

function goToPage(index) {
  if (index >= 0 && index < pages.length && index !== currentPageIndex) {
    pages.forEach((page, pageIndex) => {
      page.style.transform = `translateY(-${100 * index}vh)`;
    });
    currentPageIndex = index;
    updatePagination(index);
    lastPageChangeTime = performance.now();
    lockWheel();
  }
}

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

function lockWheel() {
  isWheelLocked = true;
  setTimeout(() => {
    isWheelLocked = false;
  }, wheelLockTimeout);
}

window.addEventListener('wheel', (event) => {
  if (!isWheelLocked) {
    if (performance.now() - lastPageChangeTime >= wheelLockTimeout) {
      if (event.deltaY > 0 && currentPageIndex < pages.length - 1) {
        goToPage(currentPageIndex + 1);
      } else if (event.deltaY < 0 && currentPageIndex > 0) {
        goToPage(currentPageIndex - 1);
      }
    }
  }
});

window.addEventListener('scroll', () => {
  if (!isWheelLocked) {
    currentScrollY = window.scrollY;
  }
});

goToPage(0);

document.getElementById('explore').addEventListener('click', function () {
      goToPage(1);

    });

var modal = document.getElementById('video-modal')
var videoPlayer = document.getElementById('video-player');
var playButton = document.getElementById('play-button');

videoPlayer.addEventListener('play', function() {
  modal.style.display = 'block';
});

playButton.addEventListener('click', function() {
  videoPlayer.play();
});

document.querySelector('.thumbnail').addEventListener('click', function() {
  modal.style.display = 'block';
  videoPlayer.play();

});

document.querySelector('.close').addEventListener('click', function() {
  modal.style.display = 'none';
  videoPlayer.pause();
});

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    videoPlayer.pause();
  }
});

    function openPopup() {
      document.getElementById('popupOverlay').style.display = 'flex';
    }

    function closePopup() {
      document.getElementById('popupOverlay').style.display = 'none';
    }

    function subscribe(event) {
      event.preventDefault();
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let wallet = document.getElementById('wallet').value;
      console.log("Subscribed! Name:", name, "Email:", email, "Wallet:", wallet);

      if (!isValidEmail(email)) {
            alert("Invalid email format. Please enter a valid email address.");
            return;
        }

        checkIfSubscribed(email)
            .then((isSubscribed) => {
                if (isSubscribed) {
                    alert("You are already subscribed!");
                } else {
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

    function connectWithMetamask() {
      if (typeof window.ethereum !== 'undefined') {
        console.log('Metamask is installed!');
        ethereum.enable()
          .then(function (accounts) {
            let walletAddress = accounts[0];
            console.log("Connected with wallet address:", walletAddress);
            document.getElementById('wallet').value = walletAddress;
            document.getElementById('walletInput').style.display = 'flex';
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        let alertPopup = document.createElement('div');
        alertPopup.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show');
        alertPopup.setAttribute('role', 'alert');
        alertPopup.innerHTML = `
          <strong>Metamask is not installed!</strong> Please install Metamask to proceed.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        `;
        document.body.appendChild(alertPopup);
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
