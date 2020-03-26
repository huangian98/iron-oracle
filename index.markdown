---
layout: home
---

{% for oracle in site.oracles %}
<div class="oracle">
<h2>{{ oracle.title }} <button class="roll">Roll</button></h2>
{{ oracle }}
</div>
{% endfor %}

<script defer src="{{ "/assets/oracle.js" | relative_url }}"></script>
