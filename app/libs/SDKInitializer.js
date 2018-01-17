import * as GoogleTagManager from './googleTagManager';
import * as GoogleAnalytics from './googleAnalytics';
import * as ClearSale from './clearSale';

export function initSDKs() {
    var headers = new Headers();
    headers.append("x-API-KEY", $PROCESS_ENV_X_API_KEY);
    
    var config = { 
      method: 'GET',
      headers: headers,
      mode: 'cors'
	};

    // fetch SDK's keys from url
    fetch($PROCESS_ENV_SETTINGS_URL, config)
		.then(function(response) {
			/*
			These should be the props: 

			"googleAnaliticsUIDHotSite"
			"googleAnaliticsUIDMobileApp"
			"googleTagManagerHotSite"
			"enderecoEmailSac"
			"clearSaleFingerprint"
			"estabelecimentoYaPay"
			"telefoneSac"
			*/
			let json = response.json();
			console.log(json);
			if (json) {
				if (json.googleAnaliticsUIDHotSite) {
					GoogleAnalytics.init(json.googleAnaliticsUIDHotSite);
				}
				if (json.googleTagManagerHotSite) {
					GoogleTagManager.init(json.googleTagManagerHotSite);
				}
				if (json.enderecoEmailSac) {
					console.log(enderecoEmailSac);
				}
				if (json.telefoneSac) {
					console.log(json.telefoneSac)
				}
			}
		})
		.catch(function(error) {
			console.log(error);
		}).then(function() {
			ClearSale.init();
		});
  }