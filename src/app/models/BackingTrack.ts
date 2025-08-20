export interface BackingTrack {
  id?: number;          // id_backingtracks no Java
  artist: string;
  song: string;
  playmusic: string;
  presetguitar: string;
  software: string;
  videopreset: string;
    // NOVOS CAMPOS que você quer exibir
  filename: string;
  downloaddescription: string;
}