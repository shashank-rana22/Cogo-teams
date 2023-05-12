import { asyncFieldsPartnerUsers } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { IcMAgentManagement } from '@cogoport/icons-react';

export const ICON_MAPPING = {
	monitor  : IcMAgentManagement,
	whisper  : IcMAgentManagement,
	barge    : IcMAgentManagement,
	transfer : IcMAgentManagement,
};

export const useGetControls = ({ localStateReducer }) => {
	const servetelAgentOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(), valueKey: 'user_id',
	});

	const controls = {
		agent: {
			name         : 'agent_id',
			type         : 'select',
			label        : 'Agent',
			placeholder  : 'select agent',
			...servetelAgentOptions,
			rules        : { required: 'this is required' },
			handleChange : (obj) => localStateReducer({ latestAddedAgentName: obj?.name }),
		},
		actionType: {
			name    : 'live_call_action_type',
			type    : 'checkbox',
			label   : '',
			options : [
				{ label: 'monitor', value: 'monitor', icon: IcMAgentManagement },
				{ label: 'whisper', value: 'whisper', icon: IcMAgentManagement },
				{ label: 'barge', value: 'barge', icon: IcMAgentManagement },
				{ label: 'transfer', value: 'transfer', icon: IcMAgentManagement },
			],
		},
	};

	return controls;
};
