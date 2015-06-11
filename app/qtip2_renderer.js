define(['qtip2'], function ()
{
	function QTip2Renderer (elem, style)
	{
		elem.qtip({
			content: {
				text: function(event, api) {
					return api.elements.target.attr('title') || 'Loading...'; // Set some initial text
				}
			},
			position: {
				viewport: $(window)
			},
			style: style
		});
		this.api = elem.qtip('api');
		this.original_title = elem.attr('title');
	}

	QTip2Renderer.prototype.error = function (xhr, status, error)
	{
		this.api.set('content.title', status);
		this.api.set('content.text', error);
	};

	QTip2Renderer.prototype.success = function (page)
	{
		var description = page.description;
		// emphasize the original title attribute in the new tooltip description
		if (this.original_title)
		{
			var emphasis_re = new RegExp('\\b' + this.original_title + '\\b', 'g');
			description = description.replace(emphasis_re, '<em>' + this.original_title + '</em>');
		}
		this.api.set('content.title', page.title);
		this.api.set('content.text', description);
	};

	return QTip2Renderer;
});
