import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMLiveChat, IcMCallbarge, IcMTeam, IcMAppPoc } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../helpers/viewTypeMapping';

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
		name  : 'observer',
		label : 'History',
		icon  : <Image height={20} width={20} src={GLOBAL_CONSTANTS.image_url.history_icon} alt="history" />,
	},
];

export const getSubTabsMapping = ({ viewType }) => (
	SUB_TAB_MAPPING.filter(
		(eachSubTab) => VIEW_TYPE_GLOBAL_MAPPING[viewType]?.chat_sub_tabs_access?.includes(eachSubTab.name),
	)
);
