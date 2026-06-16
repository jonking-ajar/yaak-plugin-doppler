//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let node_fs = require("node:fs");
node_fs = __toESM(node_fs);
let node_path = require("node:path");
node_path = __toESM(node_path);
let node_child_process = require("node:child_process");
node_child_process = __toESM(node_child_process);

//#region node_modules/.pnpm/clone@2.1.2/node_modules/clone/clone.js
var require_clone = /* @__PURE__ */ __commonJS({ "node_modules/.pnpm/clone@2.1.2/node_modules/clone/clone.js": ((exports, module) => {
	var clone = (function() {
		function _instanceof(obj, type) {
			return type != null && obj instanceof type;
		}
		var nativeMap;
		try {
			nativeMap = Map;
		} catch (_) {
			nativeMap = function() {};
		}
		var nativeSet;
		try {
			nativeSet = Set;
		} catch (_) {
			nativeSet = function() {};
		}
		var nativePromise;
		try {
			nativePromise = Promise;
		} catch (_) {
			nativePromise = function() {};
		}
		/**
		* Clones (copies) an Object using deep copying.
		*
		* This function supports circular references by default, but if you are certain
		* there are no circular references in your object, you can save some CPU time
		* by calling clone(obj, false).
		*
		* Caution: if `circular` is false and `parent` contains circular references,
		* your program may enter an infinite loop and crash.
		*
		* @param `parent` - the object to be cloned
		* @param `circular` - set to true if the object to be cloned may contain
		*    circular references. (optional - true by default)
		* @param `depth` - set to a number if the object is only to be cloned to
		*    a particular depth. (optional - defaults to Infinity)
		* @param `prototype` - sets the prototype to be used when cloning an object.
		*    (optional - defaults to parent prototype).
		* @param `includeNonEnumerable` - set to true if the non-enumerable properties
		*    should be cloned as well. Non-enumerable properties on the prototype
		*    chain will be ignored. (optional - false by default)
		*/
		function clone$1(parent, circular, depth, prototype, includeNonEnumerable) {
			if (typeof circular === "object") {
				depth = circular.depth;
				prototype = circular.prototype;
				includeNonEnumerable = circular.includeNonEnumerable;
				circular = circular.circular;
			}
			var allParents = [];
			var allChildren = [];
			var useBuffer = typeof Buffer != "undefined";
			if (typeof circular == "undefined") circular = true;
			if (typeof depth == "undefined") depth = Infinity;
			function _clone(parent$1, depth$1) {
				if (parent$1 === null) return null;
				if (depth$1 === 0) return parent$1;
				var child;
				var proto;
				if (typeof parent$1 != "object") return parent$1;
				if (_instanceof(parent$1, nativeMap)) child = new nativeMap();
				else if (_instanceof(parent$1, nativeSet)) child = new nativeSet();
				else if (_instanceof(parent$1, nativePromise)) child = new nativePromise(function(resolve, reject) {
					parent$1.then(function(value) {
						resolve(_clone(value, depth$1 - 1));
					}, function(err) {
						reject(_clone(err, depth$1 - 1));
					});
				});
				else if (clone$1.__isArray(parent$1)) child = [];
				else if (clone$1.__isRegExp(parent$1)) {
					child = new RegExp(parent$1.source, __getRegExpFlags(parent$1));
					if (parent$1.lastIndex) child.lastIndex = parent$1.lastIndex;
				} else if (clone$1.__isDate(parent$1)) child = new Date(parent$1.getTime());
				else if (useBuffer && Buffer.isBuffer(parent$1)) {
					if (Buffer.allocUnsafe) child = Buffer.allocUnsafe(parent$1.length);
					else child = new Buffer(parent$1.length);
					parent$1.copy(child);
					return child;
				} else if (_instanceof(parent$1, Error)) child = Object.create(parent$1);
				else if (typeof prototype == "undefined") {
					proto = Object.getPrototypeOf(parent$1);
					child = Object.create(proto);
				} else {
					child = Object.create(prototype);
					proto = prototype;
				}
				if (circular) {
					var index = allParents.indexOf(parent$1);
					if (index != -1) return allChildren[index];
					allParents.push(parent$1);
					allChildren.push(child);
				}
				if (_instanceof(parent$1, nativeMap)) parent$1.forEach(function(value, key) {
					var keyChild = _clone(key, depth$1 - 1);
					var valueChild = _clone(value, depth$1 - 1);
					child.set(keyChild, valueChild);
				});
				if (_instanceof(parent$1, nativeSet)) parent$1.forEach(function(value) {
					var entryChild = _clone(value, depth$1 - 1);
					child.add(entryChild);
				});
				for (var i in parent$1) {
					var attrs;
					if (proto) attrs = Object.getOwnPropertyDescriptor(proto, i);
					if (attrs && attrs.set == null) continue;
					child[i] = _clone(parent$1[i], depth$1 - 1);
				}
				if (Object.getOwnPropertySymbols) {
					var symbols = Object.getOwnPropertySymbols(parent$1);
					for (var i = 0; i < symbols.length; i++) {
						var symbol = symbols[i];
						var descriptor = Object.getOwnPropertyDescriptor(parent$1, symbol);
						if (descriptor && !descriptor.enumerable && !includeNonEnumerable) continue;
						child[symbol] = _clone(parent$1[symbol], depth$1 - 1);
						if (!descriptor.enumerable) Object.defineProperty(child, symbol, { enumerable: false });
					}
				}
				if (includeNonEnumerable) {
					var allPropertyNames = Object.getOwnPropertyNames(parent$1);
					for (var i = 0; i < allPropertyNames.length; i++) {
						var propertyName = allPropertyNames[i];
						var descriptor = Object.getOwnPropertyDescriptor(parent$1, propertyName);
						if (descriptor && descriptor.enumerable) continue;
						child[propertyName] = _clone(parent$1[propertyName], depth$1 - 1);
						Object.defineProperty(child, propertyName, { enumerable: false });
					}
				}
				return child;
			}
			return _clone(parent, depth);
		}
		/**
		* Simple flat clone using prototype, accepts only objects, usefull for property
		* override on FLAT configuration object (no nested props).
		*
		* USE WITH CAUTION! This may not behave as you wish if you do not know how this
		* works.
		*/
		clone$1.clonePrototype = function clonePrototype(parent) {
			if (parent === null) return null;
			var c = function() {};
			c.prototype = parent;
			return new c();
		};
		function __objToStr(o) {
			return Object.prototype.toString.call(o);
		}
		clone$1.__objToStr = __objToStr;
		function __isDate(o) {
			return typeof o === "object" && __objToStr(o) === "[object Date]";
		}
		clone$1.__isDate = __isDate;
		function __isArray(o) {
			return typeof o === "object" && __objToStr(o) === "[object Array]";
		}
		clone$1.__isArray = __isArray;
		function __isRegExp(o) {
			return typeof o === "object" && __objToStr(o) === "[object RegExp]";
		}
		clone$1.__isRegExp = __isRegExp;
		function __getRegExpFlags(re) {
			var flags = "";
			if (re.global) flags += "g";
			if (re.ignoreCase) flags += "i";
			if (re.multiline) flags += "m";
			return flags;
		}
		clone$1.__getRegExpFlags = __getRegExpFlags;
		return clone$1;
	})();
	if (typeof module === "object" && module.exports) module.exports = clone;
}) });

//#endregion
//#region node_modules/.pnpm/node-cache@5.1.2/node_modules/node-cache/lib/node_cache.js
var require_node_cache$1 = /* @__PURE__ */ __commonJS({ "node_modules/.pnpm/node-cache@5.1.2/node_modules/node-cache/lib/node_cache.js": ((exports, module) => {
	(function() {
		var EventEmitter, clone$1, splice = [].splice, boundMethodCheck = function(instance, Constructor) {
			if (!(instance instanceof Constructor)) throw new Error("Bound instance method accessed before binding");
		}, indexOf = [].indexOf;
		clone$1 = require_clone();
		EventEmitter = require("events").EventEmitter;
		module.exports = (function() {
			class NodeCache$1 extends EventEmitter {
				constructor(options = {}) {
					super();
					this.get = this.get.bind(this);
					this.mget = this.mget.bind(this);
					this.set = this.set.bind(this);
					this.mset = this.mset.bind(this);
					this.del = this.del.bind(this);
					this.take = this.take.bind(this);
					this.ttl = this.ttl.bind(this);
					this.getTtl = this.getTtl.bind(this);
					this.keys = this.keys.bind(this);
					this.has = this.has.bind(this);
					this.getStats = this.getStats.bind(this);
					this.flushAll = this.flushAll.bind(this);
					this.flushStats = this.flushStats.bind(this);
					this.close = this.close.bind(this);
					this._checkData = this._checkData.bind(this);
					this._check = this._check.bind(this);
					this._isInvalidKey = this._isInvalidKey.bind(this);
					this._wrap = this._wrap.bind(this);
					this._getValLength = this._getValLength.bind(this);
					this._error = this._error.bind(this);
					this._initErrors = this._initErrors.bind(this);
					this.options = options;
					this._initErrors();
					this.data = {};
					this.options = Object.assign({
						forceString: false,
						objectValueSize: 80,
						promiseValueSize: 80,
						arrayValueSize: 40,
						stdTTL: 0,
						checkperiod: 600,
						useClones: true,
						deleteOnExpire: true,
						enableLegacyCallbacks: false,
						maxKeys: -1
					}, this.options);
					if (this.options.enableLegacyCallbacks) {
						console.warn("WARNING! node-cache legacy callback support will drop in v6.x");
						[
							"get",
							"mget",
							"set",
							"del",
							"ttl",
							"getTtl",
							"keys",
							"has"
						].forEach((methodKey) => {
							var oldMethod = this[methodKey];
							this[methodKey] = function(...args) {
								var cb, err, ref = args, res;
								[...args] = ref, [cb] = splice.call(args, -1);
								if (typeof cb === "function") try {
									res = oldMethod(...args);
									cb(null, res);
								} catch (error1) {
									err = error1;
									cb(err);
								}
								else return oldMethod(...args, cb);
							};
						});
					}
					this.stats = {
						hits: 0,
						misses: 0,
						keys: 0,
						ksize: 0,
						vsize: 0
					};
					this.validKeyTypes = ["string", "number"];
					this._checkData();
				}
				get(key) {
					var _ret, err;
					boundMethodCheck(this, NodeCache$1);
					if ((err = this._isInvalidKey(key)) != null) throw err;
					if (this.data[key] != null && this._check(key, this.data[key])) {
						this.stats.hits++;
						_ret = this._unwrap(this.data[key]);
						return _ret;
					} else {
						this.stats.misses++;
						return;
					}
				}
				mget(keys) {
					var _err, err, i, key, len, oRet;
					boundMethodCheck(this, NodeCache$1);
					if (!Array.isArray(keys)) {
						_err = this._error("EKEYSTYPE");
						throw _err;
					}
					oRet = {};
					for (i = 0, len = keys.length; i < len; i++) {
						key = keys[i];
						if ((err = this._isInvalidKey(key)) != null) throw err;
						if (this.data[key] != null && this._check(key, this.data[key])) {
							this.stats.hits++;
							oRet[key] = this._unwrap(this.data[key]);
						} else this.stats.misses++;
					}
					return oRet;
				}
				set(key, value, ttl) {
					var _err, err, existent;
					boundMethodCheck(this, NodeCache$1);
					if (this.options.maxKeys > -1 && this.stats.keys >= this.options.maxKeys) {
						_err = this._error("ECACHEFULL");
						throw _err;
					}
					if (this.options.forceString && false);
					if (ttl == null) ttl = this.options.stdTTL;
					if ((err = this._isInvalidKey(key)) != null) throw err;
					existent = false;
					if (this.data[key]) {
						existent = true;
						this.stats.vsize -= this._getValLength(this._unwrap(this.data[key], false));
					}
					this.data[key] = this._wrap(value, ttl);
					this.stats.vsize += this._getValLength(value);
					if (!existent) {
						this.stats.ksize += this._getKeyLength(key);
						this.stats.keys++;
					}
					this.emit("set", key, value);
					return true;
				}
				mset(keyValueSet) {
					var _err, err, i, j, key, keyValuePair, len, len1, ttl, val;
					boundMethodCheck(this, NodeCache$1);
					if (this.options.maxKeys > -1 && this.stats.keys + keyValueSet.length >= this.options.maxKeys) {
						_err = this._error("ECACHEFULL");
						throw _err;
					}
					for (i = 0, len = keyValueSet.length; i < len; i++) {
						keyValuePair = keyValueSet[i];
						({key, val, ttl} = keyValuePair);
						if (ttl && typeof ttl !== "number") {
							_err = this._error("ETTLTYPE");
							throw _err;
						}
						if ((err = this._isInvalidKey(key)) != null) throw err;
					}
					for (j = 0, len1 = keyValueSet.length; j < len1; j++) {
						keyValuePair = keyValueSet[j];
						({key, val, ttl} = keyValuePair);
						this.set(key, val, ttl);
					}
					return true;
				}
				del(keys) {
					var delCount, err, i, key, len, oldVal;
					boundMethodCheck(this, NodeCache$1);
					if (!Array.isArray(keys)) keys = [keys];
					delCount = 0;
					for (i = 0, len = keys.length; i < len; i++) {
						key = keys[i];
						if ((err = this._isInvalidKey(key)) != null) throw err;
						if (this.data[key] != null) {
							this.stats.vsize -= this._getValLength(this._unwrap(this.data[key], false));
							this.stats.ksize -= this._getKeyLength(key);
							this.stats.keys--;
							delCount++;
							oldVal = this.data[key];
							delete this.data[key];
							this.emit("del", key, oldVal.v);
						}
					}
					return delCount;
				}
				take(key) {
					var _ret;
					boundMethodCheck(this, NodeCache$1);
					_ret = this.get(key);
					if (_ret != null) this.del(key);
					return _ret;
				}
				ttl(key, ttl) {
					var err;
					boundMethodCheck(this, NodeCache$1);
					ttl || (ttl = this.options.stdTTL);
					if (!key) return false;
					if ((err = this._isInvalidKey(key)) != null) throw err;
					if (this.data[key] != null && this._check(key, this.data[key])) {
						if (ttl >= 0) this.data[key] = this._wrap(this.data[key].v, ttl, false);
						else this.del(key);
						return true;
					} else return false;
				}
				getTtl(key) {
					var _ttl, err;
					boundMethodCheck(this, NodeCache$1);
					if (!key) return;
					if ((err = this._isInvalidKey(key)) != null) throw err;
					if (this.data[key] != null && this._check(key, this.data[key])) {
						_ttl = this.data[key].t;
						return _ttl;
					} else return;
				}
				keys() {
					var _keys;
					boundMethodCheck(this, NodeCache$1);
					_keys = Object.keys(this.data);
					return _keys;
				}
				has(key) {
					var _exists;
					boundMethodCheck(this, NodeCache$1);
					_exists = this.data[key] != null && this._check(key, this.data[key]);
					return _exists;
				}
				getStats() {
					boundMethodCheck(this, NodeCache$1);
					return this.stats;
				}
				flushAll(_startPeriod = true) {
					boundMethodCheck(this, NodeCache$1);
					this.data = {};
					this.stats = {
						hits: 0,
						misses: 0,
						keys: 0,
						ksize: 0,
						vsize: 0
					};
					this._killCheckPeriod();
					this._checkData(_startPeriod);
					this.emit("flush");
				}
				flushStats() {
					boundMethodCheck(this, NodeCache$1);
					this.stats = {
						hits: 0,
						misses: 0,
						keys: 0,
						ksize: 0,
						vsize: 0
					};
					this.emit("flush_stats");
				}
				close() {
					boundMethodCheck(this, NodeCache$1);
					this._killCheckPeriod();
				}
				_checkData(startPeriod = true) {
					var key, ref, value;
					boundMethodCheck(this, NodeCache$1);
					ref = this.data;
					for (key in ref) {
						value = ref[key];
						this._check(key, value);
					}
					if (startPeriod && this.options.checkperiod > 0) {
						this.checkTimeout = setTimeout(this._checkData, this.options.checkperiod * 1e3, startPeriod);
						if (this.checkTimeout != null && this.checkTimeout.unref != null) this.checkTimeout.unref();
					}
				}
				_killCheckPeriod() {
					if (this.checkTimeout != null) return clearTimeout(this.checkTimeout);
				}
				_check(key, data) {
					var _retval;
					boundMethodCheck(this, NodeCache$1);
					_retval = true;
					if (data.t !== 0 && data.t < Date.now()) {
						if (this.options.deleteOnExpire) {
							_retval = false;
							this.del(key);
						}
						this.emit("expired", key, this._unwrap(data));
					}
					return _retval;
				}
				_isInvalidKey(key) {
					var ref;
					boundMethodCheck(this, NodeCache$1);
					if (ref = typeof key, indexOf.call(this.validKeyTypes, ref) < 0) return this._error("EKEYTYPE", { type: typeof key });
				}
				_wrap(value, ttl, asClone = true) {
					var livetime, now, ttlMultiplicator;
					boundMethodCheck(this, NodeCache$1);
					if (!this.options.useClones) asClone = false;
					now = Date.now();
					livetime = 0;
					ttlMultiplicator = 1e3;
					if (ttl === 0) livetime = 0;
					else if (ttl) livetime = now + ttl * ttlMultiplicator;
					else if (this.options.stdTTL === 0) livetime = this.options.stdTTL;
					else livetime = now + this.options.stdTTL * ttlMultiplicator;
					return {
						t: livetime,
						v: asClone ? clone$1(value) : value
					};
				}
				_unwrap(value, asClone = true) {
					if (!this.options.useClones) asClone = false;
					if (value.v != null) if (asClone) return clone$1(value.v);
					else return value.v;
					return null;
				}
				_getKeyLength(key) {
					return key.toString().length;
				}
				_getValLength(value) {
					boundMethodCheck(this, NodeCache$1);
					if (typeof value === "string") return value.length;
					else if (this.options.forceString) return JSON.stringify(value).length;
					else if (Array.isArray(value)) return this.options.arrayValueSize * value.length;
					else if (typeof value === "number") return 8;
					else if (typeof (value != null ? value.then : void 0) === "function") return this.options.promiseValueSize;
					else if (typeof Buffer !== "undefined" && Buffer !== null ? Buffer.isBuffer(value) : void 0) return value.length;
					else if (value != null && typeof value === "object") return this.options.objectValueSize * Object.keys(value).length;
					else if (typeof value === "boolean") return 8;
					else return 0;
				}
				_error(type, data = {}) {
					var error;
					boundMethodCheck(this, NodeCache$1);
					error = /* @__PURE__ */ new Error();
					error.name = type;
					error.errorcode = type;
					error.message = this.ERRORS[type] != null ? this.ERRORS[type](data) : "-";
					error.data = data;
					return error;
				}
				_initErrors() {
					var _errMsg, _errT, ref;
					boundMethodCheck(this, NodeCache$1);
					this.ERRORS = {};
					ref = this._ERRORS;
					for (_errT in ref) {
						_errMsg = ref[_errT];
						this.ERRORS[_errT] = this.createErrorMessage(_errMsg);
					}
				}
				createErrorMessage(errMsg) {
					return function(args) {
						return errMsg.replace("__key", args.type);
					};
				}
			}
			NodeCache$1.prototype._ERRORS = {
				"ENOTFOUND": "Key `__key` not found",
				"ECACHEFULL": "Cache max keys amount exceeded",
				"EKEYTYPE": "The key argument has to be of type `string` or `number`. Found: `__key`",
				"EKEYSTYPE": "The keys argument has to be an array.",
				"ETTLTYPE": "The ttl argument has to be a number."
			};
			return NodeCache$1;
		}).call(this);
	}).call(exports);
}) });

//#endregion
//#region node_modules/.pnpm/node-cache@5.1.2/node_modules/node-cache/index.js
var require_node_cache = /* @__PURE__ */ __commonJS({ "node_modules/.pnpm/node-cache@5.1.2/node_modules/node-cache/index.js": ((exports, module) => {
	(function() {
		var exports$1 = module.exports = require_node_cache$1();
		exports$1.version = "5.1.2";
	}).call(exports);
}) });

//#endregion
//#region src/cache.ts
var import_node_cache = /* @__PURE__ */ __toESM(require_node_cache());
const cache = new import_node_cache.default({ stdTTL: 3600 });
function writeEntry(ref, value) {
	return cache.set(ref, value);
}
function getEntry(ref) {
	return cache.get(ref);
}
function dopplerCliInstalled$1() {
	return cache.get("dopplerCliInstalled");
}
function writeDopplerCliInstalled(installed) {
	return cache.set("dopplerCliInstalled", installed);
}
function setStdTTL(ttl) {
	cache.options.stdTTL = ttl;
}

//#endregion
//#region src/command.ts
/**
* Finds the absolute path of an executable by searching in common directories
* across different operating systems. This is a robust way to find a command
* when the process's PATH might be incomplete (as it often is for GUI apps).
*
* @param command The executable name to find (e.g., 'doppler').
* @param cliPath Optional path to the binary, or the directory containing it.
* @returns The absolute path of the command, or null if not found.
*/
async function findExecutablePath(command, cliPath) {
	const commandWithExt = process.platform === "win32" ? `${command}.exe` : command;
	if (cliPath) try {
		const candidate = (await node_fs.promises.stat(cliPath)).isDirectory() ? node_path.join(cliPath, commandWithExt) : cliPath;
		await node_fs.promises.access(candidate, node_fs.constants.X_OK);
		return candidate;
	} catch {}
	const searchPaths = [];
	const homeDir = process.env.HOME || process.env.USERPROFILE || "";
	if (process.platform === "win32") searchPaths.push(process.env.ProgramFiles ? node_path.join(process.env.ProgramFiles, "Doppler") : "", process.env.LOCALAPPDATA ? node_path.join(process.env.LOCALAPPDATA, "Doppler") : "", node_path.join("C:", "ProgramData", "Doppler", "bin"));
	else searchPaths.push("/usr/local/bin", "/opt/homebrew/bin", "/usr/bin", "/bin", node_path.join(homeDir, ".local", "bin"));
	const pathDirs = process.env.PATH?.split(node_path.delimiter) || [];
	const allPathsToSearch = [...new Set([...searchPaths, ...pathDirs])].filter(Boolean);
	for (const dir of allPathsToSearch) {
		const fullPath = node_path.join(dir, commandWithExt);
		try {
			await node_fs.promises.access(fullPath, node_fs.constants.X_OK);
			return fullPath;
		} catch {}
	}
	return null;
}
/**
* Executes a command with arguments in a platform-agnostic way. It first finds
* the executable's absolute path and then spawns a child process.
*
* @param command The command to execute (e.g., 'doppler').
* @param args An array of string arguments for the command.
* @param cliPath Optional path to the binary, or the directory containing it.
* @returns A promise that resolves with the command's stdout, or rejects with an error.
*/
async function runCommand(command, args, cliPath) {
	const executablePath = await findExecutablePath(command, cliPath);
	if (!executablePath) throw new Error(`Command not found: '${command}'. Ensure the Doppler CLI is installed and accessible, or set 'cliPath' in the plugin's config.json.`);
	return new Promise((resolve, reject) => {
		const child = (0, node_child_process.spawn)(executablePath, args);
		let stdout = "";
		let stderr = "";
		child.stdout.on("data", (data) => {
			stdout += data.toString();
		});
		child.stderr.on("data", (data) => {
			stderr += data.toString();
		});
		child.on("close", (code) => {
			if (code === 0) resolve(stdout.trim());
			else reject(/* @__PURE__ */ new Error(`Command failed with exit code ${code}: ${command} ${args.join(" ")}\n\nStderr:\n${stderr.trim()}`));
		});
		child.on("error", (err) => {
			reject(/* @__PURE__ */ new Error(`Failed to start command: ${err.message}`));
		});
	});
}

//#endregion
//#region src/doppler.ts
const dopplerCliInstalled = async (cliPath) => {
	try {
		const me = await runCommand("doppler", ["me", "--json"], cliPath);
		if (!JSON.parse(me).name) throw new Error("Doppler CLI is not installed or not logged in");
		return true;
	} catch (e) {
		if (e instanceof Error) {
			const err = /* @__PURE__ */ new Error(`There was an issue with the Doppler CLI. If you have the Doppler CLI installed, run 'doppler login'. If the binary is not on Yaak's PATH, set 'cliPath' in the plugin's config.json. Error details: ${e.message}`);
			err.stack = e.stack;
			throw err;
		}
	}
	return false;
};
const getSecret = async (project, config, secret, cliPath) => {
	const secretValue = await runCommand("doppler", [
		"secrets",
		"get",
		"--project",
		project,
		"--config",
		config,
		"--json",
		secret
	], cliPath);
	const found = JSON.parse(secretValue)[secret];
	if (!found) throw new Error("Secret Value not found");
	return found.computed;
};

//#endregion
//#region src/index.ts
let pluginConfig;
const plugin = { templateFunctions: [{
	name: "doppler.secret",
	description: "Fetch a secret from your Doppler config via the CLI",
	aliases: ["dopplersecret"],
	args: [
		{
			name: "project",
			label: "Project",
			type: "text",
			placeholder: "e.g. web-frontend"
		},
		{
			name: "config",
			label: "Config",
			type: "text",
			placeholder: "e.g. prd"
		},
		{
			name: "secret",
			label: "Secret",
			type: "text",
			placeholder: "e.g. API_KEY"
		}
	],
	async onRender(_ctx, args) {
		const project = stringArg(args, "project");
		const config = stringArg(args, "config");
		const secret = stringArg(args, "secret");
		if (!project || !config || !secret) return null;
		try {
			loadConfig();
			await checkCli();
			return await fetchEntry(project, config, secret);
		} catch (err) {
			return err instanceof Error ? err.toString() : String(err);
		}
	}
}] };
function stringArg(args, name) {
	const value = args.values[name];
	return typeof value === "string" ? value.trim() : "";
}
/**
* Reads the optional `config.json` that sits next to the built plugin. Missing
* or malformed config is non-fatal — the plugin falls back to auto-detecting
* the CLI and the default cache TTL.
*/
function loadConfig() {
	if (pluginConfig) return;
	pluginConfig = {};
	try {
		const configPath = node_path.resolve(__dirname, "config.json");
		const raw = node_fs.readFileSync(configPath, "utf-8");
		pluginConfig = JSON.parse(raw);
	} catch {}
	if (typeof pluginConfig.cacheTTL === "number") setStdTTL(pluginConfig.cacheTTL);
}
async function checkCli() {
	if (dopplerCliInstalled$1() !== true) {
		const installed = await dopplerCliInstalled(pluginConfig?.cliPath);
		writeDopplerCliInstalled(installed);
	}
}
async function fetchEntry(project, config, secret) {
	const cacheKey = `${project}:${config}-${secret}`;
	const existing = getEntry(cacheKey);
	if (existing) return existing;
	const secretValue = await getSecret(project, config, secret, pluginConfig?.cliPath);
	writeEntry(cacheKey, secretValue);
	return secretValue;
}

//#endregion
exports.plugin = plugin;