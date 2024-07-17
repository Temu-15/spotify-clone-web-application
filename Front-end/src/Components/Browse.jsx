// import React from 'react'
// import './browse.css'

// function Browse() {
//   return (
//     <section className="section">
//     <h2 className="title">Περιήγηση σε όλα</h2>
//     <div className="section--body">
//         <div className="section--body--item category--item">
//             <a href="#" >
//                 <h3>Podcast</h3>
//                 <img src="http://via.placeholder.com/150x150" alt="" />
//             </a>
//         </div>

//         <div className="section--body--item category--item" style="background-color: rgb(160, 195, 210);">
//             <a href="#" >
//                 <h3>Ειδικά για εσένα</h3>
//                 <img src="http://via.placeholder.com/150x150" alt="" />
//             </a>
//         </div>

//         <div className="section--body--item category--item" style="background-color: rgb(160, 195, 210);">
//             <a href="#" >
//                 <h3>Νέες Κυκλοφορίες</h3>
//                 <img src="http://via.placeholder.com/150x150" alt=""/>
//             </a>
//         </div>
//     </div>
// </section>
//   )
// }

// export default Browse

import React from 'react';
import { useEffect } from 'react';
import './browse.css';
import getBrowseCategories from '../ApiHandler/getBrowseCategories';
import { useStateProvider } from '../utils/StateProvider';
import { Link } from 'react-router-dom';

function Browse() {
 const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  const [{user,browseCategories, myCategories}, dispatch] = useStateProvider();
  console.log(myCategories)
  useEffect(() => {
    const fetchBrowseCategories = async () => {
      if (!user) return;
      try {
        const response = await getBrowseCategories();
        dispatch({
          type: 'SET_BROWSE_CATEGORIES',
          browseCategories: response,
        });
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchBrowseCategories()
    }, []);
    console.log(browseCategories)
  return (
    <section className="section">
      <h2 className="title">Browse All</h2>
      <div className="section--body">
        {browseCategories?.map((category, index) => (
          <div className="section--body--item category--item"  style={{ backgroundColor: colorArray[index + 4 % colorArray.length] }}>
            <Link href="#" >
              <h3>{category.name}</h3>
              <img src={category.icons[0].url} alt={category.name} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Browse;
