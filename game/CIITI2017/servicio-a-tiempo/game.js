/*jslint bitwise:true, es5: true */
(function (window, undefined) {
    'use strict';
	// Declarando Teclas
    var KEY_ENTER = 13,
        KEY_LEFT = 37,
        KEY_UP = 38,
        KEY_RIGHT = 39,
        KEY_DOWN = 40,
		
    // Declaro Niveles
        canvas = null,
        ctx = null,
        lastPress = null,
        pause =  false,
        gameover = false,
        currentScene = 0,
        scenes = [],
        mainScene = null,
		introScene = null,
        gameScene = null,
        highscoresScene = null,
		highscores = [],
        posHighscore = 10,
        dir = 0,
		velauto =10,
		Velmin = 0,
		velmax = 0,
		velmax =0,
	    score = 0,
        
	// Declaro los Objetos
		body = [],
        food = null,
        hitbox = [],
		tren = new Array(),
		auto = new Array (),
		luz = new Array(),
		semaforo = new Array(),
	//Declaro Imagenes para despues cargarlas y dibujarlas
		
		img = new Image(),
		go = new Image(),
		intro = new Image (),
		puntuacion = new Image(),
		titulo = new Image (),
		iLuz = new Image(),
		iTren = new Image(),
		iBagon = new Image(),
		iSemaforo = new Image(),
		iPlayerarriba = new Image(),
        iPlayerabajo = new Image (),
        iPlayeriz = new Image (),
        iPlayerder = new Image (),  		
		iBlue = new Image(),
		iBlueizq = new Image(),
		iBlueaba = new Image(),
		iBluearriba = new Image(),
		iGrisabjao = new Image(),
		iGrisdere = new Image (),
		iGrisiz = new Image(),
		iCamionverde = new Image(),
		iCamionverdea = new Image(),
        iBody = new Image(),
        iFood = new Image(),
        aEat = new Audio(),
        aDie = new Audio();

    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 17);
            };
    }());

    document.addEventListener('keydown', function (evt) {
        if (evt.which >= 37 && evt.which <= 40) {
            evt.preventDefault();
        }

        lastPress = evt.which;
    }, false);
    
    function Rectangle(x, y, width, height) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
        this.width = (width === undefined) ? 0 : width;
        this.height = (height === undefined) ? this.width : height;
    }
	

    Rectangle.prototype = {
        constructor: Rectangle,
        
        intersects: function (rect) {
            if (rect === undefined) {
                window.console.warn('Missing parameters on function intersects');
            } else {
                return (this.x < rect.x + rect.width &&
                    this.x + this.width > rect.x &&
                    this.y < rect.y + rect.height &&
                    this.y + this.height > rect.y);
            }
        },
	
        
        fill: function (ctx) {
            if (ctx === undefined) {
                window.console.warn('Missing parameters on function fill');
            } else {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        },
        
        drawImage: function (ctx, img) {
            if (img === undefined) {
                window.console.warn('Missing parameters on function drawImage');
            } else {
                if (img.width) {
                    ctx.drawImage(img, this.x, this.y);
                } else {
                    ctx.strokeRect(this.x, this.y, this.width, this.height);
                }
            }
        }
    };

    function Scene() {
        this.id = scenes.length;
        scenes.push(this);
    }

    Scene.prototype = {
        constructor: Scene,
        load: function () {},
        paint: function (ctx) {},
        act: function () {}
    };

    function loadScene(scene) {
        currentScene = scene.id;
        scenes[currentScene].load();
    }
    
    function random(max) {
        return ~~(Math.random() * max);
    }

    function addHighscore(score) {
        posHighscore = 0;
        while (highscores[posHighscore] > score && posHighscore < highscores.length) {
            posHighscore += 1;
        }
        highscores.splice(posHighscore, 0, score);
        if (highscores.length > 10) {
            highscores.length = 10;
        }
        localStorage.highscores = highscores.join(',');
    }

    function repaint() {
        window.requestAnimationFrame(repaint);
        if (scenes.length) {
            scenes[currentScene].paint(ctx);
        }
    }

    function run() {
        setTimeout(run, 50);
        if (scenes.length) {
            scenes[currentScene].act();
        }
    }

    function init() {
        // Get canvas and context
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');

        // Load assets
		
		img.src ='assets/fondo.png';
		
		intro.src = 'assets/introduccion.jpg';
		go.src = 'assets/go.png';
		titulo.src = 'assets/titulo.png';
		puntuacion.src ='assets/puntuacion.png';
		iTren.src = 'assets/Tren/TrenCabeza.png';
		iBagon.src = 'assets/Tren/bagon.png';
		iLuz.src ='assets/Poste/luz.png';
		iSemaforo.src ='assets/Poste/semaforo.png';
		iPlayerabajo.src = 'assets/Player/playerabajo.png';
		iPlayerarriba.src = 'assets/Player/playerarriba.png';
		iPlayerder.src = 'assets/Player/playerder.png';
		iPlayeriz.src = 'assets/Player/playeriz.png';
		iBlue.src = 'assets/Enemigo/blue.png';
		iBlueizq.src = 'assets/Enemigo/blueiz.png';
		iBlueaba.src = 'assets/Enemigo/blueaba.png';
		iBluearriba.src = 'assets/Enemigo/bluearriba.png';
		iGrisabjao.src = 'assets/Enemigo/grisabajo.png';
		iGrisdere.src = 'assets/Enemigo/grisdere.png';
		iGrisiz.src = 'assets/Enemigo/grisiz.png';
	    iCamionverde.src = 'assets/Camion/CamionAbajo.png';
		iCamionverdea.src = 'assets/Camion/CamionArriba.png'; 
		
        iBody.src = 'assets/body.png';
        iFood.src = 'assets/fruit.png';
        aEat.src = 'assets/chomp.m4a';
        aDie.src = 'assets/dies.m4a';

        // Create food
        food = new Rectangle(80, 80, 10, 10);
        
        
		// Declarondo las HitBox funcionando como colision contra el player
		
		//HitBox Lampara De Luz
		 //Calle Horizontal Parte de Abajo
		luz.push(new Rectangle(452,250, 8, 20));
		hitbox.push(new Rectangle(452,295, 8, 30));
		luz.push(new Rectangle(758,250, 8, 20));
		hitbox.push(new Rectangle(758,295, 8, 20));
		luz.push(new Rectangle(870,250, 8, 20));
		hitbox.push(new Rectangle(870,295, 8, 20));
		// Calle Horizontal Parte Arriba
		hitbox.push(new Rectangle(60,165, 10, 20));
		hitbox.push(new Rectangle(173,165, 10, 20));
		hitbox.push(new Rectangle(452,125, 8, 65));
		hitbox.push(new Rectangle(758,125, 8, 65));
	    //Calle Vertical A 
		hitbox.push(new Rectangle(235,60,30, 110));
		hitbox.push(new Rectangle(365,60, 40, 30));
		hitbox.push(new Rectangle(243,360, 10, 30));
		hitbox.push(new Rectangle(243,755, 10, 30));
		hitbox.push(new Rectangle(365,755, 50, 30));
		hitbox.push(new Rectangle(38,465, 10, 20));
		hitbox.push(new Rectangle(38,620, 10, 20));
		hitbox.push(new Rectangle(208,620, 10, 20));
	    hitbox.push(new Rectangle(208,440, 10, 20));
		
		//Calle Vertical B
		hitbox.push(new Rectangle(530,60, 40,110));
		hitbox.push(new Rectangle(530,750, 30, 30));
		hitbox.push(new Rectangle(673,60,200, 80));
		hitbox.push(new Rectangle(673,420, 10, 30));
		hitbox.push(new Rectangle(673,755, 10, 30));
		//Calle Vertical C
		hitbox.push(new Rectangle(920,50, 40, 30));
		hitbox.push(new Rectangle(942,370, 10, 20));
		hitbox.push(new Rectangle(942,560, 10, 30));
		hitbox.push(new Rectangle(942,750, 10, 30));
		hitbox.push(new Rectangle(1065,50, 10, 30));
		hitbox.push(new Rectangle(1065,160, 10, 30));
		hitbox.push(new Rectangle(1065,300, 8, 90));
		hitbox.push(new Rectangle(1065,555, 10, 30));
		hitbox.push(new Rectangle(1065,750, 10, 30));
		
		//Hitbox Casas
		hitbox.push(new Rectangle(400,0, 130, 190));
		hitbox.push(new Rectangle(708,0, 210, 190));
		hitbox.push(new Rectangle(400,575, 130, 240));
		
		// Hitbox Semaforos(semaforo.push lo uso para cargar las imagenes de los semaforos para dar el efecto que los autos esten pasando por abajo)
		
		hitbox.push(new Rectangle(553,145, 8, 30));
		hitbox.push(new Rectangle(915,145, 40, 30));
		hitbox.push(new Rectangle(365,300, 8, 30));
		semaforo.push(new Rectangle(360,280, 8, 30));
		hitbox.push(new Rectangle(672,300, 8, 30));
		semaforo.push(new Rectangle(667,280, 8, 30));
		semaforo.push(new Rectangle(1060,275, 8, 30));
		
		
		
		
		// Hitbox Hidrantes
		hitbox.push(new Rectangle(80,780, 30, 80));
	    hitbox.push(new Rectangle(208,440, 50, 40));//Este lo hice mas grande para evitar Bugs entre el poste y el hidrante
		hitbox.push(new Rectangle(530,380, 30, 40));//Lo mismo pero para la fuente
		hitbox.push(new Rectangle(530,560, 40, 30));
		hitbox.push(new Rectangle(673,140, 40, 30));
		hitbox.push(new Rectangle(673,670, 30, 30));
		hitbox.push(new Rectangle(925,445, 30, 27));
		
		//Hitbox Fuente 
		hitbox.push(new Rectangle(390,320, 145, 100));
		
		//Carga de Enemigos
		//1
		auto.push(new Rectangle(0,265,25,25));
		//2
		auto.push(new Rectangle(1150,210,25,25));
		//3
		auto.push(new Rectangle(960,20,25,25));
		//4
		auto.push(new Rectangle(1010,780,25,25));
		//5
		auto.push(new Rectangle(580,780,25,25));
		//6
		auto.push(new Rectangle(620,780,25,25));
		//7
		auto.push(new Rectangle(320,780,25,40));
		//8
		auto.push(new Rectangle(265,0,25,25));
	   // Tren 
	   tren.push(new Rectangle(1120,720, 8, 30));
	    tren.push(new Rectangle(1120,790, 8, 30));
		tren.push(new Rectangle(1120,845, 8, 30));
		
       

        // Load saved highscores
        if (localStorage.highscores) {
            highscores = localStorage.highscores.split(',');
        }
        
        // Start game
        run();
        repaint();
    }

    // Main Scene
    mainScene = new Scene();

    mainScene.paint = function (ctx) {
        // Clean canvas
        ctx.fillStyle = '#030';
        ctx.drawImage(titulo, 0, 0,1200,810);
    // Draw player

        // Draw title
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('SERVICIO A TIEMPO', 600, 405);
	    ctx.fillText('Press Enter', 150, 90);
    };

    mainScene.act = function () {
        // Load next scene
        if (lastPress === KEY_ENTER) {
            loadScene(introScene);
            lastPress = null;
        }
    };
	// Intro Scene
	introScene = new Scene();

    introScene.paint = function (ctx) {
        // Clean canvas
        ctx.fillStyle = '#030';
        ctx.drawImage(intro, 0, 0,1200,810);
    // Draw player

        // Draw title
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('SERVICIO A TIEMPO', 600, 405);
	    ctx.fillText('Press Enter', 150, 90);
    };

   introScene.act = function () {
        // Load next scene
        if (lastPress === KEY_ENTER) {
            loadScene(gameScene);
            lastPress = null;
        }
    };

    // Game Scene
    gameScene = new Scene();

    gameScene.load = function () {
        score = 0;
        dir = 1;
		Velmin = 1;
        body.length = 0;
		body.push(new Rectangle(40, 40, 25, 25));
		
		
		
		food.x = random(canvas.width / 10 - 1) * 10;
        food.y = random(canvas.height / 10 - 1) * 10;
        gameover = false;
    };

    gameScene.paint = function (ctx) {
        var i = 0,
            l = 0;
        
    // Clean canvas
        ctx.fillStyle = '#030';
        ctx.drawImage(img, 0, 0,1200,810);
    // Draw player
      
	    ctx.strokeStyle = '#0f0';
        for (i = 0, l = body.length; i < l; i += 1) {
			if (dir == 0){
				body[i].drawImage(ctx, iPlayerarriba);
				
				
			}
			if (dir == 1){
				body[i].drawImage(ctx, iPlayerder);
			}
			
			if (dir == 2){
				 body[i].drawImage(ctx, iPlayerabajo);
			 }
			 if (dir == 3){
				  body[i].drawImage(ctx, iPlayeriz);
			 }
			 
        }
	// Deje esto en comentario para ver donde estan las colocadas las hitbox
  /*       ctx.fillStyle = '#ff4be8';
        for (i = 0, l = hitbox.length; i < l; i += 1) {
           hitbox[i].fill(ctx);
        }  */
    //Draw Auto (enemigo)
		
		ctx.fillStyle = '#ff2507';
		for (i = 0, l = auto.length; i < l; i += 1) {
			if (i == 0){
				auto[i].drawImage(ctx, iGrisdere);
			}
		    if (i == 1){
				auto[i].drawImage(ctx, iBlueizq);
			}
			if (i == 2){
				auto[i].drawImage(ctx, iGrisabjao);
			}
			if (i == 3){
				auto[i].drawImage(ctx, iBluearriba);
			}
			if (i == 4){
				auto[i].drawImage(ctx, iGrisabjao);
			}
			if (i == 5){
				auto[i].drawImage(ctx, iCamionverdea);
			}
			if (i == 6){
				auto[i].drawImage(ctx, iBluearriba);
			}
			if (i == 7){
				auto[i].drawImage(ctx, iCamionverde);
			}
			if (i == 8){
				auto[i].drawImage(ctx, iGrisabjao);
			}
			
		}
   // Draw Tren
		
		ctx.fillStyle = '#ff2507';
		for (i = 0, l = tren.length; i < l; i += 1) {
			if (i == 0){
				tren[i].drawImage(ctx, iTren);
			}
		    if (i == 1){
				tren[i].drawImage(ctx, iBagon);
			}
			  if (i == 2){
				tren[i].drawImage(ctx, iBagon);
			}
		}
    // Draw luz
		ctx.fillStyle = '#ff4be8';
        for (i = 0, l = luz.length; i < l; i += 1) {
           luz[i].drawImage(ctx, iLuz);
        }
    // Draw Semaforo
		ctx.fillStyle = '#ff4be8';
        for (i = 0, l = semaforo.length; i < l; i += 1) {
           semaforo[i].drawImage(ctx, iSemaforo);
        }
        
    // Draw food
        ctx.strokeStyle = '#f00';
        food.drawImage(ctx, iFood);

    // Draw score
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left';
        ctx.fillText('Score: ' + score, 0, 10);
    // Draw pause
       
	   if (pause) {
            ctx.textAlign = 'center';
            if (gameover) {
				ctx.fillStyle = '#ff4be8';
                 ctx.drawImage(go, 0, 0,1200,810);
				
            } else {
                ctx.fillText('PAUSE', 600, 405);
            }
        }
    };

   
// Nivel Principal

   gameScene.act = function () {
        var i = 0,
            l = 0;
	        Velmin=0.80;
		    velmax = 2;
		
		if (!pause) {
            // GameOver Reset
            if (gameover) {
                loadScene(highscoresScene);
            }

            // Move Body
            for (i = body.length - 1; i > 0; i -= 1) {
                body[i].x = body[i - 1].x;
                body[i].y = body[i - 1].y;
            }

            // Change Direction
            if (lastPress === KEY_UP && dir !== 2) {
                dir = 0;
            }
            if (lastPress === KEY_RIGHT && dir !== 3) {
                dir = 1;
            }
            if (lastPress === KEY_DOWN && dir !== 0) {
                dir = 2;
            }
            if (lastPress === KEY_LEFT && dir !== 1) {
                dir = 3;
            }

            // Move Head
            if (dir === 0) {
                body[0].y -= velauto;
            }
            if (dir === 1) {
                body[0].x += velauto;
            }
            if (dir === 2) {
                body[0].y += velauto;
            }
            if (dir === 3) {
                body[0].x -= velauto;
            }
			
			
	//Direccion del auto"Enemigo"
	
	
	     for (i = auto.length - 1; i > 0; i -= 1) {
			auto[0].x += velmax;
			auto[1].x -= velmax;
			auto[2].y += Velmin;
			auto[3].y -= Velmin;
			auto[4].y += velmax;
			auto[5].y -= velmax;
			auto[6].y -= Velmin;
			auto[7].y += Velmin;
			tren[0].y -= Velmin; 
			tren[1].y -= Velmin;
			tren[2].y -= Velmin;
		}
    // Fuera de Pantalla del Auto
          

		  for (i = 0, l = auto.length; i < l; i += 0) {
			   
			  if (auto[i].x > canvas.width - auto[i].width) {
                auto[i].x = 0;
            }
            if (auto[i].y > canvas.height - auto[i].height) {
                auto[i].y = 0;
            }
            if (auto[i].x < 0) {
                auto[i].x = canvas.width - auto[i].width;
            }
            if (auto[i].y < 0) {
                auto[i].y = canvas.height - auto[i].height;
            }
			i++;
	  }

   // fuera de pantalla jugador
   
   
            if (body[0].x > canvas.width - body[0].width) {
                body[0].x = 0;
            }
            if (body[0].y > canvas.height - body[0].height) {
                body[0].y = 0;
            }
            if (body[0].x < 0) {
                body[0].x = canvas.width - body[0].width;
            }
            if (body[0].y < 0) {
                body[0].y = canvas.height - body[0].height;
            }

 // Food Intersects
            if (body[0].intersects(food)) {
                score += 100;
				velauto += 0.50;
				food.x = random(canvas.width / 10 - 1) * 10;
                food.y = random(canvas.height / 10 - 1) * 10;
                aEat.play();
            }

// hitbox Intersects
           for (i = 0, l = hitbox.length; i < l; i += 1) {
               if (food.intersects(hitbox[i])) {
                 food.x = random(canvas.width / 10 - 1) * 10;
                 food.y = random(canvas.height / 10 - 1) * 10;
              }
            
                if (body[0].intersects(hitbox[i])) {
                    gameover = true;
                   pause = true;
					addHighscore(score);
             }
           }

            // Body Intersects
            for (i = 2, l = body.length; i < l; i += 1) {
                if (body[0].intersects(body[i])) {
                    gameover = true;
                    pause = true;
                    aDie.play();
                    addHighscore(score);
                }
            }
        }

		
// Auto inetersects
	for (i = 0, l = auto.length; i < l; i += 1) {
            if (food.intersects(auto[i])) {
           
        }
            
            if (body[0].intersects(auto[i])) {
                gameover = true;
                pause = true;
				addHighscore(score);
            }
           }
        
		
		
		
		
		// Pause/Unpause
        if (lastPress === KEY_ENTER) {
            pause = !pause;
            lastPress = null;
        }
    };

   



   // Highscore Scene
    highscoresScene = new Scene();

    highscoresScene.paint = function (ctx) {
        var i = 0,
            l = 0;
        
        // Clean canvas
        ctx.fillStyle = '#030';
		ctx.drawImage(puntuacion, 0, 0,1200,810);
        

        // Draw title
		 ctx.fillStyle = 'F80196';
         ctx.textAlign = 'center';
        ctx.fillText('Top 10 de los mejores jugadores', 280, 300);
        
        // Draw high scores
        ctx.textAlign = 'center';
        for (i = 0, l = highscores.length; i < l; i += 1) {
            if (i === posHighscore) {
                ctx.fillText('Este es tu putaje ->' + highscores[i], 280, 350+ i * 25);
            } else {
			  ctx.fillText(highscores[i], 280, 350 + i *25);
            }
        }
	
    };

   
   highscoresScene.act = function () {
        // Load next scene
        if (lastPress === KEY_ENTER) {
            loadScene(introScene);
            lastPress = null;
        }
    };
    
    window.addEventListener('load', init, false);
}(window));