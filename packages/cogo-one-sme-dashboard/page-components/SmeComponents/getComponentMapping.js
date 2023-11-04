import { dynamic } from '@cogoport/next';

import { LoaderComp } from '../../common/Elements';

import Analytics from './Analytics';
import PerAgentData from './PerAgentData';
import RevenueContainer from './RevenueContainer';
import UserData from './UserData';

const CampaignPieChart = dynamic(
	() => import('./CampaignsData/CampaignPieChart'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const CustomerInteractionFunnel = dynamic(
	() => import('./CampaignsData/CustomerInteractionFunnel'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const ChannelStats = dynamic(
	() => import('./ChannelStats'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const AgentsPerformanceView = dynamic(
	() => import('./AgentsPerformanceView'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const AgentsExceptionList = dynamic(
	() => import('./AgentsExceptionList'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const CustomerFunnel = dynamic(
	() => import('./CustomerFunnel'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const TransactionsFunnel = dynamic(
	() => import('./TransactionsFunnel'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const CHANNELS = ['email', 'whatsapp', 'calls'];

function getComponentMapping() {
	return [
		{
			key         : 'total_revenue',
			Comp        : RevenueContainer,
			initialLoad : true,
		},
		{
			key         : 'per_agent_data',
			Comp        : PerAgentData,
			initialLoad : true,
		},
		{
			key         : 'analytics',
			Comp        : Analytics,
			initialLoad : true,
		},
		{
			key         : 'user_data',
			Comp        : UserData,
			initialLoad : true,
		},
		{
			key         : 'customer_funnel',
			Comp        : CustomerFunnel,
			initialLoad : false,
			headerText  : 'Customer Funnel',
		},
		{
			key         : 'transactions_funnel',
			Comp        : TransactionsFunnel,
			initialLoad : false,
			headerText  : 'Transaction Funnel',
		},
		{
			key  : 'channel_stats',
			Comp : () => CHANNELS.map((itm) => (
				<ChannelStats
					channelType={itm}
					key={itm}
				/>
			)),
			initialLoad: false,
		},
		{
			key  : 'campaign_structure',
			Comp : () => (
				<>
					<CampaignPieChart />
					<CustomerInteractionFunnel />
				</>
			),
			initialLoad: false,
		},
		{
			key         : 'agents_exception_list',
			Comp        : AgentsExceptionList,
			headerText  : 'Agents Exception List',
			initialLoad : false,
		},
		{
			key              : 'agents_performance_view',
			Comp             : AgentsPerformanceView,
			headerText       : 'Agents Performance View',
			initialLoad      : false,
			hiderAfterLoaded : true,
		},
	];
}

export default getComponentMapping;
