// Disparar evento
function logEvent(nome, evento, atributo, tempo) {
	/// <summary>Dispara um evento para o Google Tag Manager.</summary>
	/// <param name="nome" type="String">Nome do evento</param>
	/// <param name="evento" type="String">Tipo de evento</param>
	/// <param name="atributo" type="String">Atributos do evento</param>
	/// <param name="tempo" type="Integer">Tempo em segundos após a carga da página</param>

	if (typeof dataLayer !== 'undefined') {
		dataLayer.push({
			'event': nome,
			'eventType': evento,
			'eventAttribute': atributo,
			'eventTime': tempo
		});
	} else {
		warn('Evento do Google Tag Manager não disparado pois o objeto "dataLayer" não está disponível. Verifique sua implementação do Google Tag Manager.');
	}
}

export function init(key){
	var googleTagManagerId = key; var ua = window.navigator.userAgent; var msie = ua.indexOf("MSIE "); if (msie < 0)
			msie = ua.indexOf("Trident"); if (msie >= 0) { var googleTagManagerId = key; console.debug('Internet Explorer detectado, trocando container no Google Tag Manager.') } (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = !0; j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f) })(window, document, 'script', 'dataLayer', googleTagManagerId);


	initIframe(key);
}

function initIframe(key) {
	var iframe = document.createElement('iframe');
	iframe.src = `//www.googletagmanager.com/ns.html?id=${key}`;
	iframe.height = 0;
	iframe.width = 0;
	iframe.classList.add('hide');
	document.body.appendChild(iframe);
}
