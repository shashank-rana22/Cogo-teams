import {
	IcMLiveChat,
	IcMCallbarge,
	IcMTeam,
	IcMAppPoc,
	IcMHourglass,
} from '@cogoport/icons-react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const SUB_TAB_MAPPING = [
	{
		name  : 'all',
		label : 'All',
		icon  : <IcMLiveChat height={20} width={20} />,
	},
	{
		name  : 'groups',
		label : 'Groups',
		icon  : <IcMCallbarge height={20} width={20} />,
	},
	{
		name  : 'teams',
		label : 'Teams',
		icon  : <IcMTeam height={20} width={20} />,
	},
	{
		name  : 'contacts',
		label : 'Contacts',
		icon  : <IcMAppPoc height={20} width={20} />,
	},
	{
		name  : 'kamContacts',
		label : 'Contacts',
		icon  : <IcMAppPoc height={20} width={20} />,
	},
	{
		name  : 'observer',
		label : 'Observer',
		icon  : <IcMHourglass height={20} width={20} />,
	},
];

export const getSubTabsMapping = ({ viewType }) => (
	SUB_TAB_MAPPING.filter(
		(eachSubTab) => VIEW_TYPE_GLOBAL_MAPPING[viewType]?.chat_sub_tabs_access?.includes(eachSubTab.name),
	)
);
