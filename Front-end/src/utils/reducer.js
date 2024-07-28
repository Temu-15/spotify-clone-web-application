const initialState = {
  token: null,
  playlists: [],
  selectedPlaylist: null,
  playlistWithTracks: {},
  currentTrack: null,
  user: null,
  userPlaylist: {},
  myCategories: [],
  featuredPlaylist: [],
  browseCategories: [],
  playlistTracks: {},
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 50,
  topArtists: [],
  artistTracks: [],
  relatedArtists: [],
  searchResults: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_USER_PLAYLIST":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_RELATED_ARTISTS":
      return {
        ...state,
        relatedArtists: action.relatedArtists,
      };

    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.searchResults,
      };
    case "SET_SELECTED_PLAYLIST":
    case "SET_TOP_ARTISTS":
      return {
        ...state,
        topArtists: action.topArtists,
      };

    case "SET_ARTIST_TRACKS":
      return {
        ...state,
        artistTracks: action.artistTracks,
      };
    case "SET_PLAYLIST_WITH_TRACKS":
      return {
        ...state,
        playlistWithTracks: {
          ...state.playlistWithTracks,
          ...action.playlistWithTracks,
        },
      };

    case "SET_VOLUME":
      return {
        ...state,
        volume: action.volume,
      };
    case "SET_BROWSE_CATEGORIES":
      return {
        ...state,
        browseCategories: action.browseCategories,
      };

    case "SET_FEATURED_PLAYLIST":
      return {
        ...state,
        featuredPlaylist: action.featuredPlaylist,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_MY_CATEGORY":
      return {
        ...state,
        myCategories: action.myCategories,
      };
    case "SET_CATEGORY_PLAYLISTS":
      return {
        ...state,
        categoryPlaylists: action.categoryPlaylists,
      };
    case "SET_CURRENT_TRACK":
      return {
        ...state,
        currentTrack: action.currentTrack,
      };
    case "SET_CURRENT_TRACK":
      return {
        ...state,
        currentTrack: action.currentTrack,
      };
    case "SET_IS_PLAYING":
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case "SET_CURRENT_TIME":
      return {
        ...state,
        currentTime: action.currentTime,
      };
    case "SET_DURATION":
      return {
        ...state,
        duration: action.duration,
      };
    case "SET_SELECTED_PLAYLIST":
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case "SET_PLAYLIST_TRACKS":
      return {
        ...state,
        playlistTracks: action.playlistTracks,
      };

    case "SET_MY_PLAYLIST":
      return {
        ...state,
        userPlaylist: action.userPlaylist,
      };
    case "SET_SELECTED_ALBUM":
      return {
        ...state,
        selectedAlbum: action.selectedAlbum,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      };

    default:
      return state;
  }
};

export { reducer, initialState };
