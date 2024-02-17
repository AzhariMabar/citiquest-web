document.addEventListener('DOMContentLoaded', function() {
    // Select all roadmap sections
    let roadmapSections = [
        document.getElementById('january-roadmap'),
        document.getElementById('february-roadmap'),
        document.getElementById('march-roadmap'),
        document.getElementById('Q1-roadmap'),
        document.getElementById('april-roadmap'),
        document.getElementById('may-roadmap'),
        document.getElementById('june-roadmap'),
        document.getElementById('Q2-roadmap')
    ];

    // Select all arrow elements
    let arrows = [
        document.getElementById('nextSectionJanuary'),
        document.getElementById('nextSectionFebruary'),
        document.getElementById('nextSectionMarch'),
        document.getElementById('nextSectionQ1'),
        document.getElementById('nextSectionApril'),
        document.getElementById('nextSectionMay'),
        document.getElementById('nextSectionJune'),
        document.getElementById('nextSectionQ2')
    ];

    // Set the initial current roadmap index
    let currentRoadmapIndex = 0;

    // Function to toggle between roadmap sections
    function toggleRoadmaps() {
        // Hide the current roadmap section
        roadmapSections[currentRoadmapIndex].style.display = 'none';

        // Move to the next roadmap section
        currentRoadmapIndex = (currentRoadmapIndex + 1) % roadmapSections.length;

        // Show the next roadmap section
        roadmapSections[currentRoadmapIndex].style.display = 'block';
    }

    // Add event listeners to all arrow elements
    arrows.forEach((arrow, index) => {
        arrow.addEventListener('click', function() {
            toggleRoadmaps();
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all sponsor sections
    let sponsorSections = [
        document.getElementById('sponsors-page'),
        document.getElementById('partners-and-supporters-page')
    ];

    // Select the arrow elements
    let sponsorArrow = document.getElementById('partners-and-supporters');
    let partnersArrow = document.getElementById('sponsors');

    // Set the initial current sponsor index
    let currentSponsorIndex = 0;

    // Function to toggle between sponsor sections
    function toggleSponsors() {
        // Hide the current sponsor section
        sponsorSections[currentSponsorIndex].style.display = 'none';

        // Move to the next sponsor section
        currentSponsorIndex = (currentSponsorIndex + 1) % sponsorSections.length;

        // Show the next sponsor section
        sponsorSections[currentSponsorIndex].style.display = 'block';
    }

    // Add event listeners to the arrow elements
    sponsorArrow.addEventListener('click', function() {
        toggleSponsors();
    });

    partnersArrow.addEventListener('click', function() {
        toggleSponsors();
    });
});

setTimeout(function() {
    // Sembunyikan preloader
    document.getElementById('preloader').style.opacity = 0;
    document.getElementById('preloader').style.display = "none";
    // Tampilkan konten utama
    document.getElementById('main-content').classList.add('visible');
  
  }, 1000); // Ubah 3000 menjadi durasi loading yang diinginkan (dalam milidetik)

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