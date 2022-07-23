export const createElement = (
    htmlSelector = "div",
    className = "",
    idName = "",
    content = ""
) => {
    const element = document.createElement(htmlSelector);

    element.innerHTML = content;
    element.className = className;

    if (idName.length === 0) return element;

    element.id = idName;

    return element;
};

export const wrapElement = (
    domElement,
    wrapperHtmlSelector = "div",
    wrapperClass = "",
    wrapperID = ""
) => {
    const wrapper = createElement(
        wrapperHtmlSelector,
        wrapperClass,
        wrapperID,
        domElement.outerHTML
    );

    domElement.outerHTML = wrapper.outerHTML;
};
