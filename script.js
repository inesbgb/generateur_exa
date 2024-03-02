//   Votre mission est de coder un générateur de dégradés.
//   Vous allez manipuler des inputs de couleurs afin de créer des "linear-gradient" à la volée !

// A. Coder une interface basique
// Codez d'abord une interface très simple, contenant les éléments importants : boutons, inputs, liens, etc...
// Rajoutez un peu de style si besoin est. 

// Puis codez les fonctionnalités JavaScript.

// B. Fonctionnalités JavaScript à coder pour ce projet

// 1. Gérez l'implémentation de base des couleurs, il faut qu'il y est un dégradé lorsqu'on arrive sur le site (input, orientation, body...).
// 2. Gérez le changement de couleur, on doit pouvoir manipuler les inputs et provoquer le changement de couleur du site.
// 3. Occupez-vous de l'inclinaison avec l'input type "range".
// 4. Mettez en place la copie du dégradé en cliquant su le bouton "Copier le gradient".
// 5. Faites-en sorte de créer des dégradés au hasard en cliquant sur le bouton "random".
// 6. Bonne chance ! 

// C. Ajoutez du style à l'interface afin de terminer le projet.




//Sélectionne tous les éléments label avec la classe " " 
//les ... sert à prendre et transformer (destructuration) tout les éléments selectionner en tableaux//
const colorLabels = [...document.querySelectorAll(".input-group label")]

const colorPickerInputs = [...document.querySelectorAll("input[type='color']")]
const rangeLabelValue = document.querySelector(".orientation-value")

// Initialise les données du dégradé avec des valeurs par défaut//
const gradientData = {
  angle: 90,
  colors: ["#FF5F6D", "#FFC371"]
}


// Fonction pour mettre à jour l'interface utilisateur avec les données actuelles du dégradé//
function affichage(){
    // Met à jour le texte des labels et les valeurs des inputs//
  colorLabels[0].textContent = gradientData.colors[0];
  colorLabels[1].textContent = gradientData.colors[1];

  colorPickerInputs[0].value = gradientData.colors[0];
  colorPickerInputs[1].value = gradientData.colors[1];

  // Définit la couleur de fond des labels//
  colorLabels[0].style.background = gradientData.colors[0]
  colorLabels[1].style.background = gradientData.colors[1]

// Définit la couleur de fond du body avec un dégradé linéaire//
  document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`
 // Met à jour le texte de l'angle//
  rangeLabelValue.textContent = `${gradientData.angle}°`
// Ajuste la couleur du texte des labels en fonction de la couleur de fond//
  adaptInputsColor()
}
affichage()

// Fonction pour ajuster la couleur du texte des labels en fonction de la couleur de fond//
function adaptInputsColor(){
  colorLabels.forEach(label => {

    // Extrait les valeurs RGB de la couleur hexadécimale//
    const hexColor = label.textContent.replace("#", "");
    const red = parseInt(hexColor.slice(0,2), 16)
    const green = parseInt(hexColor.slice(2,4), 16)
    const blue = parseInt(hexColor.slice(4,6), 16)

// Calcule le contraste de couleur YIQ//
    const yiq = (red * 299 + green * 587 + blue * 144) / 1000;
    console.log(yiq);

  // Définit la couleur du texte en fonction du contraste//
    if(yiq >= 128) {
      label.style.color = "#111"
    }
    else {
      label.style.color = "#f1f1f1"
    }
  })
}

// Sélectionne l'élément input de type range avec la classe "inp-range"//
const rangeInput = document.querySelector(".inp-range")

// Ajoute un écouteur d'événements pour les changements sur l'input range//
rangeInput.addEventListener("input", handleInclination)


// Fonction pour gérer les changements d'inclinaison//
function handleInclination(){

  // Met à jour l'angle du dégradé à partir de la valeur de l'input range
  gradientData.angle = rangeInput.value;
  rangeLabelValue.textContent = `${gradientData.angle}°`

  // Met à jour l'interface utilisateur
  affichage();
}
// Ajoute des écouteurs d'événements pour les changements sur les inputs de sélection de couleur//
colorPickerInputs.forEach(input => input.addEventListener("input", colorInputModification))

// Fonction pour gérer les changements sur les inputs de sélection de couleur//
function colorInputModification(e){

  // Obtient l'indice de l'input de sélection de couleur modifié
  const currentIndex = colorPickerInputs.indexOf(e.target);

  // Met à jour la couleur du dégradé en fonction de la valeur de l'input
  gradientData.colors[currentIndex] = e.target.value.toUpperCase();
    // Met à jour l'interface utilisateur
  affichage();
}

// Sélectionne l'élément bouton de copie avec la classe "btn-copy"
const copyBtn = document.querySelector(".btn-copy");
// Ajoute un écouteur d'événements pour le clic sur le bouton de copie
copyBtn.addEventListener("click", handleGradientCopy)
// Initialise une variable pour éviter des clics rapides sur le bouton
let lock = false;
// Fonction pour gérer la copie du dégradé dans le presse-papiers
function handleGradientCopy(){
// Construit la chaîne de dégradé
  const gradient =  `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`
 // Copie le dégradé dans le presse-papiers
  navigator.clipboard.writeText(gradient)
  // Si le bouton est verrouillé, quitte la fonction
  if(lock) return;
// Verrouille le bouton et ajoute la classe "active"
  lock = true;
  copyBtn.classList.add("active")

    // Réinitialise l'état du bouton après 1 seconde
  setTimeout(() => {
  copyBtn.classList.remove("active")
  lock = false;
  }, 1000)
}
// Sélectionne l'élément bouton de dégradé aléatoire avec la classe "btn-random"
const randomGradientBtn = document.querySelector(".btn-random");// variable random et selectionner le bouton sur html//
// Ajoute un écouteur d'événements pour le clic sur le bouton de dégradé aléatoire
randomGradientBtn.addEventListener("click", createRandomGradient)
// Fonction pour créer un dégradé aléatoire
function createRandomGradient(){
 // Génère une couleur aléatoire pour chaque label
  for(let i = 0; i < colorLabels.length; i++) {
    randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    console.log(randomColor);
     // Met à jour les données du dégradé avec la couleur aléatoire
    gradientData.colors[i] = randomColor.toUpperCase()
  }
 // Met à jour l'interface utilisateur
  affichage()
}
//celui m'a casser la tête!!!!!