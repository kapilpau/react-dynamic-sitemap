# React Dynamic Sitemap

#### Never have to worry about updating your sitemap again!

This component will scan through your React Router and dynamically generate your sitemap

**Note: This has only been used with React Router v4, earlier versions might not work**

## Setup
```bash
npm i react-dynamic-sitemap
```

## Usage

You should already have a router that looks somthing like this:

```javascript
<Switch>
    <Route path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/profile" component={Profile}/>
</Switch>
```

**Note: If this is not already in its own dedicated component, you will need to extract it into its own one**

As this component needs access to the Router, you will need a new component to call this, so create a component that looks like this:
```javascript
import React from "react";
// The import below should be updated to match your Router component
import Routes from "../Routes";
import DynamicSitemap from "react-dynamic-sitemap";

export default function Sitemap(props) {
	return (
		<DynamicSitemap routes={Routes} prettify={true} {...props}/>
	);
}
```

Then add a new Route to your Router to serve your sitemap:
```javascript
<Route path="/sitemap" component={Sitemap}/>
```

Finally add the following to all of your routes:

| Attribute  | Accepted Values  | Usage  |
|---|---|---|
| sitemapIndex | true/false (default: false) | If you want the route to appear on the sitemap then set to true|
| priority      | 0-1 (default: 0) | Set to a value between 0 and 1, used by search engines |
| changefreq    | always, hourly, daily, weekly, monthly, yearly, never (default: never) | Frequency that the page is changed, used by search engines |