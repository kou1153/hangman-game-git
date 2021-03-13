import React from "react";
import {randomWord} from "./words";
import img1 from "./images/01.png";
import img2 from "./images/02.png";
import img3 from "./images/03.png";
import img4 from "./images/04.png";
import img5 from "./images/05.png";
import img6 from "./images/06.png";
import img7 from "./images/07.png";
import img8 from "./images/08.png";
import './styles.css';

class Hangman extends React.Component{

    static defaultProps = {
        images: [img1, img2, img3, img4, img5, img6, img7, img8],
        maxGuess: 7
    }

    constructor(){
        super();
        this.state ={
            answer: randomWord().toUpperCase(),
            guessed: new Set(), //Kiem soat so lan nguoi dung doan 
            numWrong: 0 //doan sai +1 cho den khi = maxguess
        }
    }

    handleClick = e =>{
        const guessedLetter = e.target.value;
        this.setState(oldState => ({
            guessed: oldState.guessed.add(guessedLetter),
            numWrong: oldState.numWrong + (oldState.answer.includes(guessedLetter) ? 0 : 1) //kiem tra nguoi dung nhap co nam trong "answer" khong? neu co +1 neu
        })); //setstate rerender lai het
    }

    generateButtons = () => {
        let letters = "abcdefghijklmnopqrstuvwxyz";
        letters = letters.toUpperCase().split(""); //toUppercase in hoa -> Spit() thanh tung phan tu trong array -> Map() trong js: di qua tung thanh tu trong array 
        return letters.map(letter => (
            <button
                key = {letter}
                value = {letter}
                onClick= {(e) => this.handleClick(e)}
                disabled={this.state.guessed.has(letter)}>
                {letter}
            </button>
        ))
    }

    guessedWord = () => {
        return this.state.answer
        .split("") //split sentense thanh tung phan tu trong array
        .map(letter => this.state.guessed.has(letter) ? letter : "_"); //check xem chu do co trong guessed? neu co thay bang chu do, neu khong thay bang "_"
    }

    resetGame = () => {
        this.setState({
            answer: randomWord().toUpperCase(),
            guessed: new Set(),
            numWrong: 0
        })
    }

    render(){
        const {numWrong, answer} = this.state;
        const {maxGuess} = this.props;
        const isGameOver = numWrong >= maxGuess; //tra ve true
        const isWon = answer === this.guessedWord().join(""); //ket hop cac phan tu trong array
        
        let text = "";
        if(isWon) text = "You Win";
        if(isGameOver) text = "You Lose"

        return(
        <>
        <div className="container">
            <h1>HangMan Game</h1>
            <img src= {this.props.images[numWrong]} />
            <p className="Hangman-word">{isGameOver ? answer : this.guessedWord()}</p>
            <p className={'result ${isWon ? "win" : ""} ${isGameOver ? "lose" : ""}'}>
                {text}
            </p>
            <div hidden = {isGameOver || isWon}>
            <p className="Hangman-btns">
                {this.generateButtons()}
            </p>
            </div>
            <button className="reset" onClick = {() => this.resetGame()}>Reset Game</button>
        </div>
        </>
        //numWrong cho ra 1 so decimal this.props.images se hien thi ra hinh anh thich hop voi numWrong trong array 
        //neu tra ve true hidden nut
        )
    }
}

export default Hangman;