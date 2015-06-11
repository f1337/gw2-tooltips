define(['./base_parser'], function (BaseParser)
{
	function WikiPage (parser)
	{
		this.parsers = [ BaseParser ];
		if (parser) this.parsers.unshift(parser);
	}

	WikiPage.prototype.get = function (url, slug, delegate)
	{
		var self = this;
		slug = unescape(slug);
		var query = (slug.endsWith('!"') ? slug.replace(/_/g, ' ') : slug);

		// return;
		$.ajax({
				url: url,
				cache: true,
				dataType: "jsonp",
				// jsonp: 'callback',
				// jsonpCallback: 'jsonCallback',

				data: {
					format: 'json',
					action: 'query',
					titles: query,
					prop: 'revisions',
					rvprop: 'content'
				},

				success: function(response)
				{
					// parse the response
					self.parse(response);
					// ping the delegate callback
					if (delegate && typeof(delegate['success']) == 'function')
					{
						delegate['success'](self);
					}
				},

				error: function(xhr, status, error)
				{
					console.log('WikiPage request error: ' + query);
					// ping the delegate callback
					if (delegate && typeof(delegate['error']) == 'function')
					{
						delegate['error'](xhr, status, error);
					}
				}
		});
	};

	// parse the response into structured data
	WikiPage.prototype.parse = function (response)
	{
		// gotta have a parser
		if (this.parsers.length < 1)
		{
			console.warn('WikiPage has no parsers defined');
		}

		var i = 0;
		var description, title;

		// try each parser until a description is returned
		while ((! description) && (i < this.parsers.length))
		{
			var parser = new this.parsers[i](response, this);
			description = parser.description();
			title = parser.title();
			i++;
		}

		// capture the page title and description
		if (description)
		{
			this.title = title;
			this.description = description;
		}
		else
		// no description => no bueno
		{
			console.warn('Unable to parse description from response');
			console.log(response);
		}
	};

	return WikiPage;
});