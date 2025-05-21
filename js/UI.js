class UI{
	
	constructor(){

	}

	clear_log(){
		$("#player_log").html("");
		$("#enemy_log").html("");
	}

	display_inventory(){
		let txt = "";
		for (let potion in game.inventory.potions){
			console.log(potion, game.inventory);
			let count = game.inventory.potions[potion];
			txt += "<button id='drink-" + potion + "' class='drink'>" + potion + " potion (" + count + ")</button>";
		}
		$("#inventory").html(txt);
		for (let potion in game.inventory.potions){
			let count = game.inventory.potions[potion];
			if (count < 1){
				$("#drink-" + potion).prop('disabled', true);
			}
		}
	}

	display_store(){
		let txt = "";
		for (let item in game.for_sale){
			let name = item.split('_').join(' ');
			let cost = game.for_sale[item];
			txt += "<div><button id='buy-" + item + "' class='buy'>buy " + name + " for " + cost + " gold</button>";
		}
		$("#store").html(txt);
		for (let item in game.for_sale){			
			let cost = game.for_sale[item];
			if (cost > game.gold){
				$("#buy-" + item ).prop('disabled', true);
			}
		}
	}
	refresh(){
		$("#gold").html(game.gold);
		this.show_reels(game.slots, "player_slots");
		this.show_reels(game.enemy_slots, "enemy_slots");
		//this.show_character(game.player, "player");
		//this.show_character(game.enemy, 'enemy');
		$("#credits").html(game.credits);
		$("#auto_spin").removeClass("auto");
		if (game.auto_spinning){
			$("#auto_spin").addClass("auto");
		}
		$("#credit_more").prop('disabled', false);
		$("#credit_less").prop('disabled', false);
		if (game.credits == 1){
			$("#credit_less").prop('disabled', true);
		} else if (game.credits >= game.config.max_credits){
			$("#credit_more").prop('disabled', true);
		}
		let characters = ['player', 'enemy'];
		let hiding = ['defense', 'healing'];
		for (let character of characters){
			this.show_character(game[character], character);
			for (let hide of hiding){	
				if ($("#" + character + "-" + hide).hasClass('hidden')){
					$("#" + character + "-" + hide).removeClass('hidden');
				}				
				if (game[character][hide] < 1){
					$("#" + character + "-" + hide).addClass('hidden');
				}
			}
		}
		$("#enemy_health").attr("max", game.enemy.max_health);
		this.display_inventory();
		this.display_store();
	}

	show_character(character, id){
		$("#" + id + "_name").html(character.name);
		let txt = "<div>Health: " + character.health + "/" + character.max_health + " </div>"
			+ "<div> Energy: " + character.energy  + "</div>"
			+ "<div> <span id='" + id + "-defense'>Defense: " + character.defense + "</span>"
			+ "<span id='" + id + "-healing'>Healing: " + character.healing + " / spin</span></div>"
		$("#" + id + "_health").val(character.health);
		$("#" + id).html(txt);
	}
	show(what){
		$(".window").addClass('hidden');
		$("#" + what).removeClass('hidden');

	}

	show_reels(slot_machine, id){
		let txt = "";
		for (let row = -1; row <= 1; row ++){
			txt += "<div class='row'>";
			for (let reel_id = 0; reel_id < slot_machine.config.num_of_reels; reel_id ++){
				txt += "<div class='col'>" + slot_machine.fetch(reel_id, row) + "</div>";
			}
			txt += "</div>";
		}
		
		$("#" + id).html(txt);
	}
	update_journal(msg){
		$("#journal").html("<div>" + msg + "</div>" + $("#journal").html() );
	}

	update_log(msg, is_player){
		let id = "enemy_log";
		if (is_player){
			id = "player_log";
		}
		$("#" + id).html("<div>" + msg + "</div>" + $("#" + id).html() );
	}

}
