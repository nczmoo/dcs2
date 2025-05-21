class Game{
	auto_spinning = false;
	config = new Config();
	credits = 1;
	enemy = new Character(false, 10, 'a rat');
	enemy_slots = new Slots(false, 'attack', 'defend', 'attack', 'attack');
	for_sale = {
		energy_potion: 2,
		health_potion: 3,
		room_at_the_inn: 5,
	}
	gold = 0;
	inventory = {
		potions: {
			energy: 0,
			health: 0,
		}
	}
	paused = false;
	player = new Character(true, 100, 'player');	
	slots = new Slots(true, 'attack', 'defend', 'attack', 'heal');
	attack(dmg, is_player){
		//console.log(dmg, is_player);
		let character = this.player;
		if (is_player){
			//console.log("yes");
			character = this.enemy;
		}
		//console.log(character);

		character.get_hit(dmg);
	}

	auto_toggle(){
		this.auto_spinning = !this.auto_spinning;
	}

	buy(what){
		let cost = this.for_sale[what];
		if (cost > this.gold){
			return;
		}
		console.log(what, cost, )
		this.gold -= cost;
		if (what.split("_")[1] == 'potion' ){
			this.inventory.potions[what.split("_")[0]] ++;
		}
	}

	change_credits(what){
		if (what == "more" && this.credits < this.config.max_credits){
			this.credits ++ ;
			return;
		} else if (what == "less" && this.credits > 1){
			this.credits -- ;
			return;
		}
	}

	drink(type){
		if(this.inventory.potions[type] < 1){
			return;
		}
		let rand = randNum(this.config.potion_increments[type].min, this.config.potion_increments[type].max);
		this.player[type] += rand;
		if (this.player[type] > 100){
			this.player[type] = 100;
		}
		this.inventory.potions[type] --;
	}
	
	process_pay(pay, is_player){
		for (let what in pay){
			let quantity = pay[what];
			if (quantity == 0){
				continue;
			}
			let character = this.enemy;	
			if (is_player){
				character = this.player;
			}
			character.gain_skill(what);
			if (what == 'attack'){
				let dmg = quantity * character.fetch_skill("attack");
				ui.update_log("You attacked them for " + dmg + " damage.", is_player);
				this.attack(dmg, is_player);
				continue;
			}
			//console.log(character, what);
			character[what](quantity);
		}
	}

	spin(){

		if (this.player.energy >= this.credits && this.player.alive){			
			let pay = this.slots.spin(this.credits);
			this.process_pay(pay, true);
		}
		
		if (this.enemy.energy >= this.credits && this.enemy.alive){
			let enemy_pay = this.enemy_slots.spin(this.credits);
			this.process_pay(enemy_pay, false);
		}
		this.player.tick(this.credits);
		this.enemy.tick(this.credits);
		if (!this.enemy.alive){
			this.enemy = new Character(false, 10, 'a rat');
		}
	}
}
