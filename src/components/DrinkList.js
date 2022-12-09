import React from 'react'
import {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import "./css/DrinkList.css"
import Sticky from 'react-stickynode';


const DrinkList = ({ingredientName, isSearchIngredient}) => {

    let { id } = useParams();

    const [drinkList , setDrinkList] = useState(null);

    const ingredientUrlDrinkList = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`

    const drinkNameUrlDrinkList = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${id}`
  
    const url = isSearchIngredient ? ingredientUrlDrinkList : drinkNameUrlDrinkList
    
    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setDrinkList(json)
        })
        .catch(console.error) 
      }, []);
 
      const [drinkListInfo , setDrinkListInfo] = useState(null)
    
      const ingredientUrlInfo = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`

      const drinkNameUrlInfo = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${id}`;
   
      const urlInfo = isSearchIngredient ? ingredientUrlInfo : drinkNameUrlInfo
      
      // const urlInfo = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${id}`;
      useEffect(() => {
          fetch(urlInfo)
          .then((response) => response.json())
          .then((json) => {
            setDrinkListInfo(json)
          })
          .catch(console.error) 
        }, []);
   

        return ( drinkList && drinkListInfo ?
        <>
            <Sticky top={50}>
              <h2 id='baseIngredientDrinks'>{id}</h2>
            </Sticky>
          <div className='drinkInfo'>
            {drinkListInfo.ingredients.map((drinkListInfoMap,drinkListInfoIdx) => {
              return (
                <div key={drinkListInfoIdx} className='drinkInfoDetails'> 
                    {/* <h2>
                      {drinkListInfoMap.strIngredient}
                    </h2> */}
                    <h3> ABV:   
                      {drinkListInfoMap.strABV}%
                    </h3>
                    <h3>
                      {drinkListInfoMap.strDescription}
                    </h3>
                  </div>
              )
            })}

        </div>


          <div className='ingredientSection'>
            <h2 className='backBox'>
              <a href={`/search`}><i className="backLink"></i>Change Base Ingredient</a>
            </h2>
            <section className='drinkList'>

              {drinkList.drinks.map((drinkListMap,drinkListIdx) => {
                return (
                  <Link to={`/drinks-details/${drinkListMap.idDrink}`} key={drinkListIdx} className='componentCSS'>
                    <div>        
                      <img width={150} src={drinkListMap.strDrinkThumb}></img>
                    </div>
                    <div className="cardTitle">
                      {drinkListMap.strDrink}
                    </div>
                  </Link>
                       )
                  })}

            </section> 
          </div>
          </>
            :
          <p> loading .. </p>
            );
    
}

export default DrinkList