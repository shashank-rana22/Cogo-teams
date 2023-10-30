import { dynamic } from '@cogoport/next';

const TAB_KEYS = [
	{
		label     : 'Channel Control',
		name      : 'channel_control',
		component : dynamic(() => import('../components/Dashboard/ChannelControl'), {
			ssr     : false,
			loading : () => <div>Loading Channel Control... </div>,
		}),
	},
	{
		label     : 'Segment Control',
		name      : 'segment_control',
		component : dynamic(() => import('../components/Dashboard/SegmentControl'), {
			ssr     : false,
			loading : () => <div>Loading Segment Control... </div>,
		}),

	},
	{
		label     : 'All Customers',
		name      : 'all_customers',
		component : dynamic(() => import('../components/Dashboard/AllCustomers'), {
			ssr     : false,
			loading : () => <div>Loading AllCustomers... </div>,
		}),
	},
	{
		label     : 'Voice Agent',
		name      : 'voice_agent',
		component : dynamic(() => import('../components/Dashboard/VoiceAgent'), {
			ssr     : false,
			loading : () => <div>Loading VoiceAgent... </div>,
		}),
	},
	{
		label     : 'Channel Configuration',
		name      : 'channel_configuration',
		component : dynamic(() => import('../components/Dashboard/ChannelConfiguration'), {
			ssr     : false,
			loading : () => <div>Loading ChannelConfiguration... </div>,
		}),
	},
];
export default TAB_KEYS;
