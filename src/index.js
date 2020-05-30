import React from "react";
const builder = require("xmlbuilder");

export default function Sitemap(props) {

    const hostname = window.location.protocol + "//" + window.location.hostname;
    const Routes = props.routes;

    const sitemap = () => {
        let paths = Routes(props).props.children;
        let xml = builder.create("urlset", {encoding: "utf-8"}).att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
        paths.forEach(path => {
            if (path.props.sitemapIndex) {
                let item = xml.ele("url");
                item.ele("loc", hostname + path.props.path);
                item.ele("priority", path.props.priority || 0);
                item.ele("changefreq", path.props.changefreq || "never");
            }
        });
        return xml.end({ pretty: props.prettify });
    };
    return (
        <React.Fragment>
        <div
            style={{whiteSpace: "pre-wrap"}}
        >
            {sitemap()}
        </div>
    </React.Fragment>
);
}