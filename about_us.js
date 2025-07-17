const videoElement = document.getElementById('about_video');
videoElement.addEventListener('mouseenter', function() {
  videoElement.controls = true; 
});

videoElement.addEventListener('mouseleave', function() {
  videoElement.controls = false; 
});


