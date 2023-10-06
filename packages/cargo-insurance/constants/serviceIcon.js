import { IcMFsea, IcMFairport, IcMFland } from '@cogoport/icons-react';

const SERVICE_ICON_MAPPING = {
	sea  : <IcMFsea width={20} height={20} />,
	air  : <IcMFairport width={20} height={20} />,
	road : <IcMFland width={20} height={20} />,
	SEA  : <IcMFsea width={20} height={20} />,

};

const SERICE_TYPE_MAPPING = {
	sea  : 'Ocean',
	road : 'Surface',
	air  : 'Air',
	SEA  : 'Ocean',
};

export { SERVICE_ICON_MAPPING, SERICE_TYPE_MAPPING };
