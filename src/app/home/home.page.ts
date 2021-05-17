import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AudiosService} from '../services/audios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  @ViewChild('audioPlayer') audioPlayer : ElementRef;
  cargando = true;
  audios: any[] = [];
  textoBuscar: string;
  audiosBuscar: any[] = [];
  buscando = false;
  audio = new Audio();
  audioTiempo: any;
  listener: void;
  navigator = window.navigator;
  dataAudioPlaying ;

  reproduciendo = false;
  audioSrc= "";
  constructor(private audiosService: AudiosService,private route: ActivatedRoute) {}

  ngOnInit(): void {
   
    this.audiosService.getAudios().subscribe((data) => {
      // Cargar Audios
      this.audios = data.sort( function (a, b) {
        return a.titulo.localeCompare(b.titulo);
      });

      // Ver Parametros de URL 
      this.route.queryParams.subscribe( data => {
        if(data.audio){
          let audio = this.audios.find(function(post, index) {
            if(post.id == data.audio){
              return post;
            }
          });
          this.play(audio);
        }
  
      });

      this.audiosBuscar = this.audios;
    });
    this.cargando=false;
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
    if (window.navigator && window.navigator.share) {
      window.navigator['share']({
        title: "Escuchá el audio '"+ a.titulo+"' en AudiosSj",
        url: '/?audio='+a.id
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('EL navegador no permite compartir');
    }
    
  }

  play(a: any) {
    this.pausar(a);
    setTimeout(() => {
      this.audioSrc = a.url;
      this.dataAudioPlaying = a;
      if (a.reproduciendo){
        a.reproduciendo = false;
        return;
      }
      document.getElementById("contact").style.marginBottom = "110px"
      this.reproduciendo = true;
      a.reproduciendo = true;
      setTimeout(() => {
        let ap :HTMLAudioElement;
        ap = <HTMLAudioElement>document.getElementById('audioPlayer');
        ap.play()
      },500)
    },100)
   
    // Le agrego margen al contact final para que se vea
   
   
  }
  
  pausar(a: any){
    document.getElementById("contact").style.marginBottom = "0px"
    this.reproduciendo = false;

    let ap :HTMLAudioElement;
    ap = <HTMLAudioElement>document.getElementById('audioPlayer');
    if(ap) ap.pause();
    // clearTimeout( this.audioTiempo );
    // this.audio.pause();
    // this.audio.currentTime = 0;
    for (let audio of this.audiosBuscar){
      if (audio.titulo !== a.titulo){
        audio.reproduciendo = false
        audio.cargando = false;
      }
    }
  }
  doRefresh(event) {
    console.log('Begin async operation');
    location.reload()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
