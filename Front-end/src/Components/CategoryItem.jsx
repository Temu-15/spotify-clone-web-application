import React from 'react'
import PlaylistItem from './PlaylistItem'
import './categoryItem.css'
function CategoryItem({category}) {
  return (
    <div className='category-item'>
        <h2 className="category-title">{category.category}</h2>
        <div className='category-container'>
            {category.playlists?.map((playlist)=>(
                <PlaylistItem playlist={playlist} />
            ))}
        </div>
    </div>
  )
}

export default CategoryItem