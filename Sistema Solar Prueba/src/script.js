// script.js
// THREE.js setup remains the same
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load Sun texture and create Sun
const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load('textures/sol.jpg');
const sun = new THREE.Mesh(new THREE.SphereGeometry(24, 32, 32), new THREE.MeshBasicMaterial({ map: sunTexture }));
scene.add(sun);

// Position camera
camera.position.set(0, 100, 200);
camera.lookAt(0, 0, 0);

const backgroundTexture = textureLoader.load('textures/fondo2.jpg', () => {
    renderer.setClearColor(0xffffff, 0); // Set clear color to white
    scene.background = backgroundTexture; // Set the scene background
});

// Orrery: Planetary Data and Creation (No Info Correlation Here)
const planetsData = [
    { name: 'Mercury', texture: 'textures/mercurio.jpg', radius: 2.4, distance: 30, orbitPeriod: 1 },
    { name: 'Venus', texture: 'textures/venus.jpeg', radius: 6.1, distance: 40, orbitPeriod: 1.5 },
    { name: 'Earth', texture: 'textures/tierra.jpg', radius: 6.4, distance: 50, orbitPeriod: 2 },
    { name: 'Mars', texture: 'textures/marte.jpg', radius: 3.4, distance: 60, orbitPeriod: 2.5 },
    { name: 'Jupiter', texture: 'textures/jupiter.jpg', radius: 20, distance: 80, orbitPeriod: 3.5 },
    { name: 'Saturn', texture: 'textures/saturno.jpg', radius: 25, distance: 100, orbitPeriod: 4 },
    { name: 'Uranus', texture: 'textures/urano.jpg', radius: 14, distance: 120, orbitPeriod: 4.5 },
    { name: 'Neptune', texture: 'textures/neptuno.jpg', radius: 13, distance: 140, orbitPeriod: 5 },
    { name: 'Pluto' },{ name: 'Ceres' },{ name: 'Halley´s Comet' }, { name: 'Comet 67P' },{ name: 'ISS' },{ name: 'Voyager 1' },
    { name: 'Hubble Space Telescope' },
];

// Create planets and orbits (Orrery)
const planets = [];
const orbits = [];

planetsData.forEach(planetData => {
    const texture = textureLoader.load(planetData.texture);
    const geometry = new THREE.SphereGeometry(planetData.radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    planets.push(planet);
    scene.add(planet);

    const orbitGeometry = new THREE.BufferGeometry();
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
    const orbitCurve = new THREE.EllipseCurve(0, 0, planetData.distance, planetData.distance, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(200);
    orbitGeometry.setFromPoints(orbitPoints);
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    orbits.push(orbit);
    scene.add(orbit);
});

// Animation function (Orrery)
function animate() {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.005; // Rotate the sun

    planets.forEach((planet, index) => {
        const planetData = planetsData[index];
        const angle = Date.now() * 0.001 / planetData.orbitPeriod;
        planet.position.x = Math.cos(angle) * planetData.distance;
        planet.position.z = Math.sin(angle) * planetData.distance;
        planet.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Window resize handling
//Made by Jorge PG
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Independent Planet Info
const planetInfo = {
    0: `
        <ul>

            <li><strong>Type:</strong> Terrestrial Planet</li>
            <li><strong>Semi-major axis:</strong>0.387 AU</li>
            <li><strong>Eccentricity:</strong>0.2056</li>
            <li><strong>Inclination:</strong>7.005 degrees</li>
            <li><strong>Orbital period:</strong>0.241 years</li>
            <li><strong>Size:</strong> Diameter of 4,880 km</li>
            <li><strong>Distance from Sun:</strong> 57.9 million km</li>
            <li><strong>Interesting Fact:</strong>Mercury has virtually no atmosphere and experiences extreme temperature changes.</li>
        </ul>

    `,
    1: `
        <ul>

            <li><strong>Type:</strong> Terrestrial Planet</li>
            <li><strong>Semi-major axis:</strong>0.723 AU</li>
            <li><strong>Eccentricity:</strong>0.0067</li>
            <li><strong>Inclination:</strong>3.394 degrees</li>
            <li><strong>Orbital period:</strong>0.615 years</li>
            <li><strong>Size:</strong> Diameter of 12,104 km</li>
            <li><strong>Distance from Sun:</strong> 108.2 million km </li>
            <li><strong>Interesting Fact:</strong>Venus has a thick atmosphere of CO₂, trapping heat and making it the hottest planet in the solar system.</li>
        </ul>
    `,
    2: `
        <ul>

            <li><strong>Type:</strong> Terrestrial Planet</li>
            <li><strong>Semi-major axis:</strong>1 AU</li>
            <li><strong>Eccentricity:</strong>0.0167</li>
            <li><strong>Inclination:</strong>0 degrees</li>
            <li><strong>Orbital period:</strong>1 years</li>
            <li><strong>Size:</strong> Diameter of 12,742 km</li>
            <li><strong>Distance from Sun:</strong> 149.6 million km </li>
            <li><strong>Moons:</strong> The Moon (Diameter: 3,474 km)</li>
            <li><strong>Interesting Fact:</strong>Earth’s unique atmosphere supports life, and its moon stabilizes its axial tilt, regulating the climate.</li>
        </ul>
    `,

    3: `
        <ul>
            <li><strong>Type:</strong> Terrestrial planet</li>
                    <li><strong>Semi-major axis:</strong> 1.524 AU</li>
                    <li><strong>Eccentricity:</strong> 0.0935</li>
                    <li><strong>Inclination:</strong> 1.85 degrees</li>
                    <li><strong>Orbital period:</strong> 1.88 years</li>
                    <li><strong>Size (Diameter):</strong> 6,779 km</li>
                    <li><strong>Distance from the Sun:</strong> 227.9 million km</li>
                    <li><strong>Moons:</strong>
                        <ul>
                            <li>Phobos (Diameter: 22.4 km)</li>
                            <li>Deimos (Diameter: 12.4 km)</li>
                        </ul>
                    </li>
                    <li><strong>Interesting Fact:</strong> Mars has the largest volcano in the solar system, Olympus Mons.</li>

        </ul>
    `,

    4: `
        <ul>
                <li><strong>Type:</strong> Gas giant</li>
                <li><strong>Semi-major axis:</strong> 5.204 AU</li>
                <li><strong>Eccentricity:</strong> 0.0489</li>
                <li><strong>Inclination:</strong> 1.305 degrees</li>
                <li><strong>Orbital period:</strong> 11.862 years</li>
                <li><strong>Size (Diameter):</strong> 139,820 km</li>
                <li><strong>Distance from the Sun:</strong> 778.5 million km</li>
                <li><strong>Moons:</strong>
                    <ul>
                        <li>Ganymede (Diameter: 5,268 km, largest moon in the solar system)</li>
                        <li>Callisto (Diameter: 4,821 km)</li>
                        <li>Io (Diameter: 3,643 km)</li>
                        <li>Europa (Diameter: 3,121 km, may have a subsurface ocean)</li>
                    </ul>
                </li>
                <li><strong>Interesting Fact:</strong> Jupiter has a strong magnetic field and its Great Red Spot is a storm larger than Earth.</li>
            </ul>
    `,
    5: `
        <ul>
                <li><strong>Type:</strong> Gas giant</li>
                <li><strong>Semi-major axis:</strong> 9.582 AU</li>
                <li><strong>Eccentricity:</strong> 0.0565</li>
                <li><strong>Inclination:</strong> 2.485 degrees</li>
                <li><strong>Orbital period:</strong> 29.457 years</li>
                <li><strong>Size (Diameter):</strong> 116,460 km</li>
                <li><strong>Distance from the Sun:</strong> 1.43 billion km</li>
                <li><strong>Moons:</strong>
                    <ul>
                        <li>Titan (Diameter: 5,151 km, has a dense atmosphere)</li>
                        <li>Enceladus (Diameter: 504 km, known for its ice geysers)</li>
                    </ul>
                </li>
                <li><strong>Interesting Fact:</strong> Saturn’s rings are made of ice and rock, and they stretch 282,000 km across but are only about 10 meters thick.</li>
            </ul>
    `,
    6: `
        <ul>
                <li><strong>Type:</strong> Ice giant</li>
                <li><strong>Semi-major axis:</strong> 19.201 AU</li>
                <li><strong>Eccentricity:</strong> 0.0463</li>
                <li><strong>Inclination:</strong> 0.773 degrees</li>
                <li><strong>Orbital period:</strong> 84.02 years</li>
                <li><strong>Size (Diameter):</strong> 50,724 km</li>
                <li><strong>Distance from the Sun:</strong> 2.87 billion km</li>
                <li><strong>Moons:</strong>
                    <ul>
                        <li>Miranda (Diameter: 471.6 km)</li>
                        <li>Titania (Diameter: 1,578 km)</li>
                    </ul>
                </li>
                <li><strong>Interesting Fact:</strong> Uranus rotates on its side, causing extreme seasonal variations.</li>
            </ul>
    `,
    7: `
<ul>
        <li><strong>Type:</strong> Ice giant</li>
        <li><strong>Semi-major axis:</strong> 30.047 AU</li>
        <li><strong>Eccentricity:</strong> 0.0095</li>
        <li><strong>Inclination:</strong> 1.77 degrees</li>
        <li><strong>Orbital period:</strong> 164.8 years</li>
        <li><strong>Size (Diameter):</strong> 49,244 km</li>
        <li><strong>Distance from the Sun:</strong> 4.5 billion km</li>
        <li><strong>Moons:</strong>
            <ul>
                <li>Triton (Diameter: 2,707 km, retrograde orbit)</li>
            </ul>
        </li>
        <li><strong>Interesting Fact:</strong> Neptune has supersonic winds, the fastest in the solar system.</li>
    </ul>
    `,
     8: `
<ul>
        <li><strong>Type:</strong> Dwarf planet</li>
        <li><strong>Semi-major axis:</strong> 39.482 AU</li>
        <li><strong>Eccentricity:</strong> 0.2488</li>
        <li><strong>Inclination:</strong> 17.16 degrees</li>
        <li><strong>Orbital period:</strong> 248 years</li>
        <li><strong>Size (Diameter):</strong> 2,377 km</li>
        <li><strong>Distance from the Sun:</strong> 5.9 billion km</li>
        <li><strong>Moons:</strong>
            <ul>
                <li>Charon (Diameter: 1,212 km)</li>
            </ul>
        </li>
        <li><strong>Interesting Fact:</strong> Pluto and its moon Charon form a binary system, as they orbit each other closely.</li>
    </ul>
     `,
     9: `
<ul>
        <li><strong>Type:</strong> Dwarf planet (in the asteroid belt)</li>
        <li><strong>Semi-major axis:</strong> 2.77 AU</li>
        <li><strong>Eccentricity:</strong> 0.079</li>
        <li><strong>Inclination:</strong> 10.59 degrees</li>
        <li><strong>Orbital period:</strong> 4.6 years</li>
        <li><strong>Size (Diameter):</strong> 940 km</li>
        <li><strong>Distance from the Sun:</strong> 413.7 million km</li>
        <li><strong>Interesting Fact:</strong> Ceres is the largest object in the asteroid belt between Mars and Jupiter.</li>
    </ul>
     `,
     10: `
<ul>
        <li><strong>Type:</strong> Comet (periodic)</li>
        <li><strong>Semi-major axis:</strong> 17.8 AU</li>
        <li><strong>Eccentricity:</strong> 0.967</li>
        <li><strong>Inclination:</strong> 162.3 degrees</li>
        <li><strong>Orbital period:</strong> 75.3 years</li>
        <li><strong>Size (Diameter):</strong> 11 km</li>
        <li><strong>Interesting Fact:</strong> Halley’s Comet is one of the most famous and visible from Earth. It last appeared in 1986 and will return in 2061.</li>
    </ul>
     `,
     11: `
    <ul>
            <li><strong>Type:</strong> Comet (periodic)</li>
            <li><strong>Semi-major axis:</strong> 3.464 AU</li>
            <li><strong>Eccentricity:</strong> 0.641</li>
            <li><strong>Inclination:</strong> 7.04 degrees</li>
            <li><strong>Orbital period:</strong> 6.45 years</li>
            <li><strong>Size (Diameter):</strong> 4.1 x 3.2 km</li>
            <li><strong>Interesting Fact:</strong> This is the comet that was visited by the Rosetta spacecraft and the Philae lander in 2014.</li>
        </ul>
          `,
       12: `
          <ul>
                  <li><strong>Type:</strong> Human-made satellite</li>
                  <li><strong>Semi-major axis:</strong> 6,731 km </li>
                  <li><strong>Orbital period:</strong> 92 minutes (about 15 orbits per day)</li>
                  <li><strong>Size (Dimensions):</strong> 72.8 m x 108.5 m</li>
                  <li><strong>Interesting Fact:</strong> The ISS is a collaboration between NASA, Roscosmos, ESA, JAXA, and CSA, continuously inhabited since November 2000.</li>
              </ul>
                `,
       13: `
       <ul>
               <li><strong>Type:</strong> Space probe</li>
               <li><strong>Launched:</strong> 1977</li>
               <li><strong>Current distance:</strong> Over 150 AU from Earth</li>
               <li><strong>Interesting Fact:</strong> Voyager 1 is the farthest human-made object from Earth and has entered interstellar space.</li>
           </ul>
            `,
       14: `
              <ul>
                      <li><strong>Type:</strong> Space telescope</li>
                      <li><strong>Semi-major axis:</strong> 6,973 km </li>
                      <li><strong>Orbital period:</strong> 96-97 minutes</li>
                      <li><strong>Size:</strong> 13.3 meters long</li>
                      <li><strong>Interesting Fact:</strong> Hubble has provided some of the most detailed images of the universe since its launch in 1990.</li>
                  </ul>
                   `,
};

// Menu toggle functionality
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const infoPanel = document.getElementById('info-panel');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');

    if (!menu.classList.contains('open')) {
            infoPanel.style.display = 'none'; // Oculta el panel de información
        }


});

// Dynamically create the planet menu
planetsData.forEach((planet, index) => {
    const planetItem = document.createElement('div');
    planetItem.className = 'planet-item';
    planetItem.textContent = planet.name;
    planetItem.addEventListener('click', () => showPlanetInfo(index));
    menu.appendChild(planetItem);
});

// Display planet info from planetInfo object
function showPlanetInfo(index) {
    const info = planetInfo[index]; // Fetch info from the separate info object
    document.getElementById('planet-name-title').textContent = planetsData[index].name; // Display planet name
    document.getElementById('planet-info-display').innerHTML = info || 'No information available';
    infoPanel.style.display='block';
}