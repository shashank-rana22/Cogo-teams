import { IcMFsea, IcMFairport, IcMFland } from '@cogoport/icons-react';

const SERVICE_ICON_MAPPING = {
	ocean   : <IcMFsea width={20} height={20} />,
	air     : <IcMFairport width={20} height={20} />,
	surface : <IcMFland width={20} height={20} />,
};

export default SERVICE_ICON_MAPPING;
