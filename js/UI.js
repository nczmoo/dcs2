class UI{
	
	constructor(){

	}
	refresh(){
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
	}

	show_character(character, id){
		
		let txt = "<div>Health: " + character.health + "/" + character.max_health + " </div>"
			+ "<div> Energy: " + character.energy  + "</div>"
			+ "<div> <span id='" + id + "-defense'>Defense: " + character.defense + "</span>"
			+ "<span id='" + id + "-healing'>Healing: " + character.healing + " / spin</span></div>"
		$("#" + id + "_health").val(character.health);
		$("#" + id).html(txt);
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

	update_log(msg, is_player){
		let id = "enemy_log";
		if (is_player){
			id = "player_log";
		}
		$("#" + id).html("<div>" + msg + "</div>" + $("#" + id).html() );
	}
}
