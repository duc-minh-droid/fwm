**Google DevFest Group 7 Project: Food Waste Management Website**

By Thomas and Aria

--------------------------------------------------------------

The product: <a href="https://gregarious-puppy-922937.netlify.app/" target="_blank">WasteLess</a>

--------------------------------------------------------------

This project provides a website in which the user takes inventory of their food and charts what else they can buy to make efficient recipes. This is done with the aim of minimising food leftovers and therefore minimising the amount of product that would otherwise release methane into the atmosphere when left to landfill.

The website boasts a sleek design as well as a feature to indicate local food bank. They redistribute excess food to those less fortunate, as well as boast educational/awareness initiatives.

--------------------------------------------------------------

Tech Used:
The Frontend is handled by React and Firebase

--------------------------------------------------------------

Instructions to run project locally:

1. Fork the project
2. Run <code>npm i</code> in the terminal
3. Run <code>npm start</code>

--------------------------------------------------------------

How to use the website:

The Landing page:

<img width="455" alt="landing1" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/9377b374-dfca-4d03-b5e0-720322c1189d">
<br>
<img width="455" alt="landing2" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/db7d6381-4404-4d3d-a4a5-76b223453645">
<br>
The user is met with the landing page upon opening the page. This outlines the directives the website follows and the tasks the user is able to perform. the bar along the top allows the user to flip between pages
<br>
<img width="52" alt="signin" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/be63e404-df68-44dc-bfd4-b6757114f4cb">
<br>
<img width="317" alt="signin2" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/33d83fb2-a450-4dcc-b6e4-06485b94ff4c">
<br>
Users must also be authorised; as such, we've implemented firebase and google authentication to ensure user security
<br>

The Inventory Page:

<img width="627" alt="inventory" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/3d34c15c-9c5e-4b73-b818-d9422269e54f">
<br>
When opening the inventory segment, the user is met with an empty inventory box and a search bar.
<br>
<img width="153" alt="inventory2" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/65b33512-01c4-48dd-aca0-0cd6e5123d77">
<br>
<img width="616" alt="inventory3" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/9c3bdd3b-07cb-47ad-9089-5964af571ff7">
<br>
Users must search for the items they currently possess and them to their inventory. Relevant recipes will then begin to appear.
<br>
<img width="503" alt="inventory4" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/ccfc69c0-3b66-440f-95d8-3fc6c0bd03e5">
<br>
<img width="430" alt="inventory5" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/75c89d57-e942-4f11-9bf3-8b04e30fbcc8">
<br>
Users must also specify the date of expiry of the items; this will help in determining the timescale and when to prepare what meal.
<br>
<img width="781" alt="recipes" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/86f0f0d3-c5fb-4421-8abc-40d992e53767">
<br>
Clicking on any of the recipes that appear will take you to a page, outlining the dish contents as well as providing a link to the instructions.
<br>
<br>

The Shopping Page:

<img width="616" alt="shopping1" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/3ff971d0-35df-442f-8d82-22a51902a28d">
<br>
Intended for use once the inventory has been stored and the recipes have been chosen, the shopping page is where the user can search for those missing ingredients. The green icon next to each item indicates that it has been saved to the user's food database.
<br>
<img width="592" alt="shopping2" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/c3957a62-aaad-4614-8154-ac923d2f23e3">
<br>
Once an item in the list has been collected, the user can promptly tick the corresponding box and subsequently remove the item from the list...
<br>
<img width= "575" alt="shopping3" src="https://github.com/duc-minh-droid/food-waste-management-website/assets/111776997/51625f21-e421-4793-8c64-9c2034bc3777">
<br>
... Leaving the list decremented by 1. The item removed from the shopping list gets added to the inventory list.
<br>

--------------------------------------------------------------

[![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE)

BSD 3-Clause "New" or "Revised" License: https://github.com/django/django/blob/main/LICENSE
