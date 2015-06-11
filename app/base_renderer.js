define(function ()
{
	function BaseRenderer (elem)
	{
		this.elem = elem;
	}

	BaseRenderer.prototype.error = function (xhr, status, error)
	{
		this.elem.attr('title', status + ': ' + error);
	};

	BaseRenderer.prototype.success = function (page)
	{
		this.elem.attr('title', page.title + "\n" + page.description.replace(/<br\s*\/?>/gi, "\n"));
	};

	return BaseRenderer;
});
