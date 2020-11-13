fs = require('fs')
module.exports = function(eleventyConfig){
	eleventyConfig.setBrowserSyncConfig({
	  // scripts in body conflict with Turbolinks
	  snippetOptions: {
	    rule: {
	      match: /<\/head>/i,
	      fn: function(snippet, match) {
	        return snippet + match;
	      }
	    }
	  },
	  callbacks: {
	      ready: function(err, bs) {
	        bs.addMiddleware("*", (req, res) => {
	          const content_404 = fs.readFileSync('_site/404.html');
	          // Provides the 404 content without redirect.
	          res.write(content_404);
	          // Add 404 http status code in request header.
	          // res.writeHead(404, { "Content-Type": "text/html" });
	          res.writeHead(404);
	          res.end();
	        });
	      }
	    }
	});
}
