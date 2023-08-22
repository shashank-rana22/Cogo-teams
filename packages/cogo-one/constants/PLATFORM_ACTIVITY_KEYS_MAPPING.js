import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAgentManagement, IcMLock } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

export const PLATFORM_ACTIVITY_KEYS_MAPPING = {
	fcl_freight: {
		origin      : 'origin_port',
		destination : 'destination_port',
	},

	fcl_customs: {
		origin      : 'port',
		destination : 'port',
	},

	fcl_freight_local: {
		origin      : 'port',
		destination : 'port',
	},

	lcl_freight: {
		origin      : 'origin_port',
		destination : 'destination_port',

	},

	lcl_customs: {
		origin      : 'location',
		destination : 'location',
	},

	air_freight: {
		origin      : 'origin_airport',
		destination : 'destination_airport',

	},

	air_customs: {
		origin      : 'airport',
		destination : 'airport',

	},

	air_freight_local: {
		origin      : 'airport',
		destination : 'airport',
	},

	domestic_air_freight: {
		origin      : 'origin_airport',
		destination : 'destination_airport',
	},

	ltl_freight: {
		origin      : 'origin_location',
		destination : 'destination_location',
	},

	ftl_freight: {
		origin      : 'origin_location',
		destination : 'destination_location',

	},

	trailer_freight: {
		origin      : 'origin_location',
		destination : 'destination_location',

	},

	haulage_freight: {
		origin      : 'origin_location',
		destination : 'destination_location',
	},

};

export const SCREEN_LOCK_MAPPING = [
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
];
