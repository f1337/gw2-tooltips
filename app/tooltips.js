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
				$("a[href *= '" + this.href_pattern + "']").each(function() {
					var url = $(this).attr('href');
					var slug = url.slice(url.indexOf(self.href_pattern) + self.href_pattern.length);
					self.create($(this), slug, style);
				});
			};

			this.create = function (elem, slug, style)
			{
				// determine what renderer & tooltip style to use
				var renderer = BaseRenderer;
				// explicit calls to .all/.create override data-style attribute
				style = style || this.style();
				// if the style is qtip, use the qtip renderer
				if (style && style.beginsWith('qtip'))
				{
					renderer = QTip2Renderer;
				}

				var wikiPage = new WikiPage(InfoboxParser);
				wikiPage.get('http://wiki.guildwars2.com/api.php', slug, new renderer(elem, style));
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
