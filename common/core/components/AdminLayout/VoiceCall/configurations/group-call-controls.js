import { asyncFieldsListAgents } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { IcMCallbarge, IcMCallwhisper, IcMCallmonitor, IcMCalltransfer } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';

export const ICON_MAPPING = {
	monitor  : IcMCallmonitor,
	whisper  : IcMCallwhisper,
	barge    : IcMCallbarge,
	transfer : IcMCalltransfer,
};

export const useGetControls = () => {
	const servetelAgentOptions = useGetAsyncOptions(
		merge(asyncFieldsListAgents(), {
			params: {
				status_not: 'inactive',
			},
		}),

	);

	const controls = {
		agent: {
			name        : 'agent_id',
			type        : 'select',
			label       : 'Agent',
			placeholder : 'select agent',
			...servetelAgentOptions,
			rules       : { required: 'this is required' },
		},
		actionType: {
			name    : 'live_call_action_type',
			type    : 'checkbox',
			label   : '',
			options : [
				{ label: 'monitor', value: 'monitor', icon: IcMCallmonitor },
				{ label: 'whisper', value: 'whisper', icon: IcMCallwhisper },
				{ label: 'Add to Call', value: 'barge', icon: IcMCallbarge },
				{ label: 'transfer', value: 'transfer', icon: IcMCalltransfer },
			],
		},
	};

	return controls;
};
