import { asyncFieldsPartnerUsers } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { IcMCallbarge, IcMCallwhisper, IcMCallmonitor, IcMCalltransfer } from '@cogoport/icons-react';

export const ICON_MAPPING = {
	monitor  : IcMCallmonitor,
	whisper  : IcMCallwhisper,
	barge    : IcMCallbarge,
	transfer : IcMCalltransfer,
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
				{ label: 'monitor', value: 'monitor', icon: IcMCallmonitor },
				{ label: 'whisper', value: 'whisper', icon: IcMCallwhisper },
				{ label: 'barge', value: 'barge', icon: IcMCallbarge },
				{ label: 'transfer', value: 'transfer', icon: IcMCalltransfer },
			],
		},
	};

	return controls;
};
