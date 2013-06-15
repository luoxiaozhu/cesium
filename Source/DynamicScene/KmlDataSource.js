/*global define*/
define(['../Core/DeveloperError'
        ], function(
                DeveloperError) {
    "use strict";

    function throwInstantiationError() {
        throw new DeveloperError('This type should not be instantiated directly.');
    }

    /**
     * Defines the interface for data sources, which turn arbitrary data into a
     * {@link DynamicObjectCollection} for generic consumption. This object is an interface
     * for documentation purposes and is not intended to be instantiated directly.
     * @alias KmlDataSource
     * @constructor
     */
    var KmlDataSource = throwInstantiationError;

    /**
     * Gets an event that will be raised when non-time-Varying data changes
     * or if the return value of getIsTimeVarying changes.
     * @memberof KmlDataSource
     *
     * @returns {Event} The event.
     */
    KmlDataSource.prototype.getChangedEvent = throwInstantiationError;

    /**
     * Gets an event that will be raised if an error is encountered during processing.
     * @memberof KmlDataSource
     *
     * @returns {Event} The event.
     */
    KmlDataSource.prototype.getErrorEvent = throwInstantiationError;

    /**
     * Gets the top level clock associated with this data source, or undefined if no clock exists.
     * @memberof KmlDataSource
     *
     * @returns {DynamicClock} The clock associated with this data source, or undefined if none exists.
     */
    KmlDataSource.prototype.getClock = throwInstantiationError;

    /**
     * Gets the DynamicObjectCollection generated by this data source.
     * @memberof KmlDataSource
     *
     * @returns {DynamicObjectCollection} The collection of objects generated by this data source.
     */
    KmlDataSource.prototype.getDynamicObjectCollection = throwInstantiationError;

    /**
     * Gets a value indicating if the data varies with simulation time.  If the return value of
     * this function changes, the changed event will be raised.
     * @memberof KmlDataSource
     *
     * @returns {Boolean} True if the data is varies with simulation time, false otherwise.
     */
    KmlDataSource.prototype.getIsTimeVarying = throwInstantiationError;

    return KmlDataSource;
});