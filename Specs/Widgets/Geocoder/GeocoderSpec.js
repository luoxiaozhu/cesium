/*global defineSuite*/
defineSuite([
        'Widgets/Geocoder/Geocoder',
        'Specs/createScene'
    ], function(
        Geocoder,
        createScene) {
    'use strict';

    var scene;
    var customGeocoderOptions = {
        geocode : function (input, callback) {
            callback(undefined, ['a', 'b', 'c']);
        },
        getSuggestions : function (input) {
            return ['a', 'b', 'c'];
        }
    };
    beforeEach(function() {
        scene = createScene();
    });

    afterEach(function() {
        scene.destroyForSpecs();
    });

    it('constructor sets expected properties', function() {
        var flightDuration = 1234;
        var url = 'bing.invalid/';
        var key = 'testKey';

        var geocoder = new Geocoder({
            container : document.body,
            scene : scene,
            flightDuration : flightDuration,
            url : url,
            key : key
        });

        var viewModel = geocoder.viewModel;
        expect(viewModel.scene).toBe(scene);
        expect(viewModel.flightDuration).toBe(flightDuration);
        expect(viewModel.url).toBe(url);
        expect(viewModel.key).toBe(key);
        geocoder.destroy();
    });

    it('can create and destroy', function() {
        var container = document.createElement('div');
        container.id = 'testContainer';
        document.body.appendChild(container);

        var widget = new Geocoder({
            container : 'testContainer',
            scene : scene
        });
        expect(widget.container).toBe(container);
        expect(widget.isDestroyed()).toEqual(false);
        expect(container.children.length).not.toEqual(0);
        widget.destroy();
        expect(container.children.length).toEqual(0);
        expect(widget.isDestroyed()).toEqual(true);

        document.body.removeChild(container);
    });

    it('constructor throws with no scene', function() {
        expect(function() {
            return new Geocoder({
                container : document.body
            });
        }).toThrowDeveloperError();
    });

    it('constructor throws with no element', function() {
        expect(function() {
            return new Geocoder({
                scene : scene
            });
        }).toThrowDeveloperError();
    });

    it('constructor throws with string element that does not exist', function() {
        expect(function() {
            return new Geocoder({
                container : 'does not exist',
                scene : scene
            });
        }).toThrowDeveloperError();
    });

    it('automatic suggestions can be navigated by arrow up/down keys', function() {
        var container = document.createElement('div');
        container.id = 'testContainer';
        document.body.appendChild(container);
        var geocoder = new Geocoder({
            container : 'testContainer',
            scene : scene,
            customGeocoder : customGeocoderOptions
        });
        var viewModel = geocoder._viewModel;
        viewModel._searchText = 'some_text';
        viewModel.updateSearchSuggestions();

        expect(viewModel._selectedSuggestion()).toEqual(undefined);
        viewModel.handleArrowDown();
        expect(viewModel._selectedSuggestion()).toEqual('a');
        viewModel.handleArrowDown();
        viewModel.handleArrowDown();
        expect(viewModel._selectedSuggestion()).toEqual('c');
        viewModel.handleArrowDown();
        expect(viewModel._selectedSuggestion()).toEqual('a');
        viewModel.handleArrowUp();
        expect(viewModel._selectedSuggestion()).toEqual('c');
        viewModel.handleArrowUp();
        expect(viewModel._selectedSuggestion()).toEqual('b');
    });

}, 'WebGL');
