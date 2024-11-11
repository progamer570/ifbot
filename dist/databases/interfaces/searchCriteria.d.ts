interface DramaSearchCriteria {
    dramaName?: string;
    quality?: string;
    language?: string;
    season?: number;
    year?: number;
    episode?: number;
}
interface MovieSearchCriteria {
    movieName?: string;
    quality?: string;
    language?: string;
    year?: number;
}
interface AnimeSearchCriteria {
    animeName?: string;
    quality?: string;
    language?: string;
    season?: number;
}
interface AIOSearchCriteria {
    aIOTitle?: string;
}
export { DramaSearchCriteria, MovieSearchCriteria, AnimeSearchCriteria, AIOSearchCriteria };
