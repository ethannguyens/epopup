/**
 * Created by ethannguyen on 20/01/2016.
 */
define(['dom', 'site', 'ePopup', 'app'], function (dom, site, ePopup, app) {
    var content = '<div class="js-epopup-unit-test #popup js-popup-content"></div>';

    describe('ePopup', function () {
        beforeEach(function () {
            dom.render();
        });

        afterEach(function () {
            site.resetSiteObject();
        });

        it('should return an object', function () {
            expect(new ePopup()).toEqual(jasmine.any(Object));
        });

        describe('ePopup constructor', function () {
            it('should have necessary variables', function () {
                var popup = new ePopup('content', 'test', true, true);
                //expect([popup.popupDiv, popup.type, popup.elements, popup.screen, popup.central, popup.clone, popup.content, popup.existing]).toBeDefined();
                //expect(popup.type).toBe('string');
            });
        });

        describe('ePopup createNew', function () {
            it('should call all createNew', function () {
                spyOn(ePopup.prototype, ['createNew']).and.callThrough();
                new ePopup();
                expect(ePopup.prototype.createNew).toHaveBeenCalled();
            });
        });

        describe('ePopup methods', function () {
            it('should call all methods', function () {
                spyOn(ePopup.prototype, ['getElements']).and.callThrough();
                new ePopup();
                expect(ePopup.prototype.getElements).toHaveBeenCalled();
            });
        });

        describe('ePopup show', function () {
            it('should call show', function () {
                //A
                spyOn(ePopup.prototype, ['show']).and.callThrough();

                //A
                new ePopup();

                //A
                expect(ePopup.prototype.show).toHaveBeenCalled();
            });

            it('should add classes', function () {
                var popup = new ePopup();
                expect(app.element.hasClass('active', popup.elements.popup)).toBe(true);
                expect(app.element.hasClass('js-popup-lock', popup.elements.html)).toBe(true);
            });
        });


        describe('ePopup style', function () {
            it('should call style method', function () {
                spyOn(ePopup.prototype, ['style']).and.callThrough();
                new ePopup();
                expect(ePopup.prototype.style).toHaveBeenCalled();
            });

            it('should add styles', function () {
                var popup = new ePopup();
                expect(popup.elements.html.style.marginRight).toBeDefined();
            });
        });

        describe('ePopup closeHandler', function () {
            it('should call closeHanlder', function () {
                spyOn(ePopup.prototype, ['closeHandler']).and.callThrough();
                new ePopup();
                expect(ePopup.prototype.closeHandler).toHaveBeenCalled();
            });
        });

        describe('ePopup close', function () {
            it('should call close when click on close button', function () {
                var popup = new ePopup();
                spyOn(popup, 'close');
                var closeBtn = document.querySelector('.js-popup-close-btn');
                closeBtn.click();
                expect(popup.close).toHaveBeenCalled();
            });

            it('should call close when click on popup container', function () {
                var popup = new ePopup();
                spyOn(popup, 'close');
                var closeContainer = document.querySelector('.popup-overlay');
                closeContainer.click();
                expect(popup.close).toHaveBeenCalled();
            });

            it('should remove classes', function () {
                var popup = new ePopup();
                var closeBtn = document.querySelector('.js-popup-close-btn');
                closeBtn.click();
                expect(app.element.hasClass('active', popup.elements.popup)).toBe(false);
                expect(app.element.hasClass('js-popup-lock', popup.elements.html)).toBe(false);
                expect(app.element.hasClass('style', popup.elements.html)).toBe(false);
            });
        });

        describe('ePopup onScreenChange and Centralisation', function () {
            it('should call onScreenChange and Centralisation', function () {
                spyOn(ePopup.prototype, ['onScreenChange']).and.callThrough();
                spyOn(ePopup.prototype, ['centralisation']).and.callThrough();
                new ePopup();
                expect(ePopup.prototype.onScreenChange).toHaveBeenCalled();
                expect(ePopup.prototype.centralisation).toHaveBeenCalled();
            });
        });

    });
});
