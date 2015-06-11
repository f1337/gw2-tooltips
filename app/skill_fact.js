define(['./gw2_skill'], function (GW2Skill)
{
	function SkillFact (markup)
	{
		// |damage|246|coefficient=1.0
		// |torment|10|stacks=3
		// |immobilized|1.5
		// |targets|5
		// |duration|4
		// |range|600
		var args = [];
		var params = markup
			// convert ambiguous wiki links to text
			// ex: [[Area of effect|Symbol Radius]] => Symbol Radius
			.replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/, "$2")
			.split('|');

		// discard the first empty param
		params.shift();
		// capture the first non-empty param as the skill name
		var skill = params.shift();
		// transform key/value pairs from the params into hashes
		for (var i = 0; i < params.length; i++)
		{
			var match;
			if (match = params[i].match(/^([a-z]+)\=(.+)$/))
			{
				this[match[1]] = match[2];
			}
			else
			{
				args.push(params[i]);
			}
		}

		// if (skill.beginsWith('misc')) console.log(markup);

		// if a custom renderer exists, use it
		this.skill = new GW2Skill(skill.toTitleCase());
		if (this[skill])
		{
			this[skill].apply(this, args);
		}
		// use the generic renderer
		else
		{
			this.render.apply(this, args);
		}
	}

	SkillFact.all = function (markup)
	{
		var skill_facts = [];
		var skillfact_re = /\{\{skill fact(\|[^\}]+)\}\}/g;
		var skillfact_match;
		while ((skillfact_match = skillfact_re.exec(markup)) !== null)
		{
			if (skillfact_match[1])
			{
				skill_facts.push(new SkillFact(skillfact_match[1]))
			}
		}
		return skill_facts;
	};

	SkillFact.prototype.render = function (value)
	{
		this.description = [
			this.skill.image(),
			(this.stacks ? '<sub>' + this.stacks + '</sub>' : ''),
			' ',
			(this.alt || this.skill.title()),
			(this.strikes ? ' (' + this.strikes + 'x)' : ''),
			(value ? (': ' + value + this.skill.unit()) : '')
		].join('');
	};

	SkillFact.prototype.combo = function (effect)
	{
		this.render(effect.toTitleCase());
	};

	SkillFact.prototype.misc = function ()
	{
		var alt;
		if (this.image)
		{
			// console.warn(this.image);
			alt = new GW2Skill(this.image.replace('.png', ''));
		}
		this.description = (alt ? alt.image() : this.skill.image())
		+ (this.alt || '')
		+ ': ' + Array.prototype.slice.call(arguments).join();
	};

	SkillFact.prototype.miscplain = SkillFact.prototype.misc;

	return SkillFact;
});
