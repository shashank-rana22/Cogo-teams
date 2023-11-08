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

const CustomerBased = dynamic(
	() => import('./TransactionsFunnel/CustomerBased'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const ServiceBased = dynamic(
	() => import('./TransactionsFunnel/ServiceBased'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const CustomerInteractionFunnel = dynamic(
	() => import('./TransactionsFunnel/CustomerInteractionFunnel'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const ServicesWiseBifurcation = dynamic(
	() => import('./TransactionsFunnel/ServicesWiseBifurcation'),
	{
		ssr     : false,
		loading : () => <LoaderComp />,
	},
);

const CHANNELS = ['emails', 'whatsapp', 'calls'];

function getComponentMapping({ filterParams = {} }) {
	return [
		{
			key          : 'total_revenue',
			Comp         : RevenueContainer,
			initialLoad  : true,
			widgetBlocks : ['get_total_revenue_data'],
		},
		{
			key          : 'per_agent_data',
			Comp         : PerAgentData,
			initialLoad  : true,
			widgetBlocks : ['get_per_agent_data'],
		},
		{
			key          : 'analytics',
			Comp         : Analytics,
			initialLoad  : true,
			widgetBlocks : ['get_analytics_data'],
		},
		{
			key          : 'user_data',
			Comp         : UserData,
			initialLoad  : true,
			widgetBlocks : ['get_accounts_data'],
		},
		{
			key          : 'customer_funnel',
			Comp         : CustomerFunnel,
			initialLoad  : false,
			headerText   : 'Customer Funnel',
			widgetBlocks : ['get_customer_funnel_data'],
		},
		{
			key  : 'transactions_funnel',
			Comp : () => (
				<>
					<CustomerBased
						widgetBlocks={['get_customer_based_data']}
						filterParams={filterParams}
					/>
					<ServiceBased
						widgetBlocks={['get_service_based_data']}
						filterParams={filterParams}
					/>
				</>
			),
			initialLoad : false,
			headerText  : 'Transaction Funnel',
		},
		{
			key  : 'transactions_charts',
			Comp : () => (
				<>
					<CustomerInteractionFunnel
						widgetBlocks={['get_customer_interaction_data']}
						filterParams={filterParams}
					/>
					<ServicesWiseBifurcation
						widgetBlocks={['get_service_wise_bifurcation_data']}
						filterParams={filterParams}
					/>
				</>
			),
			initialLoad : false,
			headerText  : 'Transaction Funnel',
		},
		{
			key  : 'channel_stats',
			Comp : () => CHANNELS.map((itm) => (
				<ChannelStats
					channelType={itm}
					key={itm}
					filterParams={filterParams}
				/>
			)),
			initialLoad: false,
		},
		{
			key  : 'campaign_structure',
			Comp : () => (
				<CampaignPieChart
					widgetBlocks={['get_total_campaigns_data']}
					filterParams={filterParams}
				/>
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
			widgetBlocks     : ['get_performance_data_required'],
		},
	];
}

export default getComponentMapping;
