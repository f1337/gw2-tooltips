define(['text!app/gw2_skills.json'], function (json_str)
{
	function GW2Skill (key)
	{
		this.key = key;
		if (! (this.attrs = GW2Skill.skills[key]))
		{
			console.warn('Skill "' + key + '" not found.');
		}
	}

	GW2Skill.skills = JSON.parse(json_str);

	GW2Skill.prototype.image = function ()
	{
		return '<img alt="'
			+ this.key + '.png" src="'
			+ this.src()
			+ '" width="18" height="18" />';
	};

	GW2Skill.prototype.src = function ()
	{
		if (! (this.attrs && this.attrs['src']))
		{
			console.log('Attr "src" not defined for skill "' + this.key + '"');
		}

		return 'http://wiki.guildwars2.com/images/' + ((this.attrs && this.attrs['src']) || GW2Skill.skills['Misc']['src']);
	};

	GW2Skill.prototype.title = function ()
	{
		return (this.attrs['title'] || this.key);
	};

	GW2Skill.prototype.unit = function (u)
	{
		return ((this.attrs['unit'] !== undefined) ? this.attrs['unit'] : (u || 's'));
	};

	return GW2Skill;
});
