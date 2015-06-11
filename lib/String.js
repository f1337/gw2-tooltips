define(function ()
{
	String.prototype.beginsWith = function (prefix)
	{
		return this.indexOf(prefix) !== -1;
	};

	String.prototype.endsWith = function (suffix)
	{
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};

	String.prototype.toTitleCase = function ()
	{
		return this.replace(/\w\S*/g, function (txt)
		{
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
});
