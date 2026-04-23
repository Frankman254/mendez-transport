export const bannerConfigs = [
	{
		slug: 'banner-modificado',
		title: 'Banner_modificado.png',
		route: '/banners/banner-modificado',
		image: '/assets/mis-assets/Banner_modificado.png',
		orientation: 'vertical',
		qr: {
			// EDIT QR POSITION FOR Banner_modificado.png HERE
			left: 74.55,
			top: 76.25,
			width: 22.52,
			pixelSize: 160,
			iconSize: 38,
		},
	},
	{
		slug: 'tarjeta-4k',
		title: 'Tarjeta_4k_modificada.png',
		route: '/banners/tarjeta-4k',
		image: '/assets/mis-assets/Tarjeta_4k_modificada.png',
		orientation: 'horizontal',
		qr: {
			// EDIT QR POSITION FOR Tarjeta_4k_modificada.png HERE
			left: 80.40,
			top: 73.95,
			width: 16.5,
			pixelSize: 220,
			iconSize: 50,
		},
	},
];

export const bannerConfigByRoute = Object.fromEntries(
	bannerConfigs.map(config => [config.route, config])
);

export const defaultBannerSlug = bannerConfigs[0].slug;
