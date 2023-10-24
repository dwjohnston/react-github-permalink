"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubPermalink = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_syntax_highlighter_1 = __importDefault(require("react-syntax-highlighter"));
var hljs_1 = require("react-syntax-highlighter/dist/cjs/styles/hljs");
function parseGitHubURL(githubURL) {
    // Define a regular expression to extract information from the URL
    var regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)#L(\d+)-L(\d+)/;
    // Use the regular expression to extract the information
    var match = githubURL.match(regex);
    // Check if the URL matches the expected format
    if (match) {
        var owner = match[1], repo = match[2], commit = match[3], path = match[4], lineFrom = match[5], lineTo = match[6];
        // Create and return the object
        return {
            owner: owner,
            repo: repo,
            commit: commit,
            path: path,
            lineFrom: parseInt(lineFrom, 10),
            lineTo: parseInt(lineTo, 10),
        };
    }
    else {
        throw new Error("Invalid config apparently");
    }
}
function handleResponse(response) {
    if (response.status === 404) {
        return { status: "404" };
    }
    if (response.status === 403 && response.headers.get("X-Ratelimit-Remaining") === "0") {
        return {
            status: "rate-limit"
        };
    }
    return {
        status: "other-error"
    };
}
function defaultGetDataFn(permalink) {
    return __awaiter(this, void 0, void 0, function () {
        var config, contentPromise, commitPromise, _a, contentResult, commitResult, _b, contentJson, commitJson, content, lines;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    config = parseGitHubURL(permalink);
                    contentPromise = fetch("https://api.github.com/repos/".concat(config.owner, "/").concat(config.repo, "/contents/").concat(config.path, "?ref=").concat(config.commit));
                    commitPromise = fetch("https://api.github.com/repos/".concat(config.owner, "/").concat(config.repo, "/commits/").concat(config.commit));
                    return [4 /*yield*/, Promise.all([contentPromise, commitPromise])];
                case 1:
                    _a = _c.sent(), contentResult = _a[0], commitResult = _a[1];
                    if (!contentResult.ok) {
                        return [2 /*return*/, handleResponse(contentResult)];
                    }
                    if (!commitResult.ok) {
                        return [2 /*return*/, handleResponse(commitResult)];
                    }
                    return [4 /*yield*/, Promise.all([contentResult.json(), commitResult.json()])];
                case 2:
                    _b = _c.sent(), contentJson = _b[0], commitJson = _b[1];
                    content = atob(contentJson.content);
                    lines = content.split("\n");
                    return [2 /*return*/, {
                            lines: lines.slice(config.lineFrom - 1, config.lineTo - config.lineFrom),
                            lineFrom: config.lineFrom,
                            lineTo: config.lineTo,
                            commit: config.commit,
                            path: config.path,
                            owner: config.owner,
                            repo: config.repo,
                            commitUrl: commitJson.html_url,
                            status: "ok"
                        }];
            }
        });
    });
}
var GithubPermalinkContext = (0, react_1.createContext)({
    getDataFn: defaultGetDataFn,
});
function exhaustiveFailure(value) {
    throw new Error("Exhaustive failure.");
}
function GithubPermalink(props) {
    var permalink = props.permalink;
    var _a = (0, react_1.useState)(null), data = _a[0], setData = _a[1];
    var getDataFn = (0, react_1.useContext)(GithubPermalinkContext).getDataFn;
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    (0, react_1.useEffect)(function () {
        getDataFn(permalink).then(function (v) {
            setIsLoading(false);
            setData(v);
        });
    }, []);
    if (isLoading) {
        return null;
    }
    if (!data) {
        throw new Error("Loading is complete, but no data was returned.");
    }
    if (data.status === "404") {
        return (0, jsx_runtime_1.jsx)(GithubPermalinkInner, __assign({}, props, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "error" }, { children: "Github returned an HTTP status 404. Is this a private Github repo?" })) }));
    }
    if (data.status === "rate-limit") {
        return (0, jsx_runtime_1.jsx)(GithubPermalinkInner, __assign({}, props, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "error" }, { children: "You have encountered Github's unauthenticated API request rate limit. You can still visit the above link to see the code snippet." })) }));
    }
    if (data.status === "other-error") {
        return (0, jsx_runtime_1.jsx)(GithubPermalinkInner, __assign({}, props, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "error" }, { children: "An unknown error occurred." })) }));
    }
    if (data.status === "ok") {
        return (0, jsx_runtime_1.jsx)(GithubPermalinkInner, __assign({}, props, { header: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ href: permalink, className: "file-link" }, { children: "".concat(data.owner, "/").concat(data.repo, "/").concat(data.path) })), (0, jsx_runtime_1.jsxs)("p", { children: ["Lines ", data.lineFrom, " to ", data.lineTo, " in ", (0, jsx_runtime_1.jsx)("a", __assign({ className: "commit-link", href: data.commitUrl }, { children: data.commit.slice(0, 7) }))] })] }) }, { children: (0, jsx_runtime_1.jsx)(react_syntax_highlighter_1.default, __assign({ style: hljs_1.githubGist, language: "javascript", showLineNumbers: true, startingLineNumber: data.lineFrom }, { children: data.lines.join("\n") })) }));
    }
    return exhaustiveFailure(data);
}
exports.GithubPermalink = GithubPermalink;
function GithubPermalinkInner(props) {
    var _a;
    return (0, jsx_runtime_1.jsxs)("div", __assign({ className: "react-github-permalink ".concat(props.className) }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "header" }, { children: (_a = props.header) !== null && _a !== void 0 ? _a : (0, jsx_runtime_1.jsx)("a", __assign({ href: props.permalink, className: "file-link" }, { children: props.permalink })) })), props.children] }));
}
