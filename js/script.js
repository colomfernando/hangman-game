'use strict';
$(document).ready(function(){

	//name = prompt('Cual es tu nombre');
	//var h2Name = document.getElementById('name').innerHTML = name;

	// array with a collection of words
	var words = ['pala','martillo','pico','pelota','guante', 'la'];	
	// array for save lenght of selected word
	var answerWord = [];
	// array for save the selected word
	var hiddenWord = [];

	var guessCounter = $('.guess-chance span');
	var status = $('.status');
	var testLetter = $('#test-letter');
	var letterInput = $('#letter-input');
	var btnContainer = $('.button-container');
	var btnStart = $('#start');
	var messageStatus = $('.message');
	var messageInput = $('.message');

	status.hide();
	testLetter.hide();
	letterInput.hide();

	// function to pick a random word from words array
	function pickWord() {

		var randomNumber = Math.floor(Math.random()* words.length); 

		var randomWord = words[randomNumber];

		var divWord = $('.word-container');

		var splitRandomWord = randomWord.split('');

		hiddenWord = splitRandomWord;

		divWord.html('');

		for (var i = 0; i < randomWord.length; i++) {
			var letter = answerWord[i] = '_';
			divWord.append('<p class="letters">' + letter + '</p>');
		};
	};

	////////////////////////////////////////////////////
	var getMessage = function(argument) {

	var message = [{text:'GOOD'}, {text:'WRONG'},{text: 'GAME OVER'}];

	var messageInput = $('.message');
	
		if (argument === 0) {
			messageInput.html('<span class="message-good">' + message[argument].text  + '<span>');

		} else if (argument === 1) {
			messageInput.html('<span class="message-wrong">' + message[argument].text  + '<span>');

		} else if (argument === 2) {
			messageInput.html('<span class="message-gameover">' + message[argument].text  + '<span>');
		}
	}
	///////////////////////////////////////////////////
	$('#start').click(function(event) {
		event.preventDefault();
		guessCounter.html(0);
		messageInput.html('');
		status.show(100);
		testLetter.show(100);
		letterInput.show(100);

		remainGuess = 6;
		pickWord();

		$(this).text('Comenzar de nuevo');

		$('#letter-input').val('')

		guessCounter.text(remainGuess);



	});
	//////////////////////////////////////////////////////
	// chance to guess the letter
	var remainGuess = 6;

	$('.guess-chance span').val(' ' +remainGuess);
	
	//////////////////////////////////////////////////
	$('#test-letter').click(function(event) {
		event.preventDefault();

		var letterToTest = $('.guess').find('input').val();
		var status = $('.status');

		if (letterToTest.length > 1) {

			alert('Ingrese solo una letra');

		} else if (letterToTest === '') {
			alert('Debe ingresar una letra')
		} else {
			
			for (var i = 0; i < hiddenWord.length; i++) {
	        	if (letterToTest === hiddenWord[i]) {
	        	answerWord[i] = letterToTest;
	        	getMessage(0);
	        	} 
			}
			
			if (answerWord.indexOf(letterToTest) === -1) {
				remainGuess--;
				getMessage(1);

			}

				letterInput.val('');

			guessCounter.text(' ' + remainGuess);
		};
		//////////////////////////////////////////////////////////////
		
		var divWord = $('.word-container');
    	divWord.html('');

    	for (var i = 0;i < answerWord.length; i++) {
    		var letter = answerWord[i]
    		divWord.append('<p class="letters">' + letter.toUpperCase() + '</p>');
    	}

    	if ($('.guess-chance span').text() < 1) {
			$('.guess-chance span').html(0);
			getMessage(2);
			testLetter.hide();
			letterInput.hide();
		}	
	});
})


