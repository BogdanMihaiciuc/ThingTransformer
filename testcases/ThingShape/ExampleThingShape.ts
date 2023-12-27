/**
 * This example class demonstrates how Thing Shapes are created.
 *
 * Thing shapes are classes that extend from the `ThingShapeBase` class; they follow
 * the same general rules as things.
 */
@exportName('ExampleThingShape')
class ExampleThingShape extends ThingShapeBase {
    /**
     * Thingworx type names are also supported and can be used interchangeably. Note that some Thingworx
     * types such as `INTEGER` map to primitive types like `number` on the compiler side but may have additional
     * semantics or behaviours at runtime.
     */
    @dataChangeType('VALUE', 0)
    @remote('humidity', { pushThreshold: 0, foldType: 'NONE', timeout: 0, pushType: 'VALUE' })
    humidity!: NUMBER;

    /**
     * For most types, the standard TypeScript types such as `string` and `number` can be used.
     */
    @persistent
    @logged
    @dataChangeType('VALUE', 0)
    pressure: NUMBER = 10;

    @remoteService('SetHumidity', { timeout: 0 })
    SetHumidity({ humidity }: { humidity: NUMBER }): NOTHING {}

    /**
     * In addition to specifying the types of each parameter as a literal type, interfaces may also be used.
     */
    GetStatusResponse({ humidity, pressure }: { humidity: NUMBER; pressure: NUMBER }): TWJSON {
        return { pressure: pressure, humidity: humidity };
    }

    /**
     * With TypeScript, it is possible to user certain newer javascript features through transpilation.
     */
    PrintValuesWithFactor({ factor = 1 }: { factor?: NUMBER }): NOTHING {
        var __values =
            (this && this.__values) ||
            function (o) {
                var s = typeof Symbol === 'function' && Symbol.iterator,
                    m = s && o[s],
                    i = 0;
                if (m) return m.call(o);
                if (o && typeof o.length === 'number')
                    return {
                        next: function () {
                            if (o && i >= o.length) o = void 0;
                            return { value: o && o[i++], done: !o };
                        },
                    };
                throw new TypeError(s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
            };

        var __spreadArray =
            (this && this.__spreadArray) ||
            function (to, from, pack) {
                if (pack || arguments.length === 2)
                    for (var i = 0, l = from.length, ar; i < l; i++) {
                        if (ar || !(i in from)) {
                            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                            ar[i] = from[i];
                        }
                    }
                return to.concat(ar || Array.prototype.slice.call(from));
            };

        var __read =
            (this && this.__read) ||
            function (o, n) {
                var m = typeof Symbol === 'function' && o[Symbol.iterator];
                var i = m ? m.call(o) : __values(o),
                    r,
                    ar = [],
                    e;
                try {
                    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
                } catch (error) {
                    e = { error: error };
                } finally {
                    try {
                        if (r && !r.done && (m = i['return'])) m.call(i);
                    } finally {
                        if (e) throw e.error;
                    }
                }
                return ar;
            };

        var __assign =
            (this && this.__assign) ||
            function () {
                __assign =
                    Object.assign ||
                    function (t) {
                        for (var s, i = 1, n = arguments.length; i < n; i++) {
                            s = arguments[i];
                            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                        }
                        return t;
                    };
                return __assign.apply(this, arguments);
            };
        var e_1, _a;
        // An example is destructuring objects into variables
        var _b = this.GetValuesWithFactor({ factor: factor }),
            pressure = _b.pressure,
            humidity = _b.humidity;
        // Template literals are another feature that is very useful
        logger.info('The pressure is '.concat(pressure, ' and the humidity is ').concat(humidity));
        try {
            // We can also the new for...of syntax for easier looping
            for (var _c = __values(ThingTemplates.GenericThing.GetImplementingThings()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                logger.info('Thing is '.concat(row.name));
            }
        } catch (e_1_1) {
            e_1 = { error: e_1_1 };
        } finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            } finally {
                if (e_1) throw e_1.error;
            }
        }
        // We can also easily convert infotables to arrays via the spread syntax
        var things = __spreadArray([], __read(ThingTemplates.GenericThing.GetImplementingThings()), false)
            .map(function (row) {
                return Things[row.name];
            })
            .filter(function (thing) {
                return thing.IsEnabled();
            });
        things.forEach(function (thing) {
            return logger.info('Thing '.concat(thing.name, "'s template is ").concat(thing.GetThingTemplate()));
        });
        // And easily combine object literals
        var allValues = __assign(__assign({}, this.GetValuesWithFactor({ factor: factor })), { altitude: 0 });
    }

    GetPressure(): NUMBER {
        return this.pressure;
    }

    /**
     * There are no interface types in Thingworx, but in a similar manner to string and number types,
     * we can constrain the JSON (renamed to TWJSON to avoid conflicts with the standard JSON global) type
     * to another interface via generics.
     *
     * Any JSDoc tags used will be converted into thingworx descriptions.
     */
    GetValuesWithFactor({ factor = 1 }: { factor?: NUMBER }): TWJSON {
        return { pressure: factor * this.pressure, humidity: factor * this.humidity };
    }

    SetPressure({ pressure }: { pressure: NUMBER }): NOTHING {
        this.pressure = pressure;
    }
}
