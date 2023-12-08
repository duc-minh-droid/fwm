import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { db, auth } from "../../firebase";
import { collection, getDocs, onSnapshot, where, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"
import { PiBowlFoodFill } from "react-icons/pi";
// const inventory = [
//     {
//         "name": "apple",
//         "image": "apple.jpg",
//         "id": 9003,
//         "aisle": "Produce",
//         "possibleUnits": [
//             "small",
//             "large",
//             "piece",
//             "slice",
//             "g",
//             "extra small",
//             "medium",
//             "oz",
//             "cup slice",
//             "cup",
//             "serving"
//         ]
//     },
//     {
//         "name": "applesauce",
//         "image": "applesauce.png",
//         "id": 9019,
//         "aisle": "Canned and Jarred",
//         "possibleUnits": [
//             "g",
//             "oz",
//             "cup",
//             "serving",
//             "tablespoon"
//         ]
//     },
//     {
//         "name": "apple juice",
//         "image": "apple-juice.jpg",
//         "id": 9016,
//         "aisle": "Beverages",
//         "possibleUnits": [
//             "g",
//             "drink box",
//             "fl oz",
//             "oz",
//             "teaspoon",
//             "cup",
//             "serving",
//             "tablespoon"
//         ]
//     },
//     {
//         "name": "apple cider",
//         "image": "apple-cider.jpg",
//         "id": 1009016,
//         "aisle": "Beverages",
//         "possibleUnits": [
//             "g",
//             "drink box",
//             "fl oz",
//             "oz",
//             "teaspoon",
//             "bottle NFS",
//             "cup",
//             "serving",
//             "tablespoon"
//         ]
//     },
//     {
//         "name": "apple jelly",
//         "image": "apple-jelly.jpg",
//         "id": 10019297,
//         "aisle": "Nut butters, Jams, and Honey",
//         "possibleUnits": [
//             "g",
//             "oz",
//             "packet",
//             "teaspoon",
//             "cup",
//             "serving",
//             "tablespoon"
//         ]
//     }]

const recipeData = [
  {
    id: 73420,
    image: "https://spoonacular.com/recipeImages/73420-312x231.jpg",
    imageType: "jpg",
    likes: 0,
    missedIngredientCount: 3,
    missedIngredients: [
      {
        aisle: "Baking",
        amount: 1.0,
        id: 18371,
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg",
        meta: [],
        name: "baking powder",
        original: "1 tsp baking powder",
        originalName: "baking powder",
        unit: "tsp",
        unitLong: "teaspoon",
        unitShort: "tsp",
      },
      {
        aisle: "Spices and Seasonings",
        amount: 1.0,
        id: 2010,
        image: "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
        meta: [],
        name: "cinnamon",
        original: "1 tsp cinnamon",
        originalName: "cinnamon",
        unit: "tsp",
        unitLong: "teaspoon",
        unitShort: "tsp",
      },
      {
        aisle: "Milk, Eggs, Other Dairy",
        amount: 1.0,
        id: 1123,
        image: "https://spoonacular.com/cdn/ingredients_100x100/egg.png",
        meta: [],
        name: "egg",
        original: "1 egg",
        originalName: "egg",
        unit: "",
        unitLong: "",
        unitShort: "",
      },
    ],
    title: "Apple Or Peach Strudel",
    unusedIngredients: [],
    usedIngredientCount: 1,
    usedIngredients: [
      {
        aisle: "Produce",
        amount: 6.0,
        id: 9003,
        image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
        meta: [],
        name: "apples",
        original: "6 large baking apples",
        originalName: "baking apples",
        unit: "large",
        unitLong: "larges",
        unitShort: "large",
      },
    ],
  },
  {
    id: 632660,
    image: "https://spoonacular.com/recipeImages/632660-312x231.jpg",
    imageType: "jpg",
    likes: 3,
    missedIngredientCount: 4,
    missedIngredients: [
      {
        aisle: "Milk, Eggs, Other Dairy",
        amount: 1.5,
        extendedName: "unsalted butter",
        id: 1001,
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg",
        meta: ["unsalted", "cold"],
        name: "butter",
        original: "1 1/2 sticks cold unsalted butter cold unsalted butter<",
        originalName: "cold unsalted butter cold unsalted butter<",
        unit: "sticks",
        unitLong: "sticks",
        unitShort: "sticks",
      },
      {
        aisle: "Produce",
        amount: 4.0,
        id: 1079003,
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/red-delicious-apples.png",
        meta: [
          "red",
          " such as golden delicious, peeled, cored and cut into 1/4-inch-thick slices ",
        ],
        name: "red apples",
        original:
          "4 larges red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
        originalName:
          "s red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
        unit: "large",
        unitLong: "larges",
        unitShort: "large",
      },
      {
        aisle: "Spices and Seasonings",
        amount: 2.0,
        id: 2010,
        image: "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
        meta: [],
        name: "cinnamon",
        original: "2 teaspoons cinnamon",
        originalName: "cinnamon",
        unit: "teaspoons",
        unitLong: "teaspoons",
        unitShort: "tsp",
      },
      {
        aisle: "Nut butters, Jams, and Honey",
        amount: 2.0,
        id: 19719,
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/apricot-jam.jpg",
        meta: ["melted"],
        name: "apricot preserves",
        original: "2 tablespoons apricot preserves, melted and strained",
        originalName: "apricot preserves, melted and strained",
        unit: "tablespoons",
        unitLong: "tablespoons",
        unitShort: "Tbsp",
      },
    ],
    title: "Apricot Glazed Apple Tart",
    unusedIngredients: [
      {
        aisle: "Produce",
        amount: 1.0,
        id: 9003,
        image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
        meta: [],
        name: "apples",
        original: "apples",
        originalName: "apples",
        unit: "serving",
        unitLong: "serving",
        unitShort: "serving",
      },
    ],
    usedIngredientCount: 0,
    usedIngredients: [],
  },
];

function Recipes() {
  const [recipesData, setRecipesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchData = async (uid) => {
        const unsubscribe = onSnapshot(
            query(collection(db, "inventory"), where("userID", "==", uid)),
            (snapshot) => {
                const updatedInventory = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setInventory(updatedInventory);
            }
        );

        return () => unsubscribe();
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const uid = user.uid;
            fetchData(uid);
        } else {
            // User is signed out
            // Clear inventory or perform other actions as needed
            setInventory([]);
        }
    });

    return () => {
        unsubscribeAuth();
    };
}, []);

  const fetchRecipesData = (data) => {
    let recipesApi =
      "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
      data
        .map((item, key) => {
          if (key == 0) {
            return item.name.replace(/ /g, "%20");
          }
          return ",+" + item.name.replace(/ /g, "%20");
        })
        .join("") +
      "&number=5";
    const apiKey = process.env.REACT_APP_API_KEY;
    recipesApi = recipesApi + "&apiKey=" + apiKey;
    fetch(recipesApi)
      .then((response) => response.json())
      .then((data) => {
        setRecipesData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (inventory.length > 0) {
      fetchRecipesData(inventory)
      setLoading(false);
    //   setRecipesData(recipeData);
    }
  }, [inventory]);
  return (
    <div className="rcp">
      <div className="title-icon" style={{color: '#272727'}}><PiBowlFoodFill /> Recipes</div>
      <ul>
        {!recipesData.length ? (
          <div>There is no recipe yet</div>
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          recipesData.map((item, key) => <Recipe item={item} key={key} />)
        )}
      </ul>
    </div>
  );
}

export default Recipes;
