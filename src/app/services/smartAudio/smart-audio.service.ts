import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class SmartAudioService {
  // tslint:disable: variable-name
  constructor(private _nativeAudio: NativeAudio) { }

  private preload(key: string, asset: string) {
    this._nativeAudio.preloadComplex(key, asset, 1, 1, 0)
      .then(() => {
        console.log(key, 'cargado con exito');
      })
      .catch(err => {
        console.log('Error al cargar', key, 'en ruta', asset, 'error:', err);
      });
  }

  private play(key: string) {
    this._nativeAudio.play(key).then((res) => {
      console.log('Reproduzco', key, res);
    }).catch(err => {
      console.log('Error al reproducir', err, 'en', key);
    });
  }

  private stop(key: string) {
    this._nativeAudio.stop(key).then((res) => {
      console.log('Detengo', key, res);
    }).catch(err => {
      console.log('Error al parar', err, 'en', key);
    });
  }

  public cargarAudios() {
    this.preload('izquierda', 'assets/sonidos/izquierda.mp3');
    this.preload('derecha', 'assets/sonidos/derecha.mp3');
    this.preload('vertical', 'assets/sonidos/dejalo.mp3');
    this.preload('horizontal', 'assets/sonidos/volve.mp3');
  }

  public reproducirAudio(key: string, delay: number) {
    this.play(key);
    setTimeout(() => { this.stop(key); }, delay * 1000);
  }
}
