define(['./base_parser', './skill_fact', './bonus'], function (BaseParser, SkillFact, Bonus)
{
	function InfoboxParser (page, delegate)
	{
		this.description_re = /\|\s*description\s*=\s*([^\n]+)\n/;
		this.page = page;
	}

	InfoboxParser.prototype = Object.create( BaseParser.prototype );

	InfoboxParser.prototype.description = function ()
	{
		var description = BaseParser.prototype.description.call(this);

		// infobox parsed, try to parse add'l metadata
		if (description)
		{
			var skill_facts = SkillFact.all(this.content());
			for (var i in skill_facts)
			{
				description = description + "\n<br />" + skill_facts[i].description;
			}

			// bonuses
			var bonuses = Bonus.all(this.content());
			for (var j in bonuses)
			{
				description = description + "\n<br />" + bonuses[j].description;
			}
		}

		return description;
	};

	return InfoboxParser;
});
