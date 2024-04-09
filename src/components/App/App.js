// To do -
// Improve Responsive Design  below 600px
// Improve CSS 

import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../Searchbar/Searchbar';
import { Spotify } from "../../util/Spotify/Spotify";

function App() {

    const [searchResults, setSearchResults] = useState([
        {
            name: "Example Track 1",
            artist: "Example Artist 1",
            album: "Example Album 1",
            id: 1,
        },
        {
            name: "Example Track 2",
            artist: "Example Artist 2",
            album: "Example Album 2",
            id: 2,
        },
        {
            name: "Example Track 3",
            artist: "Example Artist 3",
            album: "Example Album 3",
            id: 3,
        }
    
    
    ]);

    const [playlistName, setPlaylistName] = useState("Example Playlist Name");

    const [playlistTracks, setPlaylistTracks] = useState([
      {
        name: "Example Playlist 1",
        artist: "Example Playlist Artist 1",
        album: "Example Playlist Album 1",
        id: 1,
    },
    {
        name: "Example Playlist Track 2",
        artist: "Example Playlist Artist 2",
        album: "Example Playlist Album 2",
        id: 2,
    },
    {
        name: "Example Playlist Track 3",
        artist: "Example Playlist Artist 3",
        album: "Example Playlist Album 3",
        id: 3,
    }

    ]);

    
    function addTrack(track) {
      const existingTrack = playlistTracks.find(t => t.id===track.id);
      const newTrack = playlistTracks.concat(track);
      if(existingTrack){
        console.log("This track is already in the playlist.");
      } else {
        setPlaylistTracks(newTrack);
      }
    }

    function removeTrack(track) {
      const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
      setPlaylistTracks(existingTrack);

    };

    function updatePlaylistName(name){
      setPlaylistName(name); // prev?
    }

    function savePlaylist(name){
      const URIs = playlistTracks.map((t) => t.uri );
      Spotify.savePlaylist(playlistName, URIs).then( () => {
        updatePlaylistName("New Playlist");
        setPlaylistTracks([]);
      }

      );
    }

    function search(term) {
      Spotify.search(term).then((result) => setSearchResults(result));
      console.log(term);
    }
    

  return (
    <div className="App">

    {/* HEADER */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Ja<span className="highlight">mmm</span>in!
        </h1>
      </header>

    {/* BODY */}
      <body className="App-body">
        {/* Searchbar COMPONENT */}
            <SearchBar onSearch={search}/>
        <div className="App-playlist">
        {/* SearchResults Component */}
            <SearchResults userSearchResults={searchResults} onAdd={addTrack} />

        {/* Playlist Component */}
            <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
            />
        </div>
      </body>
    {/* FOOTER */}
      <footer className="App-footer">

</footer>
    </div>
  );
}

export default App;
