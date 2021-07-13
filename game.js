var game = {
    init: function(){

        game.model= model;
       
        game.dysplayGrid()

    },
    
    cellWidth: 50,
    tableau: document.querySelector('.terrain_de_jeu'),
    
    types: {
        'x': 'classic',
        '*': 'wall',
        'o': 'burger',
        '-': 'goal'
    },

    dysplayGrid: function() {
        for (let ligne = 0; ligne < game.model.length; ligne++) {
            for (let column = 0; column < game.model[ligne].length; column++) {
                maCellule = game.model[ligne][column];
                console.log(maCellule);
                let unCarre = document.createElement('div');
                unCarre.className = 'square';
                // On ajoute des classes "coordonnées" sous le format x-0 et y-0 par exemple.
                unCarre.classList.add(game.types[maCellule], 'x-'+column, 'y-'+ligne);
                game.tableau.appendChild(unCarre);


            }
            
        }

    },


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