import React from 'react'
import {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const DrinkList = (props) => {

    let { id } = useParams();

    const [drinkList , setDrinkList] = useState(null)


    useEffect(() => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${id}`;
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setDrinkList(json)
          
        })
        .catch(console.error) 
      }, []);


  return ( drinkList ?

    <div> heh
      {DrinkList.drinks.map((drinkListMap,idx) => {
        return (

          <Link to={`/drinks/:idd/drink-details/${drinkListMap.idDrink}`} key={idx} className='componentCSS'>
    
            <div>        
              <img width={150} src={drinkListMap.strDrinkThumb}></img>
            </div>
            <div className="cardTitle">
              {drinkListMap.strDrink}
            </div>

          </Link>
               )
          })} 
    </div>
      :
    <p> loading .. </p>
)
}

export default DrinkList