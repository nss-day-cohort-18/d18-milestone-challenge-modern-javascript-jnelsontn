'use strict';

// used to generate HP and Attack Damage
function randomGenerator (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let Robot = function () {
	this.usage = 'Military';
};
	
	let robotList = [];

	// Robot 'type' - UAV
	let UAV = function () {
		this.geography = 'Air';
	};
	UAV.prototype = new Robot();

		// Start UAV Models
		let UAV_Model1 = function () {
			this.id = 'UAV_Model1';
			this.manufacturer = 'Northrop Grumman';
			this.model = 'MQ8 Fire Scout';
			this.attack = {'min': 20, 'max': 35};
			this.health = {'min': 120, 'max': 140};
		};
		UAV_Model1.prototype = new UAV();
		/* 	is there a better way to add this to a dropdown (dynamically) 
			then create a new instance? */
		robotList.push( new UAV_Model1() );

		let UAV_Model2 = function () {
			this.id = 'UAV_Model2';
			this.manufacturer = 'Northrop Grumman';
			this.model = 'RQ-4 Global Hawk';
			this.attack = {'min': 15, 'max': 40};
			this.health = {'min': 110, 'max': 130};
		};
		UAV_Model2.prototype = new UAV();
		robotList.push( new UAV_Model2() );

	// Robot 'type' - UGV
	let UGV = function () {
		this.geography = 'Land';
	};
	UGV.prototype = new Robot();

		// Start UGV Models
		let UGV_Model1 = function () {
			this.id = 'UGV_Model1';
			this.manufacturer = 'Foster-Miller';
			this.model = 'TALON';
			this.attack = {'min': 10, 'max': 20};
			this.health = {'min': 90, 'max': 95};
		};
		UGV_Model1.prototype = new UGV();
		robotList.push( new UGV_Model1() );

		let UGV_Model2 = function () {
			this.id = 'UGV_Model2';
			this.manufacturer = 'Howe & Howe';
			this.model = 'RipSaw';
			this.attack = {'min': 15, 'max': 25};
			this.health = {'min': 100, 'max': 120};
		};
		UGV_Model2.prototype = new UGV();
		robotList.push( new UGV_Model2() );

	// Robot 'type' - UUV
	let UUV = function () {
		this.geography = 'Sea';
	};
	UUV.prototype = new Robot();

		// Start UUV 'Models'
		let UUV_Model1 = function () {
			this.id = 'UUV_Model1';
			this.manufacturer = 'Lockheed';
			this.model = 'Marlin MK2';
			this.attack = {'min': 40, 'max': 60};
			this.health = {'min': 80, 'max': 90};
		};
		UUV_Model1.prototype = new UUV();
		robotList.push( new UUV_Model1() );

		let UUV_Model2 = function () {
			this.id = 'UUV_Model2';
			this.manufacturer = 'Boeing';
			this.model = 'Voyager';
			this.attack = {'min': 35, 'max': 50};
			this.health = {'min': 70, 'max': 90};
		};
		UUV_Model2.prototype = new UUV();
		robotList.push( new UUV_Model2() );

/* 	Populate the Dropdown with our models from above
	Perhaps there is a better way to do this than using 'new' ? */
for ( var i = 0; i < robotList.length; i++ ) {

	let dropdown = ''; // rather declare it here than globally...and i don't need a func. for this :)
	dropdown += `<option id="${robotList[i].id}">${robotList[i].manufacturer} ${robotList[i].model}</option>`;

	$('#robot1_dropdown').append( dropdown );
	$('#robot2_dropdown').append( dropdown );
}

// Only solution I've found is to use eval() otherwise the funct.exp won't be called
$('#robot_button').click( () => {

	let para1 = eval ( $('#robot1_dropdown option:selected').attr('id') );
	let para2 = eval ( $('#robot2_dropdown option:selected').attr('id') );

	let name1 = $('#robot1_name').val();
	let name2 = $('#robot2_name').val();

	if ( (para1 === 'None' || para2 === 'None' || name1 === '' || name2 === '') || (name1 === name2) ) {
		alert('Complete All Fields and Choose Seperate Names');
		return false;
	}

	battleBots(new para1(), new para2(), name1, name2 );

});

function battleBots (battle_bot1, battle_bot2, setName1, setName2) {
	$('.winlose').empty();

	battle_bot1.name = setName1;
	battle_bot2.name = setName2;

	battle_bot1.health = randomGenerator(battle_bot1.health.min, battle_bot1.health.max);
	battle_bot2.health = randomGenerator(battle_bot2.health.min, battle_bot2.health.max);

	const store1_min = battle_bot1.attack.min;
	const store1_max = battle_bot1.attack.max;

	const store2_min = battle_bot2.attack.min;
	const store2_max = battle_bot2.attack.max;

	battle_bot1.attack = randomGenerator(store1_min, store1_max);
	battle_bot2.attack = randomGenerator(store2_min, store2_max);
	
	console.log('Player 1: ', battle_bot1);
	console.log('Player 2: ', battle_bot2);

	if (battle_bot1.health > 0 || battle_bot2.health > 0) {

		let numRound = 1;

		while (true) {

			battle_bot1.attack = randomGenerator(store1_min, store1_max);
			battle_bot2.attack = randomGenerator(store2_min, store2_max);

			console.log('Round Number: ', numRound);

			battle_bot1.health = battle_bot1.health - battle_bot2.attack;
			console.log(battle_bot2.name + ' attacks ' + battle_bot1.name + ' for ' + battle_bot2.attack + 'hp. ' + battle_bot1.name + `'s` + ' health is now ' + battle_bot1.health);

			if (battle_bot1.health <= 0) {
				battle_bot1.health = 0;
				console.log(battle_bot1.name + ' has lost. ' + battle_bot2.name + ' wins.' );

				let toWebpage = `${battle_bot1.name} has LOST (LOSER!!!)` + '<br /><br />' + '<b>' + `${battle_bot2.name} has WON (WINNER!!!!)` + '</b>';
				$('.winlose').append(toWebpage);

				break;
			}

			battle_bot2.health = battle_bot2.health - battle_bot1.attack;
			console.log(battle_bot1.name + ' attacks ' + battle_bot2.name + ' for ' + battle_bot1.attack + 'hp. ' + battle_bot2.name + `'s` + ' health is now ' + battle_bot2.health);

			if (battle_bot2.health <= 0) {
				battle_bot2.health = 0;
				console.log(battle_bot2.name + ' lost. ' + battle_bot1.name + ' wins.' );

				let toWebpage = `${battle_bot2.name} has LOST (LOSER!!!)` + '<br /><br />' + '<b>' + `${battle_bot1.name} has WON (WINNER!!!!)` + '</b>';
				$('.winlose').append(toWebpage);

				break;
			}

			numRound++;
		} // end loop
	} // end if


}






