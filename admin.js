const adminPassword = "admin"; // Simple hardcoded password

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const passwordInput = document.getElementById('password');
    const adminLogin = document.getElementById('admin-login');
    const adminPanel = document.getElementById('admin-panel');

    loginButton.addEventListener('click', () => {
        if (passwordInput.value === adminPassword) {
            adminLogin.style.display = 'none';
            adminPanel.style.display = 'block';
            loadMenuEditor();
        } else {
            alert('Incorrect password');
        }
    });

    const saveButton = document.getElementById('save-menu');
    saveButton.addEventListener('click', () => {
        saveMenu();
    });
});

function getMenu() {
    return JSON.parse(localStorage.getItem('menu'));
}

function loadMenuEditor() {
    const menu = getMenu();
    const editor = document.getElementById('menu-editor');
    editor.innerHTML = '';

    menu.categories.forEach((category, categoryIndex) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('menu-category-editor');
        
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category.name;
        categoryDiv.appendChild(categoryHeader);

        category.items.forEach((item, itemIndex) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item-editor');
            itemDiv.innerHTML = `
                <input type="text" value="${item.name}" data-category="${categoryIndex}" data-item="${itemIndex}" data-field="name">
                <input type="text" value="${item.price}" data-category="${categoryIndex}" data-item="${itemIndex}" data-field="price">
                <input type="text" value="${item.description}" data-category="${categoryIndex}" data-item="${itemIndex}" data-field="description">
                <button class="delete-item" data-category="${categoryIndex}" data-item="${itemIndex}">Delete</button>
            `;
            categoryDiv.appendChild(itemDiv);
        });

        const addItemButton = document.createElement('button');
        addItemButton.textContent = 'Add Item';
        addItemButton.classList.add('add-item');
        addItemButton.dataset.category = categoryIndex;
        categoryDiv.appendChild(addItemButton);

        editor.appendChild(categoryDiv);
    });

    const addCategoryButton = document.createElement('button');
    addCategoryButton.textContent = 'Add Category';
    addCategoryButton.id = 'add-category';
    editor.appendChild(addCategoryButton);

    editor.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-item')) {
            const categoryIndex = e.target.dataset.category;
            const itemIndex = e.target.dataset.item;
            deleteMenuItem(categoryIndex, itemIndex);
        }
        if (e.target.classList.contains('add-item')) {
            const categoryIndex = e.target.dataset.category;
            addMenuItem(categoryIndex);
        }
        if (e.target.id === 'add-category') {
            addCategory();
        }
    });
}

function saveMenu() {
    const menu = getMenu();
    const inputs = document.querySelectorAll('#menu-editor input[type="text"]');
    
    inputs.forEach(input => {
        const categoryIndex = input.dataset.category;
        const itemIndex = input.dataset.item;
        const field = input.dataset.field;

        if(menu.categories[categoryIndex] && menu.categories[categoryIndex].items[itemIndex]) {
            menu.categories[categoryIndex].items[itemIndex][field] = input.value;
        }
    });

    localStorage.setItem('menu', JSON.stringify(menu));
    alert('Menu saved!');
    loadMenuEditor();
}

function deleteMenuItem(categoryIndex, itemIndex) {
    let menu = getMenu();
    menu.categories[categoryIndex].items.splice(itemIndex, 1);
    localStorage.setItem('menu', JSON.stringify(menu));
    loadMenuEditor();
}

function addMenuItem(categoryIndex) {
    let menu = getMenu();
    menu.categories[categoryIndex].items.push({ name: "New Item", price: "Rs0.00", description: "New Description" });
    localStorage.setItem('menu', JSON.stringify(menu));
    loadMenuEditor();
}

function addCategory() {
    let menu = getMenu();
    menu.categories.push({ name: "New Category", items: [] });
    localStorage.setItem('menu', JSON.stringify(menu));
    loadMenuEditor();
}
