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
	let domElements;
	let currentPlayer;
	let gameState;
	let Player1;
	let Player2;
	//The Game table is a bidemensional array. 0 represents emptyness, 1 reresents slots from player 1 and 2 represents slots of player two.
	let Table;

	const SetCurrentPlayer = (Player) => {
		currentPlayer = Player;
	};

	const GetCurrentPlayer = () => currentPlayer;

	const SwitchCurrentPlayer = () => {
		if (GetCurrentPlayer().getSign() === 1) {
			SetCurrentPlayer(Player2);
		} else {
			SetCurrentPlayer(Player1);
		}
	};

	const SetGameState = (state) => {
		gameState = state;
	};

	const GetGameState = () => gameState;

	const CheckColumn = (index, sign) => {
		// We are checking for inequalities, if the column has a sign that isnt the one we are looking for, that column is not suitable for a win condition.
		let Check = true;
		Table.forEach((e) => {
			if (e[index] != sign) {
				console.log(e[index]);
				Check = false;
				return;
			}
		});
		// If all "e[index]" are equal to our sign, it means that this column is suitable to be a win condition, thus returning true.
		return Check;
	};
	const CheckRow = (index, sign) => {
		// We are also checking for inequealities. If the whole row is equal to the sign, we return true, thus the current player won.
		let Check = true;
		Table[index].forEach((e) => {
			if (e != sign) {
				Check = false;
				return;
			}
		});
		return Check;
	};

	// Checks if there are 3, same-sign, elements in the array. There are two types of crosses so for the sake of code economy, we use the same function.
	const CheckCross = (type, sign) => {
		let Check = true;
		if (type === 1) {
			let i = 0;
			Table.forEach((e) => {
				if (e[i] != sign) {
					Check = false;
				}
				i += 1;
			});
		} else {
			let i = 2;
			Table.forEach((e) => {
				if (e[i] != sign) {
					Check = false;
				}
				i -= 1;
			});
		}
		return Check;
	};

	const CheckForWin = (sign) => {
		let hasWon = false;
		// Check columns.
		//Check column 1
		if (CheckColumn(0, sign) || CheckColumn(1, sign) || CheckColumn(2, sign)) {
			hasWon = true;
		} else if (CheckRow(0, sign) || CheckRow(1, sign) || CheckRow(2, sign)) {
			hasWon = true;
		} else if (CheckCross(1, sign) || CheckCross(2, sign)) {
			hasWon = true;
		}
		return hasWon;
	};

	const CheckForDraw = () => {
		let full = true;
		Table.forEach((row) => {
			row.forEach((tile) => {
				if (tile === 0) full = false;
			});
		});
		return full;
	};
	const GameMain = (tilePosition) => {
		//TODO fix bug, that lets you keep playing.
		// If the game is paused, then do nothing.
		if (!GetGameState()) return;
		// Else

		if (Table[tilePosition[0]][tilePosition[1]]) {
			// The tile is already occupied.
			alert('The tile has been played already!');

			return;
		} else {
			Table[tilePosition[0]][tilePosition[1]] = GetCurrentPlayer().getSign();
			DisplayRenderer.Refresh(domElements, Table);
			if (CheckForWin(GetCurrentPlayer().getSign())) {
				// Make win logic
				console.log(`Player ${GetCurrentPlayer().getSign()} has won!`);
				SetGameState(false);

				GameBoard.Init();
			} else if (CheckForDraw()) {
				GetCurrentPlayer().addPoints();

				GameBoard.Init();
			}
			// Else continue game.
			// Do this through the DOM
			SwitchCurrentPlayer();
		}
	};

	//Public vars and functions
	const Init = () => {
		// Check if they haven't been initialized.
		if (typeof Player1 === 'undefined') {
			Player1 = Player(1);
			Player2 = Player(2);
			SetCurrentPlayer(Player1);
		}
		Table = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
		//TODO: Have to change this, in order to make it happen when you play start.
		SetGameState(true);

		domElements = document.getElementsByClassName('tile');
		for (let i = 0; i < domElements.length; i++) {
			console.log(domElements[i]);
			//
			let element = domElements[i];
			let index = i;

			element.addEventListener('click', () => {
				const treatedPosition = [ Math.floor(index / 3), index % 3 ];
				//Debug proposes.

				// Dont play if game is not running.
				GameMain(treatedPosition);

				console.log(`Position: ${treatedPosition[0]} ${treatedPosition[1]}`);
			});
		}
	};

	const GetPlayer1 = () => Player1;
	const GetPlayer2 = () => Player2;

	return {
		Init,
		GetPlayer1,
		GetPlayer2,
		domElements,
		Table
	};
})();

// Module for render display

const DisplayRenderer = (() => {
	//Private vars and functions
	let main_dom;

	const SpawnGameBoard = () => {
		//Spawn the game Board.
		let game = document.createElement('div');
		let rows = [ document.createElement('div'), document.createElement('div'), document.createElement('div') ];
		rows.forEach((row) => {
			row.setAttribute('class', 'row');
			for (let i = 0; i < 3; i++) {
				let tile = document.createElement('div');
				tile.setAttribute('class', 'tile');
				//TODO if necesarry, set ID (its on /Container/index.html)
				//tile.setAttribute()
				row.appendChild(tile);
			}
			game.appendChild(row);
		});
		game.setAttribute('class', 'game_area');
		main_dom.appendChild(game);
		GameBoard.Init();
	};

	//TOOD: Dinamically creates the menu.
	const SpawnMainMenu = () => {
		let menu = document.createElement('div');
		let header = document.createElement('div');
		let text = document.createElement('span');
		let buttons = document.createElement('div');
		menu.setAttribute('id', 'menu');
		header.setAttribute('class', 'header');
		text.setAttribute('id', 'text');
		buttons.setAttribute('class', 'buttons');

		menu.appendChild(header);
		menu.appendChild(text);
		menu.appendChild(buttons);

		headers_childs = [ document.createElement('span'), document.createElement('span') ];
		headers_childs[0].textContent = 'Play!';
		headers_childs[0].setAttribute('class', 'header_span_one');

		headers_childs[1].textContent = 'Tic Tac Toe';
		headers_childs[1].setAttribute('class', 'header_span_two');

		headers_childs.forEach((e) => {
			header.appendChild(e);
		});

		buttons_childs = [ document.createElement('button'), document.createElement('button') ];
		buttons_childs[0].textContent = 'Player';
		buttons_childs[0].setAttribute('id', 'player_button');

		buttons_childs[1].textContent = 'Computer';
		buttons_childs[1].setAttribute('id', 'computer_button');

		buttons_childs.forEach((e) => {
			buttons.appendChild(e);
		});

		main_dom.appendChild(menu);

		MenuHandler.InitialMenu();
	};

	//Public vars and functions

	const SwapRoot = (root) => {
		//Clear the DOM
		let child = main_dom.lastElementChild;
		while (child) {
			main_dom.removeChild(child);
			child = main_dom.lastElementChild;
		}

		//Generate new DOM
		if (root === 'menu') {
			SpawnMainMenu();
		} else if (root === 'game') {
			SpawnGameBoard();
		}
	};

	const Refresh = (dom, Table) => {
		//console.log(dom);
		for (let i = 0; i < 9; i++) {
			if (Table[Math.floor(i / 3)][i % 3] === GameBoard.GetPlayer1().getSign()) {
				//	console.log('Player1');
				dom[i].className = 'tile player1';
			} else if (Table[Math.floor(i / 3)][i % 3] === GameBoard.GetPlayer2().getSign()) {
				//	console.log('Player2');
				dom[i].className = 'tile player2';
			}
		}
	};
	const Init = () => {
		//Get html root.
		main_dom = document.getElementById('main_wrapper');

		SpawnMainMenu();
	};

	return {
		Init,
		Refresh,
		SwapRoot,

		//TODO delete this
		main_dom
	};
})();

const MenuHandler = (() => {
	//Private
	const GetMenuButtons = () => {
		return [ document.getElementById('player_button'), document.getElementById('computer_button') ];
	};
	//Public
	const InitialMenu = () => {
		let myButtons = GetMenuButtons();
		myButtons[0].addEventListener('click', () => {
			//Play game normally
			console.log('Click');
			DisplayRenderer.SwapRoot('game');
		});
		myButtons[1].addEventListener('click', () => {
			// TODO: Implement AI
			console.error('AI NOT IMPLEMENTED!');
		});
	};
	return {
		InitialMenu
	};
})();

//Factory for player
const Player = (Sign) => {
	//Private vars and funcitons
	let points = 0;
	//It is used in order to know what to display.
	let sign = Sign;

	//Public vars and functions
	const getPoints = () => points;
	const getSign = () => sign;
	const addPoints = () => {
		points += 1;
	};

	return {
		getPoints,
		addPoints,
		getSign
	};
};
