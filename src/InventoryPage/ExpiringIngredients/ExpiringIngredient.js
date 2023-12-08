import React, { useState } from "react";

function ExpiringIngredient({ item, handleDelete }) {
  const [isExpired, setIsExpired] = useState(false);
  console.log(item)

  function mapExpiryDate(expiryDate) {
    const date = new Date(
      expiryDate.seconds * 1000 + expiryDate.nanoseconds / 1000000
    );
    const now = new Date();

    const diffInTime = date.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) {
      return { status: "Expired", daysLeft: 0 };
    } else if (diffInDays === 0) {
      return { status: "Expiring today", daysLeft: 0 };
    } else {
      return { status: "Expiring soon", daysLeft: diffInDays };
    }
  }


  const listItem = {
    margin: "5px",
    padding: "5px",
  };

  const deleteLink = {
    color: "#FF5A5F",
    cursor: "pointer",
  };

  return (
    <li className="exp-li">
            <p style={listItem}>{item.name}</p>
            {mapExpiryDate(item.expiryDate).status === " - Expired" ? (
                <p style={listItem}>
                Already expired!{" "}
                <a style={deleteLink} onClick={() => handleDelete(item.id)} href="#">
                    Delete the ingredient?
                </a>
                </p>
            ) : (
                <p style={listItem}>
                {mapExpiryDate(item.expiryDate).status === "Expiring today"
                    ? "- Expiring today"
                    : ` - Expiring in ${mapExpiryDate(item.expiryDate).daysLeft} days`}
                </p>
            )}
        
    </li>
  );
}

export default ExpiringIngredient;
