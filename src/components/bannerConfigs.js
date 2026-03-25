export const bannerConfigs = [
	{
		slug: 'banner-claro-4k',
		title: 'Banner_claro_4k.png',
		route: '/banners/banner-claro-4k',
		image: '/assets/mis-assets/Banner_claro_4k.png',
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
		image: '/assets/mis-assets/Banner_oscuro_4k.png',
		orientation: 'vertical',
		qr: {
			// EDIT QR POSITION FOR Banner_oscuro_4k.png HERE
			left: 74.95,
			top: 78.75,
			width: 19.45,
			pixelSize: 160,
			iconSize: 38,
		},
	},
	{
		slug: 'tarjeta-4k',
		title: 'Tarjeta_4k.png',
		route: '/banners/tarjeta-4k',
		image: '/assets/mis-assets/Tarjeta_4k.png',
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
