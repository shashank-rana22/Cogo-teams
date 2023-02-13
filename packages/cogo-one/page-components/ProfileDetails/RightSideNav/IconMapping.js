import {
	IcMProfile,
	IcMFtimer,
	IcMDuplicate,
	IcMManufacturing,
	IcMRolesIncluded,
	IcMLogout,
} from '@cogoport/icons-react';

const IconMapping = [
	{
		name : 'profile',
		icon : <IcMProfile width={25} height={25} fill="#EE3425" />,
	},
	{
		name : 'time',
		icon : <IcMFtimer width={25} height={25} fill="#000000" />,
	},
	{
		name : 'abc',
		icon : <IcMDuplicate width={25} height={25} fill="#000000" />,
	},
	{
		name : 'xys',
		icon : <IcMManufacturing width={25} height={25} fill="#000000" />,
	},
	{
		name : 'rojr',
		icon : <IcMRolesIncluded width={25} height={25} fill="#000000" />,
	},
	{
		name : 'eopiwe',
		icon : <IcMLogout width={25} height={25} fill="#000000" />,
	},
];
export default IconMapping;
