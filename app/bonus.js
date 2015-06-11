define(function ()
{
	function Bonus (markup)
	{
		this.description = markup
			// convert wiki links to text
			// {{Vitality}} => Vitality, [[condition]] => condition
			.replace(/(\{\{|\}\}|\[\[|\]\])/g, '')
			.replace(/^(\d)\s*=\s*(.+)/, "($1): $2");
	}

	Bonus.all = function (markup)
	{
		// | bonus1 = +25 {{Vitality}}\n
		// | bonus2 = +35 {{Toughness}}\n
		// | bonus3 = +50 {{Vitality}}\n
		// | bonus4 = +65 {{Toughness}}\n
		// | bonus5 = +100 {{Vitality}}\n
		// | bonus6 = [[Shout]]s remove a [[condition]] from each affected [[ally]].\n
		var pattern = /\|\s*bonus(\d\s*=\s*[^\n]+)\n/g

		var bonuses = [];
		var match;
		while ((match = pattern.exec(markup)) !== null)
		{
			if (match[1])
			{
				bonuses.push(new Bonus(match[1]))
			}
		}
		return bonuses;
	};

	return Bonus;
});
