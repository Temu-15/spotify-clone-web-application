import React from 'react';
import './playlistItem.css';
function PlaylistItem({playlist}) {
  return (
    <div className='playlist-item'>
        <div className="playlist-item-image">
            <img src={playlist.images[0]?.url} alt={playlist?.name} />
        </div>
        <div className="playlist-item-info">
            <h4>{playlist.name }</h4>
            <p>{playlist.description ? playlist.description.replace(/<[^>]*>?/gm, '').split(/\s+/).slice(0, 5).join(' ') + '...' : '' }</p>
        </div>
    </div>
  )
}

export default PlaylistItem