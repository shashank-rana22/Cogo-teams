import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAgentManagement } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

const AGENT_CONFIG_MAPPING = [
	{
		label : 'Agents',
		name  : 'list_agents',
		icon  : <IcMAgentManagement width={40} height={40} />,
	},
	{
		label : 'Fire Base',
		name  : 'fire_base_configuration',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.firebase_configuration}
			height={44}
			width={44}
			alt="fire-base-configuration"
		/>,
	},
	{
		label : 'Shift Configuration',
		name  : 'shift_configuration',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.firebase_configuration}
			height={44}
			width={44}
			alt="fire-base-configuration"
		/>,
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
