$(document).ready(function(){

	let words = ["hawk","studios","kaiser","hashtag","code","web","cryptoss","prometheus"];

	let level = -1;

	let currentLength = 0;
	
	let currentHash = [];
	let currentWord = '';
	let randomWordLength;
	randomWord(function(w){
		currentWord = w;
		randomWordLength = w.length;
		generateBlanks();
	});

	

	

	

	var typed = new Typed("#details", {

		strings: ["","<span>GBM on 18th September.</span>", "<span>Come, join the family.</span>"],
		typeSpeed: 50,
		backSpeed: 20,
		loop: true
	});

	$(document).keypress(function(ev){
		
		let pressed = String.fromCharCode(ev.keyCode);

		if(checkIfExists(pressed))
		{			
			if(currentLength == randomWordLength)
			{
				alert('GG');
				resetGame();
			}
		}
		else {
			if(level == 5)
			{
				alert("You've been Bamboozled");
				resetGame();
			}
			else
			{
				level++;
				$(".hangman").html("<img height='200' src='images/hang" + level + ".gif' />");
			}
		}
	})

	function randomWord(callback)
	{
		let random = Math.floor((Math.random() * (words.length - 1)) + 1);
		return callback(words[random]);
	}
	
	function generateBlanks()
	{

		for(let i = 0;i < randomWordLength;i++)
		{
			let hash = md5(currentWord[i]);
			
			$("#word").append("<span data-letter='" + hash + "' class='blank'>_</span>");
		}
	}

	function resetGame()
	{
		$("#word").empty();
		$(".hangman").empty();
		randomWord(function(w){
			currentWord = w;
			randomWordLength = w.length;
			currentLength = 0;
			currentHash = [];
			level = -1;
			generateBlanks();
		});
		
		
		
	}


	function checkIfExists(letter) 
	{
		let encrypted = md5(letter);
		let found = false;
		if(currentHash[letter])
			return true;
		$(".blank").each(function(){

			if($(this).data('letter') == encrypted)
			{
				currentLength++;
				$(this).html(letter);
				found = true;
				currentHash[letter] = true;
				// return false;
			}
			
		})
		if(found)
			return true;
		else
			return false;
	}

});