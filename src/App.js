import React, { Component } from 'react'
import './App.css'
import Keyboard from './Keyboard'
import CurrentWord from './CurrentWord'
import Heart from './Hearth'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

	state = {
		wordCollection: ["Cheval","Raclette","Alligator","Genocide","Cravatte","Pastabox","Suicide","Partiel","Docker","Chaise","Lunettes","Rempart","Sapristi",  "Souris"],
		currentWord: null,
		alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split(''),
		usedLetter: [],
		attempt: 0,
		maxAttempt: 8
	}

	CreationPartie() {
		window.addEventListener("keyup", (e) => {
			if (e.keyCode === 13) { 
				this.launchNewGame()
			}
		})
	}

	cliqueLettre = (letter) => {

		if (this.state.usedLetter.indexOf(letter) === -1) {
		
			const usedLetter = [letter, ...this.state.usedLetter]
			
			
			let attempt = this.state.attempt
			if (this.state.currentWord.indexOf(letter) === -1) {
				attempt = this.state.attempt + 1
			}

			
			let win = 1
			for (let i = 0; i < this.state.currentWord.length; i++) { 
				if (usedLetter.indexOf(this.state.currentWord[i]) === -1) { 
					win = 0
				}
			}

		 
			if (attempt >= this.state.maxAttempt && win === 0) { 
				win = -1
			}

		
			this.setState({ usedLetter, attempt, win })
		}

	}

	nouveauMots = () => { 

		const randomIndex = Math.floor(Math.random() * this.state.wordCollection.length)
		return this.state.wordCollection[randomIndex]
		
	}

	nouvellePartie = () => { 

		this.setState({
			currentWord: this.nouveauMots(),
			usedLetter: [],
			win: 0,
			attempt: 0
		})
		
	}

	render() { 
		return (
			<div id="game">
				<h1>Jeux du pendu</h1>

				{
				
					(this.state.currentWord !== null) &&
						<Heart
							attempt={this.state.attempt}
							maxAttempt={this.state.maxAttempt}
						/>
				}

				{
		
					(this.state.currentWord !== null) &&
						<CurrentWord
							currentWord={this.state.currentWord}
							usedLetter={this.state.usedLetter}
							win={this.state.win}
						/>
				}

				{
				
					(this.state.win === 0 && this.state.currentWord !== null) &&
					<Keyboard
						alphabet={this.state.alphabet}
						usedLetter={this.state.usedLetter}
						action={this.clickLetter}
					/>
				}

				{
				
					this.state.win === 1 && 
						<p id="win_message">GG tu as gagné</p>
				}

				{
					
					this.state.win === -1 && 
						<p id="lost_message">tu as perdu c'est triste</p>
				}

				{
					
					(this.state.currentWord === null || this.state.win !== 0) &&
						<Button variant="danger" id='button1' onClick={() => this.nouvellePartie()}>Nouvelle partie</Button>
				}
			</div>
		)
	}
}


export default App;
