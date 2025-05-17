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