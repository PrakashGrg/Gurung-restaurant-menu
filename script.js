
const menuData = {
    categories: [
        {
            name: "Starters",
            items: [
                { name: "Momo", price: "Rs5.99", description: "Steamed dumplings filled with seasoned vegetables or meat." },
                { name: "Samosa", price: "Rs3.99", description: "Crispy pastry filled with spiced potatoes and peas." }
            ]
        },
        {
            name: "Main Course",
            items: [
                { name: "Dal Bhat", price: "Rs12.99", description: "Traditional Nepali meal with lentil soup, rice, and vegetable curry." },
                { name: "Thukpa", price: "Rs10.99", description: "Hearty noodle soup with vegetables or meat." }
            ]
        },
        {
            name: "Drinks",
            items: [
                { name: "Nepali Tea", price: "Rs2.50", description: "Spiced milk tea." },
                { name: "Lassi", price: "Rs3.50", description: "Yogurt-based drink, sweet or salty." }
            ]
        },
        {
            name: "Desserts",
            items: [
                { name: "Yomari", price: "Rs6.50", description: "Sweet steamed dumplings filled with molasses." },
                { name: "Juju Dhau", price: "Rs4.50", description: "Sweetened custard-like yogurt." }
            ]
        }
    ]
};

function initMenu() {
    if (localStorage.getItem('menu') === null) {
        localStorage.setItem('menu', JSON.stringify(menuData));
    }
}

function getMenu() {
    return JSON.parse(localStorage.getItem('menu'));
}


document.addEventListener('DOMContentLoaded', () => {


    initMenu();


    populateFilters();


    displayMenu();





    const filtersDiv = document.getElementById('menu-filters');


    filtersDiv.addEventListener('click', (e) => {


        if (e.target.classList.contains('filter-button')) {


            const filter = e.target.dataset.category;


            displayMenu(filter);





            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));


            e.target.classList.add('active');


        }


    });


});





function populateFilters() {


    const menu = getMenu();


    const filtersDiv = document.getElementById('menu-filters');


    menu.categories.forEach(category => {


        const button = document.createElement('button');


        button.classList.add('filter-button');


        button.dataset.category = category.name;


        button.textContent = category.name;


        filtersDiv.appendChild(button);


    });


}





function displayMenu(filter = 'all') {


    const menu = getMenu();


    const menuCategoriesDiv = document.getElementById('menu-categories');


    menuCategoriesDiv.innerHTML = '';





    const categoriesToDisplay = menu.categories.filter(category => filter === 'all' || category.name === filter);





    categoriesToDisplay.forEach(category => {


        const categoryDiv = document.createElement('div');


        categoryDiv.classList.add('menu-category');





        const categoryTitle = document.createElement('h3');


        categoryTitle.textContent = category.name;


        categoryDiv.appendChild(categoryTitle);





        const itemsList = document.createElement('ul');


        category.items.forEach(item => {


            const listItem = document.createElement('li');


            listItem.innerHTML = `


                <div class="item-name">${item.name}</div>


                <div class="item-price">${item.price}</div>


                <div class="item-description">${item.description}</div>


            `;


            itemsList.appendChild(listItem);


        });





        categoryDiv.appendChild(itemsList);


        menuCategoriesDiv.appendChild(categoryDiv);


    });


}
