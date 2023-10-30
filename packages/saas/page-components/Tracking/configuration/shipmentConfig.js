const getShipmentConfig = ({ t }) => [
	{
		key   : 'checkbox',
		title : '',
		func  : 'renderCheckbox',
		width : '10%',
	},
	{
		key   : 'shipper',
		title : t('airOceanTracking:tracking_shipment_config_label_1'),
		func  : 'renderShipperConsignee',
		width : '19%',

	},
	{
		key   : 'consignee',
		title : t('airOceanTracking:tracking_shipment_config_label_2'),
		func  : 'renderShipperConsignee',
		width : '18%',

	},
	{
		key   : 'portPair',
		title : t('airOceanTracking:tracking_shipment_config_label_3'),
		func  : 'renderPortPair',
		width : '28%',

	},
	{
		key   : 'input',
		title : t('airOceanTracking:tracking_shipment_config_label_4'),
		width : '25%',

	},
];

export default getShipmentConfig;
