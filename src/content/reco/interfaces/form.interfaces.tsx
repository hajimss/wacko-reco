

interface TrackObj {
    id: string;
    name: string;
    artist: string;
}

interface ArtistObj {
    id: string;
    name: string;
    artist: string;
}

interface MetricObj {
    danceability: number[];
    acousticness: number[];
    instrumentalness: number[];
}

interface RecoObj {
    [key: string]: Set<string> | MetricObj 
}

interface HandleSubmitInterface {
    (trackSeed: Set<string>, artistSeed: Set<string>, metrics: MetricObj): void
}

export {
    type RecoObj,
    type HandleSubmitInterface,
    type TrackObj,
    type ArtistObj,
    type MetricObj
}