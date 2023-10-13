const getTabsMapping = ({ t = () => {} }) => [
	{ label: t('locations:tabs_continent_label'), value: 'continent' },
	{ label: t('locations:tabs_trade_label'), value: 'trade' },
	{ label: t('locations:tabs_country_label'), value: 'country' },
	{ label: t('locations:tabs_city_label'), value: 'city' },
	{ label: t('locations:tabs_seaport_label'), value: 'seaport' },
	{ label: t('locations:tabs_airport_label'), value: 'airport' },
	{ label: t('locations:tabs_pincode_label'), value: 'pincode' },
	{ label: t('locations:tabs_cfs_label'), value: 'cfs' },
	{ label: t('locations:tabs_cluster_label'), value: 'cluster' },
	{ label: t('locations:tabs_region_label'), value: 'region' },
	{ label: t('locations:tabs_yard_label'), value: 'yard' },
	{ label: t('locations:tabs_warehouse_label'), value: 'warehouse' },
	{ label: t('locations:tabs_zone_label'), value: 'zone' },
	{ label: t('locations:tabs_railway_terminal_label'), value: 'railway_terminal' },
];

export default getTabsMapping;
