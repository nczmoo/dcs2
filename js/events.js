$(document).on('click', '', function(e){

})

$(document).on('click', '.buy', function(e){
	game.buy(e.target.id.split('-')[1]);
})

$(document).on('click', '#auto_spin', function(e){
	game.auto_toggle();
})
$(document).on('click', '.credit', function(e){
	let what = e.target.id.split('_')[1];
	game.change_credits(what);
})
$(document).on('click', '.drink', function(e){
	game.drink(e.target.id.split('-')[1]);
})

$(document).on('click', '.show', function(e){
	ui.show(e.target.id.split('-')[1])
})

$(document).on('click', '#spin', function(e){
	game.spin();
})


$(document).on('click', 'button', function(e){
	ui.refresh()
})
