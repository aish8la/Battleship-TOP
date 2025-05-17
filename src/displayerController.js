const elements = {
    body: document.querySelector('body'),
}

function elementGenerator(type, attr = {}, textContent) {
    const newElmt = document.createElement(type);
    newElmt.textContent = textContent;

    for( const key of Object.keys(attr) ) {
        newElmt.setAttribute(key, attr[key]);
    }
    
    return newElmt;
}

function removeElement(selector) {
    const target = elements.body.querySelector(selector);
    if(target) {
        elements.body.removeChild(target);
    }
}

export function renderHome() {
    const wrapper = elementGenerator("div", {"class": "wrapper", "id": "home-screen"});
    const title = elementGenerator("h1", {}, "Battleship");
    const menu = elementGenerator("div", {"id": "menu-ctn"});
    const button1 = elementGenerator("button", {"id": "single-player", "class": "home-screen-btn"}, "Single Player");
    const button2 = elementGenerator("button", {"id": "two-player", "class": "home-screen-btn"}, "2 Player");

    menu.appendChild(button1);
    menu.appendChild(button2);
    wrapper.appendChild(title);
    wrapper.appendChild(menu);
    elements.body.appendChild(wrapper);
}