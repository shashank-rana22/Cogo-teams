import { asyncFieldsPartnerUsers } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';

const useGetControls = ({ localStateReducer }) => {
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
				{ label: 'monitor', value: 'monitor' },
				{ label: 'whisper', value: 'whisper' },
				{ label: 'barge', value: 'barge' },
				{ label: 'transfer', value: 'transfer' },
			],
		},
	};

	return controls;
};
export default useGetControls;
