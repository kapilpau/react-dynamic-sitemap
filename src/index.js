import React from "react";
const builder = require("xmlbuilder");
import PropTypes from "prop-types";

export default function Sitemap(props) {

	const hostname = window.location.protocol + "//" + window.location.hostname;
	const Routes = props.routes;

	const sitemap = () => {
		let paths = Routes(props).props.children;
		if (!paths || !Array.isArray(paths)) return null;
		
		let xml = builder.create("urlset", {encoding: "utf-8"}).att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
		paths.forEach(function (path) {
			const slugs = path.props.slugs || [{}];
			slugs.forEach(slug => {
				let uri = path.props.path;
				Object.keys(slug).forEach(key => {
					const value = slug[key];
					let midStringRegex = new RegExp(`/:${key}/`, "g");
					let endStringRegex = new RegExp(`/:${key}$`);
					if (uri.match(midStringRegex))
						uri = uri.replace(midStringRegex, `/${value}/`);
					else
						uri = uri.replace(endStringRegex, `/${value}`);
				});
				if (path.props.sitemapIndex) {
					var item = xml.ele("url");
					item.ele("loc", hostname + uri);
					item.ele("priority", path.props.priority || 0);
					item.ele("changefreq", path.props.changefreq || "never");
				}
			});
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

Sitemap.propTypes = {
	prettify: PropTypes.bool,
	routes: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.func
	])
};
