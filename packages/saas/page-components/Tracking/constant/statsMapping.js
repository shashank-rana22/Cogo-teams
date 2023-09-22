import { IcMAlert, IcMFdetention, IcMFhighCubeContainer } from '@cogoport/icons-react';

const getStatsMapping = ({ t }) => [
	{
		label        : t('airOceanTracking:tracking_stats_label_1'),
		value        : 'on_track_shipments',
		dashboardKey : 'on_track',
		icon         : <IcMFhighCubeContainer width={25} height={25} />,
	},
	{
		label        : t('airOceanTracking:tracking_stats_label_2'),
		value        : 'shipments_delayed',
		dashboardKey : 'delayed',
		icon         : <IcMFdetention width={25} height={25} />,
	},
	{
		label        : t('airOceanTracking:tracking_stats_label_3'),
		value        : 'attention_required',
		dashboardKey : 'attention',
		icon         : <IcMAlert width={20} height={20} fill="#F9AE64" />,
	},
];

export default getStatsMapping;
