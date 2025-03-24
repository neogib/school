// Generate particles
const particlesContainer = document.getElementById("particles");
const colors = ["#ffffff", "#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"];

for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size between 5px and 20px
    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    const posX = Math.random() * 100;
    particle.style.left = `${posX}%`;

    // Random delay
    const delay = Math.random() * 15;
    particle.style.animationDelay = `${delay}s`;

    // Random color
    const colorIndex = Math.floor(Math.random() * colors.length);
    particle.style.backgroundColor = colors[colorIndex];

    // Random duration between 15 and 30s
    const duration = Math.random() * 15 + 15;
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
}

// Custom cursor follower
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
});

document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

// Hide cursor when leaving the window
document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
});
