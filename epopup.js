/**
 * Created by ethannguyen on 01/12/2016.
 */

class epopup {
    constructor(content, styleClass, central, clone) {
        this.central = central;
        this.type = typeof(content);
        this.className = styleClass;
        this.popupDiv = `<div id='popup' class='popup-overlay popupOverlay'>
                            <div class='js-popup-container popupContainer'>
                                <div class='popup-close js-popup-close-btn'></div>
                                <div class='js-popup-content popupContent'></div>
                            </div>
                        </div>`;


        this.existing = (document.querySelector('#popup')) ? true : false;
        if (!this.existing) this.createNew();
        this.elements = this.getElements();
        this.screen = this.getScreenSize();
        this.content = this.getContent(content, clone);

        this.insertContent();
        this.show();
        this.style();
        this.centralisation();
        this.onScreenChange();
        this.closeHandler();
    }

    /**
     * Create new ePopup
     */
    createNew() {
        document.body.insertAdjacentHTML('beforeend', this.popupDiv);
    }

    /**
     * Get popup content
     * @param content
     * @param clone
     * @returns {*}
     */
    getContent(content, clone) {
        if (this.type !== 'string' && clone) return content.cloneNode(true);
        else return content;
    }

    /**
     * Get ePopup elements
     * @returns {{html: Element, popup: Element, content: Element, container: Element}}
     */
    getElements() {
        return {
            html: document.documentElement,
            popup: document.querySelector('#popup'),
            content: document.querySelector('.js-popup-content'),
            container: document.querySelector('.js-popup-container')
        };
    }

    /**
     * Get device width and height
     * @returns {{width: number, height: number}}
     */
    getScreenSize() {
        return {
            width: this.elements.html.clientWidth,
            height: this.elements.html.clientHeight
        };
    }

    /**
     * Insert ePopup content
     */
    insertContent() {
        if (this.existing) this.clearContent();

        if (this.className) this.elements.popup.classList.add(this.className);

        if (this.content) {
            if (this.type === 'string') this.elements.content.innerHTML = this.content;
            else this.elements.content.appendChild(this.content);
        }
    }

    /**
     * Clear ePopup content
     */
    clearContent() {
        this.elements.popup.className = 'popup-overlay popupOverlay';
        this.elements.content.innerHTML = '';
    }

    /**
     * Show ePopup
     */
    show() {
        app.element.addClass('active', this.elements.popup);
        app.element.addClass('js-popup-lock', this.elements.html);
    }

    /**
     * Style for IE with scroll bar
     */
    style() {
        const newScreenWidth = this.elements.html.clientWidth;
        const scrollBarWidth = this.screen.width - newScreenWidth;

        this.elements.html.style.marginRight = `${scrollBarWidth} px`;
    }

    /**
     * Centralise ePopup
     */
    centralisation() {
        let screenHeight = this.elements.html.clientHeight;
        let popupHeight = this.elements.container.clientHeight;
        let centerTop = ((1 - (popupHeight / screenHeight)) / 2) * 100;

        if (centerTop > 0) this.elements.container.style.top = centerTop + '%';
    }

    /**
     * Detect and centralise ePopup when screen change
     */
    onScreenChange() {
        const SELF = this;

        window.onresize = () => {
            SELF.centralisation();
        };
    }

    /**
     * ePopup close button event handler
     */
    closeHandler() {
        const SELF = this;

        document.onclick = (event) => {
            const target = event.target;
            if (target.querySelector('.js-popup-container') || app.element.hasClass('js-popup-close-btn', target)) {
                SELF.close();
                app.publish('epopup/default-close');
            }
        };

    }

    /**
     * Close the popup
     */
    close() {
        app.element.removeClass('active', this.elements.popup);
        app.element.removeClass('js-popup-lock', this.elements.html);
        app.element.removeAttribute('style', this.elements.html);
    }

}

