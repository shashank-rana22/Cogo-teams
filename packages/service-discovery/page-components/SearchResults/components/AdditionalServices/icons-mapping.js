import { IcMAppCfs, IcMAppCustoms, IcMAppTruck } from '@cogoport/icons-react';

const ICONS_MAPPING = {
	transportation    : <IcMAppTruck width={30} height={30} />,
	haulage_freight   : <IcMAppTruck width={28} height={28} />,
	fcl_customs       : <IcMAppCustoms width={28} height={28} />,
	fcl_cfs           : <IcMAppCfs width={28} height={28} />,
	fcl_freight_local : <IcMAppCfs width={28} height={28} />,
	fcl_freight       : <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image_221.svg"
		alt="insurance"
		width={32}
		height={32}
	/>,
};

export default ICONS_MAPPING;
