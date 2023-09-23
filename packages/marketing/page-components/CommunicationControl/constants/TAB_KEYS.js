import AllCustomers from '../components/Dashboard/AllCustomers';
import ChannelConfiguration from '../components/Dashboard/ChannelConfiguration';
import ChannelControl from '../components/Dashboard/ChannelControl';
import SegmentControl from '../components/Dashboard/SegmentControl';
import VoiceAgent from '../components/Dashboard/VoiceAgent';

const TAB_KEYS = [
	{
		label     : 'Channel Control',
		name      : 'channel_control',
		component : ChannelControl,
	},
	{
		label     : 'Segment Control',
		name      : 'segment_control',
		component : SegmentControl,
	},
	{
		label     : 'All Customers',
		name      : 'all_customers',
		component : AllCustomers,
	},
	{
		label     : 'Voice Agent',
		name      : 'voice_agent',
		component : VoiceAgent,
	},
	{
		label     : 'Channel Configuration',
		name      : 'channel_configuration',
		component : ChannelConfiguration,
	},
];
export default TAB_KEYS;
