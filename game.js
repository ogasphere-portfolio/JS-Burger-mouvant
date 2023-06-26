var game = {
    init: function(){
        // On stocke le modèle à dessiner dans une propriété pour être facilement accessible.
        game.model = model;

        // On définit la taille du tableau de jeu
        game.sizeTableau();
        // On dessine la grille
        game.generateMap();
        // On détecte les appuis sur les touches pour faire avancer notre burger
        game.detectKeys();

    },
    // Propriété pour stocker  la largeur d'une cellule
    cellWidth: 50,
    // Propriété pour stocker le terrain de jeu, on va dessiner la grille dessus
    tableau: document.querySelector('.terrain_de_jeu'),
    // Propriété pour stocker la tableau d'équivalence entre symboles et classes css pour les cellules 
    types: {
        'x': 'classic',
        '*': 'wall',
        'o': 'burger',
        '-': 'goal'
    },
    // Cette méthode permet de définir la largeur de la grille de jeu, elle est égale à la taille 
    sizeTableau: function(){
        game.tableau.style.width = game.model[0].length * game.cellWidth + 'px';
    },
    // Cette méthode permet de dessiner la grille
    generateMap: function(){
        // Avec une double boucle, on passe dans chaque ligne, puis dans que caractère (colonne) du modèle de grille
        for (var line = 0; line < game.model.length; ++line) {
            for (var column = 0; column <  game.model[line].length; ++column) {

                // On stocke notre cellule actuelle
                var current = game.model[line][column];

                // On crée une div, et on lui donne une classe
                var square = document.createElement('div');
                square.className = 'square';

                // On ajoute des classes "coordonnées" sous le format x-0 et y-0 par exemple.
                square.classList.add(game.types[current], 'x-'+column, 'y-'+line);

                // On ajoute la cellule à la grille
                game.tableau.appendChild(square);

                // Si la cellule est le burger, on stocke ses coordonnées dans des propriétés
                if(current == 'o') 
                {
                    game.burgerY = line;
                    game.burgerX = column;
                }
                // De même pour l'objectif
                if (current == '-') {
                    game.goalY = line;
                    game.goalX = column;
                }
                
            }
        }
    },
    // Détection des touches
    detectKeys: function() {
        document.addEventListener('keydown', function(e) {
            // On détecte sur quelle touche on a appuyé et on détermine dans quelle direction on va.
            switch (e.keyCode) {
                case 37:
                 var directionX = -1;
                 var directionY = 0;
                 break;
                case 38:
                 var directionX  = 0;
                 var directionY  = -1;
                 break;
                case 39:
                 var directionX  = 1;
                 var directionY  = 0;
                 break;
                case 40:
                 var directionX  = 0;
                 var directionY  = 1;
                break;
            }
            if(directionX !== undefined && directionY !== undefined) {
                // On fait bouger le burger dans les directions passées en argument
                game.moveTo(directionX, directionY);
            }
        });
       
       
    },
    // Méthode pour faire bouger le burger
    moveTo: function(directionX, directionY) {
        // Les nouvelles coordonnées du burger sont calculées en additionnant les directions aux coordonnées actuelles.
        var newX = game.burgerX + directionX;
        var newY = game.burgerY + directionY;

        // Si les coordonnées calculées existent (donc on est encore dans la grille) et qu'on ne tombe pas sur un mur
        if(game.model[newY] !== undefined && game.model[newY][newX] !== undefined && game.model[newY][newX] != '*') {
            // On retire la classe burger à l'ancienne cellule
            document.querySelector('.burger').classList.toggle('burger');
            // On l'ajoute à la nouvelle
            document.querySelector('.x-'+newX+'.y-'+newY).classList.toggle('burger');
            // On stocke les nouvelles coordonnées
            game.burgerX = newX;
            game.burgerY = newY;
        }
       if(game.burgerX == game.goalX && game.burgerY == game.goalY ){
            alert('Bravo !');
       }  
    }
};


document.addEventListener('DOMContentLoaded', game.init);

var model = [
    'xxxxxxxxx**xx',
    'x********xx-x',
    'xxxxxxxx*x**x',
    'xx*****xxx*x*',
    'xxxxxx*x***x*',
    '****xx*x*xxx*',
    'xxx*xx*x*xxxx',
    'x*o*xx**xx*xx',
    'x***xxxxxx*xx',
    'xxxxxx*****xx',
];