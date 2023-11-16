document.addEventListener("DOMContentLoaded", function () {
    const mealsContainer = document.getElementById("meals");
    const cartItems = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total");

    // Obtener comidas de la API MealDB
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=c")
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            // Mostrar comidas en la página
            meals.forEach(meal => {
                const mealElement = createMealElement(meal);
                mealsContainer.appendChild(mealElement);
            });
        })
        .catch(error => console.error("Error fetching meals:", error));

    // Función para crear un elemento de comida
    function createMealElement(meal) {
        const mealElement = document.createElement("div");
        mealElement.classList.add("meal");
        mealElement.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h3>${meal.strMeal}</h3>
            <p>Precio: $${(Math.random() * 10 + 5).toFixed(2)}</p>
            <button onclick="addToCart('${meal.strMeal}', ${(Math.random() * 10 + 5).toFixed(2)})">Agregar al carrito</button>
        `;
        return mealElement;
    }

    // Función para agregar productos al carrito
    window.addToCart = function (itemName, price) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${itemName} - $${price}</p>
        `;
        cartItems.appendChild(cartItem);

        // Actualizar el total
        const currentTotal = parseFloat(totalAmount.innerText);
        totalAmount.innerText = (currentTotal + price).toFixed(2);
    };

    // Función para simular el proceso de pago
    window.checkout = function () {
        const cartItemsList = document.querySelectorAll(".cart-item");
        if (cartItemsList.length > 0) {
            alert("¡Pago realizado con éxito!");
            // Puedes agregar aquí la lógica para procesar el pago en el servidor
        } else {
            alert("El carrito está vacío. Agrega productos antes de realizar el pago.");
        }
    };
});