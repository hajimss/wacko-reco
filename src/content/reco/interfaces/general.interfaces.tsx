
interface ArtistItem {
    id: string;
    name: string;
  }
  
  
interface OutputTrack {
    id: string;
    name: string;
    artists: ArtistItem[];
  }


export {
    type ArtistItem,
    type OutputTrack
}
