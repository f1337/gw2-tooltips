define(
	// dependencies
	['app/wiki_page', './infobox_parser', 'app/base_renderer', 'app/qtip2_renderer', 'String'],

	function (WikiPage, InfoboxParser, BaseRenderer, QTip2Renderer)
	{
		var GW2Wikitips = new function()
		{
			var self = this;
			this.href_pattern = 'wiki.guildwars2.com/wiki/';

			this.all = function (style)
			{
				// determine what renderer & tooltip style to use
				var renderer = BaseRenderer;
				// explicitly passed style overrides data-style attribute
				style = style || this.style();
				// if the style is qtip, use the qtip renderer
				if (style && style.beginsWith('qtip'))
				{
					renderer = QTip2Renderer;
				}

				// map page titles to renderer delegates
				var titlesToDelegates = {};
				$("a[href *= '" + this.href_pattern + "']").each(function() {
					// parse the page title slug from the href
					var url = $(this).attr('href');
					var slug = url.slice(url.indexOf(self.href_pattern) + self.href_pattern.length);
					// create the renderer instance for this element
					var elem_renderer = new renderer($(this), style);
					// add the renderer delegates for this element to the map
					var key = unescape(slug).replace(/_/g, ' ');
					if (! titlesToDelegates[key]) titlesToDelegates[key] = [];
					titlesToDelegates[key].push({
						error: function (xhr, status, error) { elem_renderer['error'](xhr, status, error) },
						success: function (page) { elem_renderer['success'](page) }
					});
				});

				WikiPage.all('http://wiki.guildwars2.com/api.php', titlesToDelegates, InfoboxParser);
			};

			this.style = function ()
			{
				var style = null;

				// strait outta requirejs, respect:
				if (!!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document))
				{
					var scripts = document.getElementsByTagName('script');
					var i = scripts.length - 1;
					for (i; i >= 0; i--)
					{
						if (scripts[i].getAttribute('data-wikitip-style'))
						{
							return scripts[i].getAttribute('data-wikitip-style');
						}
					}
				}

				return style;
			};
		};

		return GW2Wikitips;
	}
);
