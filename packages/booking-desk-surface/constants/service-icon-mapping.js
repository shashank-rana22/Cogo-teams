import {
	IcMFtrailorFull,
	IcMFtrailorEmpty,
	IcASurfaceFttRail,
} from '@cogoport/icons-react';

const SERVICE_ICON_MAPPINGS = {
	ftl_freight: {
		icon : <IcMFtrailorFull />,
		text : 'FTL',
	},
	ltl_freight: {
		icon : <IcMFtrailorEmpty />,
		text : 'LTL',
	},
	rail_domestic_freight: {
		icon : <IcASurfaceFttRail />,
		text : 'RAIL',
	},
};
export default SERVICE_ICON_MAPPINGS;
