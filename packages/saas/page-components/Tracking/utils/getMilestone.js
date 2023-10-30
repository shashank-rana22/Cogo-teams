export const getMilestone = ({ airCargoDetails = {}, t }) => ({
	origin        : t('airOceanTracking:tracking_origin_label'),
	portLoading   : airCargoDetails?.origin || t('airOceanTracking:tracking_port_loading_label'),
	portDischarge : airCargoDetails?.destination || t('airOceanTracking:tracking_port_discharge_label'),
	destination   : t('airOceanTracking:tracking_destination_label'),
});
