export const bannerConfigs = [
	{
		slug: 'banner',
		title: 'banner.png',
		route: '/banners/banner',
		image: '/assets/bannersGPT/banner.png',
		orientation: 'vertical',
		qr: {
			// EDIT QR POSITION FOR banner.png HERE
			left: 72.2,
			top: 72.35,
			width: 19.6,
			pixelSize: 160,
			iconSize: 38,
		},
	},
	{
		slug: 'banner-claro-4k',
		title: 'Banner_claro_4k.png',
		route: '/banners/banner-claro-4k',
		image: '/assets/bannersGPT/Banner_claro_4k.png',
		orientation: 'vertical',
		qr: {
			// EDIT QR POSITION FOR Banner_claro_4k.png HERE
			left: 74.55,
			top: 80.25,
			width: 22.52,
			pixelSize: 160,
			iconSize: 38,
		},
	},
	{
		slug: 'banner-oscuro-4k',
		title: 'Banner_oscuro_4k.png',
		route: '/banners/banner-oscuro-4k',
		image: '/assets/bannersGPT/Banner_oscuro_4k.png',
		orientation: 'vertical',
		qr: {
			// EDIT QR POSITION FOR Banner_oscuro_4k.png HERE
			left: 75.45,
			top: 79.45,
			width: 19.2,
			pixelSize: 160,
			iconSize: 38,
		},
	},
	{
		slug: 'tarjeta',
		title: 'tarjeta.png',
		route: '/banners/tarjeta',
		image: '/assets/bannersGPT/tarjeta.png',
		orientation: 'horizontal',
		qr: {
			// EDIT QR POSITION FOR tarjeta.png HERE
			left: 76.6,
			top: 48.55,
			width: 15.4,
			pixelSize: 200,
			iconSize: 46,
		},
	},
	{
		slug: 'tarjeta-4k',
		title: 'Tarjeta_4k.png',
		route: '/banners/tarjeta-4k',
		image: '/assets/bannersGPT/Tarjeta_4k.png',
		orientation: 'horizontal',
		qr: {
			// EDIT QR POSITION FOR Tarjeta_4k.png HERE
			left: 81.21,
			top: 74.95,
			width: 13.5,
			pixelSize: 220,
			iconSize: 50,
		},
	},
];

export const bannerConfigByRoute = Object.fromEntries(
	bannerConfigs.map(config => [config.route, config])
);

export const defaultBannerSlug = bannerConfigs[0].slug;
