import React from 'react';
import getCategories from '../ApiHandler/getCategories';
import { useStateProvider } from '../utils/StateProvider';
import './categories.css'
import { useEffect } from 'react';
import CategoryItem from './CategoryItem';

function Categories() {
    const [{myCategories}, dispatch] = useStateProvider();
    useEffect(()=>{
        const fetchMyCategories = async () =>{
            if(myCategories.length > 0 ) return;
            try{
                const myCategorydata = await getCategories();
                dispatch({
                    type: 'SET_MY_CATEGORY',
                    myCategories: myCategorydata
                });
            
            }
            catch(error){
                console.log(error);
            }
        
        }
     fetchMyCategories();

    }, []);
    console.log(myCategories)
  return (
    <div className="categories">
        {myCategories.map((category) =>(
            <CategoryItem category={category} />
        ))}
    </div>
  )
}

export default Categories