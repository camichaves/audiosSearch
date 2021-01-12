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
  constructor(private audiosService: AudiosService) {}

  ngOnInit(): void {
    this.audiosService.getAudios().subscribe((data) => {
      this.audios = data;
    });
  }

  buscar() {
    this.audios.forEach((audio) => {
      // audio.descripcion.forEach((pal) => {
      //   if (this.textoBuscar === pal){
      //     this.audiosBuscar.push(audio);
      //   }
      // });
    });
    this.buscando = true;
  }

  verTodos() {
    this.buscando = false;
    this.textoBuscar = '';
    this.audiosBuscar = [];
  }

  Compartir(a: any) {
  }

  play(a: any) {
  }
}
