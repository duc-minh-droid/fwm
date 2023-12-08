import React from 'react'
import { Link, Navigate } from 'react-router-dom';

function Recipe({item}) {

    const mapIngredientsToString = arr => {
        const lastIndex = arr.length - 1;
        return arr.map((item, index) => {
            if (index === 0) {
                return item.name;
            } else if (index === lastIndex) {
                return " and " + item.name;
            }
            return ", " + item.name;
        }).join('');
    };

    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s ease',
        width: '60%',
        padding: "10px",
        gap: '10px'

      };
      
      const imageStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '16px', // Border for the image
      };
      
      const textStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        gap: '10px',
        color: '#272727',
      };

    return (
        <Link to={`/inventory/${item.id}`} style={{ textDecoration: 'none' }}>
        <div style={cardStyle}>
          <img src={item.image} alt={item.title} style={imageStyle} />
          <div style={textStyle}>
            <div style={{}}>{item.title}</div>
            <div style={{fontSize: '12px'}}>{item.usedIngredients.length ? `You have ${mapIngredientsToString(item.usedIngredients)}` : ''}</div>
            <div style={{fontSize: '12px', wordWrap: 'break-word'}}>You are missing {mapIngredientsToString(item.missedIngredients)}</div>
          </div>
        </div>
      </Link>
  )
}

export default Recipe