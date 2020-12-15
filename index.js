"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Sitemap;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var builder = require("xmlbuilder");

function Sitemap(props) {
  var hostname = window.location.protocol + "//" + window.location.hostname;
  var Routes = props.routes;

  var sitemap = function sitemap() {
    var paths = Routes(props).props.children;
    var xml = builder.create("urlset", {
      encoding: "utf-8"
    }).att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
    paths.forEach(function (path) {
      var slugs = path.props.slugs || [{}];
      slugs.forEach(function (slug) {
        var uri = path.props.path;
        Object.keys(slug).forEach(function (key) {
          var value = slug[key];
          var midStringRegex = new RegExp("/:".concat(key, "/"), "g");
          var endStringRegex = new RegExp("/:".concat(key, "$"));
          if (uri.match(midStringRegex)) uri = uri.replace(midStringRegex, "/".concat(value, "/"));else uri = uri.replace(endStringRegex, "/".concat(value));
        });

        if (path.props.sitemapIndex) {
          var item = xml.ele("url");
          item.ele("loc", hostname + uri);
          item.ele("priority", path.props.priority || 0);
          item.ele("changefreq", path.props.changefreq || "never");
        }
      });
    });
    return xml.end({
      pretty: props.prettify
    });
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      whiteSpace: "pre-wrap"
    }
  }, sitemap()));
}

Sitemap.propTypes = {
  prettify: _propTypes["default"].bool,
  routes: _propTypes["default"].object
};
