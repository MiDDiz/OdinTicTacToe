/*
    This is the logic of the game. 
    If you want to read mor of my work you can look it up here: https://middiz.github.io/main 

    This code is under Creative Commons (CC BY-NC). 
    If you want to use it you must accredit me @ MiDDiz and state one of my socials:
    Github: https://www.github.com/MiDDiz or https://middiz.github.io/main
    Twitter: https://www.twitter.com/_MiDDiz
*/

console.log('Init');

// Module for GameBoard
const GameBoard = (() => {
	//Private vars and functions
	let Table = [];

	//Public vars and functions
	const Init = () => {};
	return { Init };
})();

// Module for render display

const DisplayRenderer = (() => {
	//Private vars and functions
	let domElements;

	//Public vars and functions
	const GetDomElements = () => domElements;
	const Init = () => {
		domElements = document.getElementsByClassName('tile');

		//Test area
		for (i = 0; i < domElements.length; i++) {
			console.log(domElements[i]);
			//
			let element = domElements[i];
			element.addEventListener('click', () => {
				console.log(element);
				element.style.background = 'red';
				element.innerHTML = 'X';
			});
		}
	};

	return { Init, GetDomElements };
})();

//Factory for player
const Player = () => {
	//Private vars and funcitons
	let points = 0;

	//Public vars and functions
	const getPoints = () => points;
	const addPoints = () => {
		points += 1;
	};

	return { getPoints, addPoints };
};

DisplayRenderer.Init();
