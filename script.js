const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');

const richestCountries = [
    'Qatar',
    'Macao',
    'Luxembourg',
    'Singapore',
    'Ireland',
    'Brunei Darussalam',
    'Norway',
    'UAE',
    'Kuwait',
    'Switzerland'
];

// Store the list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
    [...richestCountries]
        .map(country => ({value: country, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(objectCountry => objectCountry.value)
        .forEach((country, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="country-name">${country}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;
            listItems.push(listItem);

            draggableList.appendChild(listItem);
    });

    addEventAllListeners();
};

function dragStart() {
    // console.log('dragStart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
};

function dragOver(e) {
    // console.log('dragOver');
    e.preventDefault();
};

function dragDrop() {
    // console.log('dragDrop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
};

function dragEnter() {
    // console.log('dragEnter');
    this.classList.add('over');
};

function dragLeave() {
    // console.log('dragLeave');
    this.classList.remove('over');
};

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
};

function checkOrder() {
    listItems.forEach((item, index) => {
        const country = item.querySelector('.draggable').innerText.trim();
        if(country !== richestCountries[index]) {
            item.classList.remove('right');
            item.classList.add('wrong');
        } else {
            item.classList.remove('wrong');
            item.classList.add('right');
        }
    })
}

// Event listeners
function addEventAllListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const draggableListItems = document.querySelectorAll('li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    draggableListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });

};

checkBtn.addEventListener('click', checkOrder)