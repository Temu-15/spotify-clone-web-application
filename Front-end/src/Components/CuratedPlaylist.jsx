import React from 'react';
import { useEffect } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import myPlaylist from '../ApiHandler/myPlaylist';
import './curatedPlaylist.css'
function CuratedPlaylist() {
    const [{userPlaylist, user}, dispatch] = useStateProvider();
    useEffect(()=>{
        const fetchCuratedPlaylist = async () =>{
            if (!user) return;
            try{
                const playlistData = await myPlaylist();
                dispatch({
                    type: 'SET_MY_PLAYLIST',
                    userPlaylist: playlistData
                });
            }
            catch(error){
                console.log(error);
            }
        
        }
     fetchCuratedPlaylist();
    }, []);
   console.log(userPlaylist);
  return (
    <div className="curated-playlist">
        <h2>Good afternoon</h2>
        <div className="your_playlist">
            {userPlaylist?.items?.map((item, index) => (
                <div key={item?.id} className="playlist-container">
                    <div className="playlist-image"><img src={item?.images[0].url} alt={item.name} /></div>
                    <span className="playlist-name">{item?.name}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CuratedPlaylist