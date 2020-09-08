import { Player } from './../_models/player';
import { WordServiceService } from './../_services/word-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Foe } from '../_models/foe';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  timeElapsed: number = 0;

  foe = new Foe();
  player = new Player();

  wordToType: string = 'word';
  gameOver = false;

  interval;
  damageForm: FormGroup;

  constructor(private fb: FormBuilder, private wordService: WordServiceService) {
    this.damageForm = this.fb.group({
      wordToTypeCtrl: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.wordService.randomWord.subscribe(word => {
      this.wordToType = word[0];
      this.startTimer();
    })
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeElapsed++;
      if (this.timeElapsed == this.foe.spd){
        this.takeDamage();
        this.resetTimer();
      }
    }, 1000)
  }

  dealDamage(input: string) {
    if (input == this.wordToType){
      this.foe.hp--;
      if (this.foe.hp <= 0){
        this.onFoeKilled();
      }
    } else {
      this.takeDamage();
    }
  }

  takeDamage(){
    this.player.hp -= this.foe.dmg;
    if (this.player.hp <= 0){
      this.gameOver = true;
      clearInterval(this.interval);
    }
  }

  onFoeKilled(){
    this.player.score++;
    this.foe.hp = 10;
  }

  resetTimer() {
    this.timeElapsed = 0;
  }

  onSubmit(){
    this.dealDamage(this.damageForm.value.wordToTypeCtrl);
    this.damageForm.reset();
    this.wordService.randomWord.subscribe(word => {
      this.wordToType = word[0];
    })
  }



}
