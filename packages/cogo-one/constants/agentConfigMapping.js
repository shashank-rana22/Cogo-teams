import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAgentManagement, IcMLock } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

const AGENT_CONFIG_MAPPING = [
	{
		label : 'Agents',
		name  : 'list_agents',
		icon  : <IcMAgentManagement width={40} height={40} />,
	},
	{
		label : 'Lock Screen',
		name  : 'lock_configuration',
		icon  : <IcMLock width={40} height={40} />,
	},
	{
		label : 'Agents Status',
		name  : 'agents_status',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.agent_current_status}
			height={42}
			width={42}
			alt="agent-status"
		/>,
	},
	{
		label : 'Switch View',
		name  : 'switch_views',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.switch_view}
			height={50}
			width={50}
			alt="switch-view"
		/>,
	},
];

export default AGENT_CONFIG_MAPPING;
