import {Component, OnInit} from '@angular/core';
import {AudiosService} from '../services/audios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  audios: any[] = [];
  textoBuscar: string;
  audiosBuscar: any[] = [];
  buscando = false;
  audio = new Audio();
  audioTiempo: any;

  constructor(private audiosService: AudiosService) {}

  ngOnInit(): void {
    this.audiosService.getAudios().subscribe((data) => {
      this.audios = data.sort(function (a, b) {
        return a.titulo.localeCompare(b.titulo);
      });
      this.audiosBuscar = this.audios;
    });
  }

  buscar() {
    this.audiosBuscar = [];
    let searchText = this.textoBuscar.toLocaleLowerCase();
    this.audios.forEach((audio) => {
      if (audio.descripcion.toLocaleLowerCase().includes(searchText)){
        this.audiosBuscar.push(audio);
      }
    });
    this.buscando = true;
  }

  verTodos() {
    this.buscando = false;
    this.textoBuscar = '';
    this.audiosBuscar = this.audios;
  }

  Compartir(a: any) {
  }

  play(a: any) {
    this.pausar(a);
    if (a.reproduciendo){
      a.reproduciendo = false;
      return;
    }
    this.audio.src = a.url;
    this.audio.load();
    a.cargando = true;
    this.audio.addEventListener('canplaythrough', (event) => {
      console.log('I think I can play through the entire ');
      a.cargando = false;
      this.audio.play();
      a.reproduciendo = true;
      this.audioTiempo = setTimeout( () => {
        a.reproduciendo = false;
      }, a.duracion * 1000);
    });
  }

  pausar(a: any){
    clearTimeout( this.audioTiempo );
    this.audio.pause();
    this.audio.currentTime = 0;
    for (let audio of this.audiosBuscar){
      if (audio.titulo !== a.titulo){
        audio.reproduciendo = false
        audio.cargando = false;
      }
    }


  }
}
