# GW2-Wikitips

Drop-in GW2 tooltips for your site. Feedback and pull-requests welcome.

## Installation

### Enjin Guild site

To use GW2 Wikitips on your Enjin site, go to Admin > Settings > Code Injection. Paste the following HTML into the *Footer* box. <small>*Injecting it in the Footer box ensures that jQuery (provided by Enjin) is loaded before GW2 Wikitips.*</small>

```HTML
<link rel="stylesheet" href="//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.css">
<script src="//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.js"></script>
<script data-wikitip-style="qtip-bootstrap" src="http://f1337.github.io/gw2-wikitips/gw2-wikitips.js"></script>
```

### Static HTML Page

Download the [latest gw2-wikitips](https://raw.githubusercontent.com/f1337/gw2-wikitips/master/gw2-wikitips.js), and put it with your other JavaScript files.


```HTML
<html>
	<head>
	<!-- first jQuery -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<!-- then qTip2 (optional, but recommended) -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.css">
	<script src="//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.js"></script>
	<!-- finally, gw2-wikitips -->
	<script data-wikitip-style="qtip-bootstrap" src="/path/to/gw2-wikitips.js"></script>
</head>

<body>

<ul>
	<li><a href="https://wiki.guildwars2.com/wiki/Strength_in_Numbers">Strength in Numbers</a></li>
	<li><a href="https://wiki.guildwars2.com/wiki/Virtue_of_Justice">Virtue of Justice</a></li>
	<li><a href="https://wiki.guildwars2.com/wiki/Empower">Empower</a></li>
	<li><a href="https://wiki.guildwars2.com/wiki/Superior_Rune_of_the_Trooper">Superior Rune of the Trooper</a></li>
</ul>

</body>

</html>
```
