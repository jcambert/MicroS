import ejs from 'ejs'
import * as _ from 'lodash'
(function (w, factory) {
    "use strict";
    if(!ejs)
        throw new Error("You must import EJS first");
    if(!_)
        throw new Error("You must import lodash first");
    factory(w,ejs,_);
})(window, function (window,ejs,_) {
    "use strict";
    String.prototype.toBool = function () {
        switch (this.toLowerCase().trim()) {
            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(this);
        }
    }

    function getParams(func) {

        var str = func.toString();
        str = str.replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/(.)*/g, '')
            .replace(/{[\s\S]*}/, '')
            .replace(/=>/g, '')
            .trim();

        var start = str.indexOf("(") + 1;
        var end = str.length;
        var result = str.substring(start, end).split(",");

        var params = [];

        result.forEach(element => {
            element = element.replace(/=[\s\S]*/g, '').trim();

            if (element.length > 0)
                params.push(element);
        });
        return params;
    }
    var _guidCache = {};
    function _addGuidCache(key, value) {
        if (key == "undefined") return;
        if (!(key in _guidCache)) {
            _guidCache[key] = [];
        }
        _guidCache[key].push(value);
    }
    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        var result = _p8() + _p8(true) + _p8(true) + _p8();

        _addGuidCache(arguments[0], result);
        return result;
    }
    function ref(name) {
        var cache = _guidCache[name];
        return rnd(cache);
    }
    function rnd(min, max) {
        min=parseInt(min);max=parseInt(max);
        //console.log("RANDOM_",min,max)
        
        //console.log("RANDOM",_min,_max)
        if (isNaN(min) ) {
            //console.log(arguments[0], typeof arguments[0])
            if (_.isArray(arguments[0])) {
                let args = Array.from(arguments[0]);
                //console.log(args);
                let idx = rnd(0, args.length - 1);
                console.log("RANDOM ARRAY from 0 to",idx);
                return args[idx];
            } else {
                let args = Array.from(arguments);
                return args[rnd(0, args.length - 1)];
            }
        }
        let _min = Math.min(min || 0, max || 0), _max = Math.max(min || 0 , max || 0);
        let res = Math.random() * (_max - _min) + _min;
        return Math.round(res);
    }
    function bool() {
        return rnd(0, 1) === 0;
    }
    function range() {
        var start = parseInt(arguments[0]);
        var stop = parseInt(arguments[1] || arguments[0]);
        var _step = parseInt(arguments[2]);
        if (isNaN(_step)) _step = 1;
        if (stop == start) start = 1;
        var _start = Math.min(start, stop);
        var _stop = Math.max(start, stop);
        var result = [];


        for (var i = _start; i <= _stop; i = i + _step)result.push(i);
        return result;
    }
    function rangeRnd(min, max, n) {
        var result = [];
        for (var i = 0; i < n; i++)result.push(rnd(min, max));
        return result;
    }
    function firstname() {
        //var names = ["france", "gilbert", "pierre", "marcel", "paule"];
        console.log("DATAS",this.datas.fr)
        var names=this.datas[this.language].firstname || ["france", "gilbert", "pierre", "marcel", "paule"];
        var result = rnd(names);
        return result;
    }
    function repeat(name, from, to, content) {
       // console.log("CONTENT", content);

        var clones = [];
        //console.log("START REPEAT", name, parseInt(from), parseInt(to), content);
        for (var i = parseInt(from); i <= parseInt(to); i++) {
            var clone = Object.assign({}, content);
            //console.log('CLONE INDEX', i, " VALUE ", clone);
            var toto = {}
            this.parseTree(toto, clone);
            toto["index"]=i;
            clones.push(toto);
        }

        //console.log("END REPEAT RESULT", clones);
        return clones;
    }
    function isFunction(obj) {
        //console.log("isFunction", obj, typeof obj,typeof obj == 'function');
        return typeof obj == 'function';
    }
    function fn(name) {
        var args = Array.prototype.slice.call(arguments, 1);
        //console.log("FN ARGS", args);
        try {
            return new Function('"use strict";return (' + name + ')')().apply(this, args);
        } catch (error) {
            //console.error(`${args[0]} n'est pas une fonction`);
            //console.error(error);
            return null;
        }
    }
    function constructParams(tree, key) {
        function getFnName(key) {
            return key.split('(')[0];
        }
        var args = getParams(key);
        args.push(tree[key]);
        args.unshift(env[getFnName(key)]);
        return args
    }
    function parseTree(myresult, tree) {
        //console.log('----------- START TREE ------------');
        //console.log(tree);

        //console.log("IsFunction repeat", isFunction(env["repeat"]));
        var keys = Object.keys(tree);
        var isArray = _.isArray(myresult);
        env.datas=this.datas;
        env.language=this.language;
        //console.log("PARSE TREE RETURN TYPE IsArray:", isArray);
        var result = [];
        keys.forEach(key => {
            var args = constructParams(tree, key);

            var res = fn.apply(env, args);
            var name = args[1]; //(res == null) ? args[1] :key;// args[0] == "repeat" ? args[1] : key;//args[0];
            //console.log("TREE RES",res);
            //console.log("TREE kEY", key, "TREE ARGS", args);
            //console.log("REAL KEY", name);
            if (res != null) {
                //console.log("ADD NON NULL", res, ejs.render(JSON.stringify(res), env));
                isArray ? result.push(res) : myresult[name] = res;
            } else {
                
                if (isFunction(tree[key])) {
                    //console.log("TREE VALUE IS FUNCTION", name, " CALLING FUNCTION");
                    isArray ? result.push({ key: tree[name](myresult) }) : myresult[name] = tree[name](myresult);
                } else {
                    if (isArray) {
                        //console.log("ADD TREE VALUE IN Array", tree[name]);
                        myresult.push(tree[name])
                    } else {
                        //console.log("ADD TREE VALUE IN NON Array", args[0], name, tree[name], "TEST");
                        myresult[name] = ejs.render(tree[name], env);
                    }
                }
            }
            //result.push(v);
            //console.log("RESULT", myresult);
        });
        console.log('----------- END TREE ------------');
        console.log("RESULT", myresult);
        return myresult;
    }

    var env = { "parseTree": parseTree,"ref":ref, "guid": guid, "rnd": rnd, "bool": bool, "range": range, "rangeRnd": rangeRnd, "firstname": firstname, "repeat": repeat };
    class WeMock {
        #version = "1.0.1";
        #lang;
        #datas;
        constructor() {
            this.#lang = navigator.language;
            console.log(`WeMock ${this.#version} Started`);
        }

        get version() {
            return this.#version;
        }

        get language() {
            return this.#lang;
        }

        set language(value) {
            this.#lang = value;
        }

        set datas(value){
            this.#datas=value;
            console.log("set datas",value);
        }

        get datas(){
            return this.#datas;
        }
        render(template) {
            var result = {};
            return this.parseTree(result, template);
            //return result;

        }
    }
    window.wemock = new WeMock();
    //var env = { "parseTree": parseTree,"ref":ref, "guid": guid, "rnd": rnd, "bool": bool, "range": range, "rangeRnd": rangeRnd, "firstname": firstname, "repeat": repeat };
    window.wemock.__proto__.parseTree=parseTree;
});