import { IcMListView, IcMMap } from '@cogoport/icons-react';

const getTabMapping = ({ t }) => ({
	ocean : t('airOceanTracking:ocean_toggle_label'),
	air   : t('airOceanTracking:air_toggle_label'),
});

const getViewMapping = ({ t }) => ({
	All                : t('airOceanTracking:tracking_table_view_option_1'),
	CONTAINER_NO       : t('airOceanTracking:tracking_table_view_option_2'),
	'BOOKING_NO/BL_NO' : t('airOceanTracking:tracking_table_view_option_3'),
});

const DASHBOARD_VIEW_MAPPING = {
	list : <IcMListView width={20} height={20} />,
	map  : <IcMMap width={20} height={20} />,
};

export { getTabMapping, getViewMapping, DASHBOARD_VIEW_MAPPING };
