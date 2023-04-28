//var song = new Audio("SONG.mp3");
//song.controls = true;
//song.loop = true;
//song.autoplay = true;
//document.body.appendChild(song);

function BPMup(){
  circleSpawnInterval-= 100;
  void ctx.resetTransform()


}

// Get the canvas element and set its size
const canvas = document.getElementById('game-canvas');
canvas.width = 1200;
canvas.height = 700;


// Get the canvas context and set the fill color to red
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';

// Set the game parameters
let circleRadius = 50;
let circleSpawnInterval = 500;
let circleDisappearTime = 700;
const losePointDelay = 0;

// Initialize the game state
let combo = 0;
let score = 0;
let circles = [];




// Start the game loop
setInterval(gameLoop, 1000 / 60);

// Spawn a circle every circleSpawnInterval milliseconds
setInterval(() => {
  let circle = {
    x: Math.random() * (canvas.width - circleRadius * 2) + circleRadius,
    y: Math.random() * (canvas.height - circleRadius * 2) + circleRadius,
    spawnTime: Date.now(),
  };
  circles.push(circle);
}, circleSpawnInterval);

// Handle key presses
canvas.addEventListener('click', (event) => {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    circles.forEach((circle, index) => {
      const dx = circle.x - mouseX;
      const dy = circle.y - mouseY;
      const distance = Math.sqrt(dx*dx + dy*dy);
      if (distance < circleRadius) {
        score+= 300 + (combo*0.5);
        combo++;
        circles.splice(index, 1);
      }
    });
  });

// The game loop function
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (score<0){
    score = 0;
  }
  if (circleRadius<=10){
    circleRadius+= 10;
  }
  if (circleDisappearTime<=100){
    circleDisappearTime = 100;
  }
  

  // Draw the circles
  circles.forEach((circle) => {
    // Check if the circle has been on screen for longer than circleDisappearTime
    if (Date.now() - circle.spawnTime > circleDisappearTime) {
      // If the circle has been on screen for longer than circleDisappearTime,
      // remove it from the circles array and decrement the score after a delay
      setTimeout(() => {
        const index = circles.indexOf(circle);
        if (index >= 0) {
          circles.splice(index, 1);
          score-= 300;
          combo=0;
        }
      }, losePointDelay);
    } else {
      // If the circle is still visible, draw it on the canvas
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#FF0000';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circleRadius, 3, 2 * Math.PI);
      ctx.lineWidth = 7;
      ctx.strokeStyle = '#ff9680';
      ctx.stroke();
      if (circleRadius==40){
        ctx.font = '50px MS Gothic';
        ctx.fillText("1", circle.x-12, circle.y+18);
      }
      else if (circleRadius==30){
        ctx.font = '40px MS Gothic';
        ctx.fillText("1", circle.x-10, circle.y+15);
      }
      else if (circleRadius<30) {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circleRadius - 12, 0, 2 * Math.PI);
      ctx.fill();
      }
      else {
        ctx.font = '68px MS Gothic';
        ctx.fillText("1", circle.x-17, circle.y+25);
      }
      
    }
  });

  // Draw the score
  ctx.fillStyle = 'white';
  ctx.font = '30px MS Gothic';
  ctx.fillText(`Score ${score}`, 950, 45);
  ctx.font = '70px MS Gothic';
  ctx.fillText(`${combo}X`, 40, 670);
}

function ARup(){
  circleDisappearTime-= 100;
}
function ARdown(){
  circleDisappearTime+= 100;
}
function CSup(){
  circleRadius+= 10;
}
function CSdown(){
  circleRadius-= 10;
  
}
function Default(){
  circleSpawnInterval= 500;
  circleDisappearTime= 700;
}