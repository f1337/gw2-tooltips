define(function ()
{
	function BaseParser (response, delegate)
	{
		this.page = this.page_from_response(response);
		this.description_re = new RegExp("(A*\\s*[\\[\\{']+" + this.title() + "[\\]\\}']+[^\\n]+)\\n", 'i');
	}

	// parse the content node from the response
	BaseParser.prototype.content = function ()
	{
		var content = this.revision()['*'];
		if (content.length < 1)
		{
			this.warn('Expected page.revisions[0]["*"] not to be empty.');
			return null;
		}
		return content;
	};

	// parse the description from the response
	BaseParser.prototype.description = function ()
	{
		var description = this.description_re.exec(this.content());
		return ( (description && description[1]) ? this.strip(description[1]) : null);
	};

	// parse the page node from the response
	BaseParser.prototype.page_from_response = function (response)
	{
		var page_ids = Object.keys(response.query.pages);
		if (page_ids.length != 1 || page_ids[0] == '-1')
		{
			this.warn(response.query, 'Expected response.query.pages to return exactly 1 page id.');
			return;
		}
		return response.query.pages[page_ids[0]];
	};

	// parse the revision node from the response
	BaseParser.prototype.revision = function ()
	{
		var revisions = this.page.revisions;
		if (revisions.length != 1)
		{
			this.warn('Expected page.revisions to return exactly 1 revision.');
			return null;
		}
		return revisions[0];
	};

	// strip wiki links/macros
	BaseParser.prototype.strip = function (text)
	{
		var wiki_links =  /\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g;
		var wiki_macros = /\{\{(?:[^|\}]+\|)?([^\}]+)\}\}/g;
		var wiki_quotes = /'''(?:[^|']+\|)?([^\']+)'''/g;
		return text.replace(wiki_links, "$1").replace(wiki_macros, "$1").replace(wiki_quotes, "$1");
	};

	// parse the title from the response
	BaseParser.prototype.title = function ()
	{
		var title = this.page.title;
		if (title.length < 1)
		{
			this.warn(this.page, 'Expected page.title not to be empty.');
			return null;
		}
		return title;
	};

	BaseParser.prototype.warn = function (message)
	{
		console.log('---------------------');
		console.log(this.page);
		console.warn(message);
		console.log('---------------------');
	};

	return BaseParser;
});
