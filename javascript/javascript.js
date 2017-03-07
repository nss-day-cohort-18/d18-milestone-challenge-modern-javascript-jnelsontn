'use strict';

function randomGenerator (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let robotList = [];

let Robot = function () {
	this.usage = 'Military';
};

	// Robot 'type' - UAV
	let UAV = function () {
		// Robot.call(this);
		this.geography = 'Air';
	};
	UAV.prototype = new Robot();

		// Start UAV Models
		let UAV_Model1 = function (name) {
			this.id = 'UAV_Model1';
			this.name = name;
			this.manufacturer = 'Northrop Grumman';
			this.model = 'MQ8 Fire Scout';
			this.attack = randomGenerator(20, 35);
			this.health = randomGenerator(120, 140);
		};
		UAV_Model1.prototype = new UAV();
		robotList.push(new UAV_Model1() );

		let UAV_Model2 = function (name) {
			this.id = 'UAV_Model2';
			this.name = name;
			this.manufacturer = 'Northrop Grumman';
			this.model = 'RQ-4 Global Hawk';
			this.attack = randomGenerator(15, 40);
			this.health = randomGenerator(110, 130);
		};
		UAV_Model2.prototype = new UAV();
		robotList.push(new UAV_Model2() );

	// Robot 'type' - UGV
	let UGV = function () {
		this.geography = 'Land';
	};
	UGV.prototype = new Robot();

		// Start UGV Models
		let UGV_Model1 = function (name) {
			this.id = 'UGV_Model1';
			this.name = name;
			this.manufacturer = 'Foster-Miller';
			this.model = 'TALON';
			this.attack = randomGenerator(10, 20);
			this.health = randomGenerator(90, 95);
		};
		UGV_Model1.prototype = new UGV();
		robotList.push(new UGV_Model1() );

		let UGV_Model2 = function (name) {
			this.id = 'UGV_Model2';
			this.name = name;
			this.manufacturer = 'Howe & Howe';
			this.model = 'RipSaw';
			this.attack = randomGenerator(15, 25);
			this.health = randomGenerator(100, 120);
		};
		UGV_Model2.prototype = new UGV();
		robotList.push(new UGV_Model2() );

	// Robot 'type' - UUV
	let UUV = function () {
		this.geography = 'Sea';
	};
	UUV.prototype = new Robot();

		// Start UUV 'Models'
		let UUV_Model1 = function (name) {
			this.id = 'UUV_Model1';
			this.name = name;
			this.manufacturer = 'Lockheed';
			this.model = 'Marlin MK2';
			this.attack = randomGenerator(40, 60);
			this.health = randomGenerator(80, 90);
		};
		UUV_Model1.prototype = new UUV();
		robotList.push(new UUV_Model1() );

		let UUV_Model2 = function (name) {
			this.id = 'UUV_Model2';
			this.name = name;
			this.manufacturer = 'Boeing';
			this.model = 'Voyager';
			this.attack = randomGenerator(35, 50);
			this.health = randomGenerator(70, 90);
		};
		UUV_Model2.prototype = new UUV();
		robotList.push(new UUV_Model2() );



// Populate drop-down with Robot Models
for ( var i = 0; i < robotList.length; i++ ) {

	let dropdown = '';
	dropdown += `<option id="${robotList[i].id}">${robotList[i].model}</option>`;

	$('#robot1_dropdown').append( dropdown );
	$('#robot2_dropdown').append( dropdown );

}


// Select From Dropdown
$('#robot_button').click( () => {

	let para1 = $('#robot1_dropdown option:selected').attr('id');
	let para2 = $('#robot2_dropdown option:selected').attr('id');

	let name1 = $('#robot1_name').val();
	let name2 = $('#robot2_name').val(); 

	/* if ( para1 === 'None' || para2 === 'None' || name1 === '' || name2 === '') {
		alert('Complete All Fields');
		return false;
	} */

	console.log(para1, para2);
	battleBots( para1, para2, name1, name2 );
	// battleBots(UGV_Model2, UGV_Model1);

});

function battleBots ( Robot1, Robot2, setName1, setName2) {
	
	//console.log(Robot1);

	let battle_bot1 = new Robot1();
		battle_bot1.name = setName1;
		console.log(battle_bot1);

	let battle_bot2 = new Robot2();
		battle_bot2.name = setName2;
		console.log(battle_bot2);

	if (battle_bot1.health > 0 || battle_bot2.health > 0) {

		let numRound = 1;

		while (true) {

			console.log('Round Number', numRound);
			console.log('------------------------');

			battle_bot1.health = battle_bot1.health - battle_bot2.attack;
			console.log(battle_bot2.name + ' hit for ' + battle_bot2.attack + '. ' + battle_bot1.name + ' health is now ' + battle_bot1.health);

			if (battle_bot1.health <= 0) {
				battle_bot1.health = 0;
				console.log(battle_bot1.name + ' has lost' );
				break;
			}

			battle_bot2.health = battle_bot2.health - battle_bot1.attack;
			console.log(battle_bot1.name + ' hit for ' + battle_bot1.attack + '. ' + battle_bot2.name + ' health is now ' + battle_bot2.health);

			if (battle_bot2.health <= 0) {
				battle_bot2.health = 0;
				console.log(battle_bot2.name + ' has lost' );
				break;
			}

			// battle_bot1.attack = randomGenerator(20, 35);
			// battle_bot2.attack = randomGenerator(40, 60);

			numRound++;
		} // end while loop
	}


}






