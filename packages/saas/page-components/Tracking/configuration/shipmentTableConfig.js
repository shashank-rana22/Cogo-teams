export const getTableFn = ({ associatedShipments, otherShipments, t }) => {
	const shipmentTableConfig = [
		{
			name           : 'associatedShipments',
			title          : t('airOceanTracking:tracking_shipment_table_config_label_1'),
			maxHeight      : '15vh',
			emptyStateText : t('airOceanTracking:tracking_shipment_table_config_empty_state_1'),
		},
		{
			name           : 'otherName',
			title          : t('airOceanTracking:tracking_shipment_table_config_label_2'),
			maxHeight      : '20vh',
			emptyStateText : t('airOceanTracking:tracking_shipment_table_config_empty_state_2'),
		},
	];

	return shipmentTableConfig.map((config) => ({
		...config,
		filteredList: config.name === 'associatedShipments' ? associatedShipments : otherShipments,
	}));
};
