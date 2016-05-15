// components/Html.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 2, 2016
//

import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'

const Html = ({ assets, components, initialState }) => {
  const head = Helmet.rewind()
  const content = components 
    ? renderToString(components)
    : null
    
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1" />
        <meta name="author" content="Natcha Luang - Aroonchai" />
        <meta name="description" content="Trust me I'm Petdo" />
        <meta name="theme-color" content="#78909c" />
        <meta name="msapplication-navbutton-color" content="#78909c" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#78909c" />
        
        {head.title.toComponent()}
        
        {/*
          <link rel="icon" href={require('../../static/favicon.ico')} />
          <link rel="apple-touch-icon" sizes="57x57" href={require('../../static/apple-icon-57x57.png')} />
          <link rel="apple-touch-icon" sizes="60x60" href={require('../../static/apple-icon-60x60.png')} />
          <link rel="apple-touch-icon" sizes="72x72" href={require('../../static/apple-icon-72x72.png')} />
          <link rel="apple-touch-icon" sizes="76x76" href={require('../../static/apple-icon-76x76.png')} />
          <link rel="apple-touch-icon" sizes="114x114" href={require('../../static/apple-icon-114x114.png')} />
          <link rel="apple-touch-icon" sizes="120x120" href={require('../../static/apple-icon-120x120.png')} />
          <link rel="apple-touch-icon" sizes="144x144" href={require('../../static/apple-icon-144x144.png')} />
          <link rel="apple-touch-icon" sizes="152x152" href={require('../../static/apple-icon-152x152.png')} />
          <link rel="apple-touch-icon" sizes="180x180" href={require('../../static/apple-icon-180x180.png')} />
          <link rel="icon" type="image/png" sizes="192x192" href={require('../../static/android-icon-192x192.png')} />
          <link rel="icon" type="image/png" sizes="32x32" href={require('../../static/favicon-32x32.png')} />
          <link rel="icon" type="image/png" sizes="96x96" href={require('../../static/favicon-96x96.png')} />
          <link rel="icon" type="image/png" sizes="16x16" href={require('../../static/favicon-16x16.png')} />
          <link rel="manifest" href="/static/manifest.json" />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content={require('../../static/ms-icon-144x144.png')} />
        */}

        <meta name="theme-color" content="#78909c" />
        <meta name="msapplication-navbutton-color" content="#78909c" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#78909c" />
        
        {Object.keys(assets.styles).map((style, key) =>
          <link rel="stylesheet" href={assets.styles[style]} key={key} />
         )}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{__html: content}}></div>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
            window.__NODE_ENV__ = ${JSON.stringify(process.env.NODE_ENV)}
          `
        }}></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            var _gaq=[['_setAccount','UA-33411047-1'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
          `
        }}></script>
        {Object.keys(assets.javascript).map((script, i) =>
          <script src={assets.javascript[script]} key={i}/>
         )}
      </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.object,
  components: PropTypes.node,
  initialState: PropTypes.object
}

export default Html