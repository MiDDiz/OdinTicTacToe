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
	let Table = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];

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
			}
		});
		return Check;
	};

	const CheckForWin = (sign) => {
		let hasWon = false;
		// Check columns.
		//Check column 1
		if (CheckColumn(0, sign) || CheckColumn(1, sign) || CheckColumn(2, sign)) {
			console.log(CheckColumn(0, sign));
			hasWon = true;
			console.log('Column');
		}
		if (CheckRow(0, sign) || CheckRow(1, sign) || CheckRow(2, sign)) {
			console.log('Row');
			hasWon = true;
		}
		return hasWon;
	};

	const GameMain = (tilePosition) => {
		// If the game is paused, then do nothing.
		if (!GetGameState()) return;
		// Else

		if (Table[tilePosition[0]][tilePosition[1]]) {
			// The tile is already occupied.
			alert('The tile has been played already!');

			return;
		} else {
			Table[tilePosition[0]][tilePosition[1]] = GetCurrentPlayer().getSign();

			if (CheckForWin(GetCurrentPlayer().getSign())) {
				// Make win logic
				console.log(`Player ${GetCurrentPlayer().getSign()} has won!`);
				SetGameState(false);
			}
			// Else continue game.

			DisplayRenderer.Refresh(domElements, Table);
			SwitchCurrentPlayer();
		}
	};

	//Public vars and functions
	const Init = () => {
		Player1 = Player(1);
		Player2 = Player(2);
		SetCurrentPlayer(Player1);
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

	const GetDomElements = () => domElements;
	const GetTable = () => Table;
	const GetPlayer1 = () => Player1;
	const GetPlayer2 = () => Player2;

	return { Init, GetTable, GetDomElements, GetPlayer1, GetPlayer2, domElements, Table };
})();

// Module for render display

const DisplayRenderer = (() => {
	//Private vars and functions

	//Public vars and functions
	/*
	const TileLogic = (position, element) => {
		let myPos = position;
		let domElement = element;
		const treatedPosition = [ Math.floor(myPos / 3), myPos % 3 ];
		console.log('Hello :D ' + treatedPosition);
		domElement.style.background = 'red';
	};
*/
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
			//console.log('Not');
		}
	};
	const Init = () => {
		//Test area
	};

	return { Init, Refresh };
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

	return { getPoints, addPoints, getSign };
};
