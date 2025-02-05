let canvas_w = 800;
let canvas_h = 450;

let config = {
	width: canvas_w,
	height: canvas_h,
	scene: {
		preload: precarga,
		create: crea,
		update: actualiza
	}
};

let game = new Phaser.Game(config);

//let rect;
//let rect_dir = 1;

let huevera_b, huevera_m, huevera_d;
let huevo_b, huevo_m, huevo_d;

let sprite_scale = .5;

let huevera_x = 128;

let huevo_shadow;
let canvas_bg, eggcups_bg;

let countdown = 60;
let countdown_text;
let countdown_interval;

function precarga (){
	this.load.image('grass_bg', 'grass_bg.png');
	this.load.image('straw_bg', 'straw_bg.png');
	this.load.image('huevera', 'huevera.png');
	this.load.image('huevo', 'huevo.png');
}

function crea (){
	//rect = this.add.rectangle(400, 225, 32, 32, 0xffffff);


	let marron = Phaser.Display.Color.GetColor(192, 128, 16);
	let dorado = Phaser.Display.Color.GetColor(188, 195, 0);
	
	canvas_bg = this.add.image(canvas_w/2, canvas_h/2, 'grass_bg');
	
	eggcups_bg = this.add.image(huevera_x, canvas_h/2, 'straw_bg');
	eggcups_bg.setScale(sprite_scale);
	eggcups_bg.angle = 90;
	
	huevera_d = this.add.image(huevera_x, canvas_h/2 - 128, 'huevera');
	huevera_d.setScale(sprite_scale);
	huevera_d.setTint(dorado);
	
	huevera_m = this.add.image(huevera_x, canvas_h/2, 'huevera');
	huevera_m.setScale(sprite_scale);
	huevera_m.setTint(marron);

	huevera_b = this.add.image(huevera_x, canvas_h/2 + 128, 'huevera');
	huevera_b.setScale(sprite_scale);

	huevo_shadow = this.add.image(-10000, -1000, 'huevo');
	huevo_shadow.setTint("#000000");
	huevo_shadow.alpha = .5;
	huevo_shadow.setScale(1.3);

	huevo_m = this.add.image(400, 256, 'huevo');
	huevo_m.setTint(marron);
	huevo_m.setInteractive({ draggable:true });

	huevo_m.on('pointerdown', function (){
		console.log("Huevo marrón");

		huevo_shadow.x = this.x + 8;
		huevo_shadow.y = this.y + 8;

		this.setScale(1.3);
	});

	this.input.on('drag', function (pointer, object, x, y){
		object.x = x;
		object.y = y;
		huevo_shadow.x = x + 8;
		huevo_shadow.y = y + 8;

		if(Phaser.Geom.Intersects.RectangleToRectangle(huevera_m.getBounds(), object.getBounds())){
			console.log("Huevo dentro de huevera");
		}
	});
	
	this.input.on('drag', function (pointer, object, x, y){
		object.setScale(1);
		huevo_shadow.x = -10000;
		huevo_shadow.y = -10000;
	});
	
	countdown_text = this.add.text(canvas_w/2 + canvas_w/8, 16, "0", {"fontSize": 48, "fontStyle": "bold"});
	

	
}

function actualiza () {
	/*
	rect.x += rect_dir;

	if (rect.x <= 0 || rect.x >= canvas_w){
		rect_dir = -rect_dir;
	
	}
		*/

}


/*
let counter = 10;

let intervalo_contador;

intervalo_contador = setInterval (function (){
	counter--;
	if (counter <= 0){
		clearInterval(intervalo_contador);
		return;
	}
	console.log(counter);
}, 1000);
*/

countdown_interval = setInterval(function (){
	countdown--;
	
	countdown_text.text = countdown;
	
	if (countdown <= 0){
		console.log("Game Over");
		clearInterval(countdown_interval);
	}

}, 1000);


