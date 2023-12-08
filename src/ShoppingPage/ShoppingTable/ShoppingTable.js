import React, { useState, useEffect } from "react";
import ShoppingRow from "./ShoppingRow";
import { db, auth } from '../../firebase'
import { collection, getDocs, onSnapshot, where, query, deleteDoc, doc } from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth'

const tableStyle = {
    margin: "auto", // Center the table horizontally
    marginTop: "50px", // Add space at the top
    width: "70%", // Set width of the table
};

function ShoppingTable() {
    const headers = ["Product", "Quantity"];
    const [data, setData] = useState([])
    
    useEffect(() => {
        const fetchData = async (uid) => {
            const unsubscribe = onSnapshot(
                query(collection(db, "shoppingList"), where("userID", "==", uid)),
                (snapshot) => {
                    const updatedShoppingList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    setData(updatedShoppingList);
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
                setData([]);
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, []);

    const deleteShoppingList = async (id) => {
        await deleteDoc(doc(db, "shoppingList", id));
        setData(prev => prev.filter(item => item.id !== id))
    }

    return (
        <div style={tableStyle}>
            <table style={{ width: "100%" }} className="sb-table" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th></th>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <ShoppingRow
                            key={index}
                            item={item}
                            deleteShoppingList={deleteShoppingList}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShoppingTable;
