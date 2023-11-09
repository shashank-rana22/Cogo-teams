import { dynamic } from '@cogoport/next';

import { LoadingState } from '../../common/Elements';

import Analytics from './Analytics';
import PerAgentData from './PerAgentData';
import RevenueContainer from './RevenueContainer';
import styles from './styles.module.css';
import UserData from './UserData';

function DynamicLoader() {
	return (
		<div className={styles.dynamic_container}>
			<LoadingState customClassName="dynamic_loader" />
		</div>
	);
}

const CampaignPieChart = dynamic(
	() => import('./CampaignsData/CampaignPieChart'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
	},
);

const DemoPieChart = dynamic(
	() => import('./CampaignsData/DemoPieChart'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
	},
);

const ChannelStats = dynamic(
	() => import('./ChannelStats'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
	},
);

const AgentsPerformanceView = dynamic(
	() => import('./AgentsPerformanceView'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
	},
);

const AgentsExceptionList = dynamic(
	() => import('./AgentsExceptionList'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
	},
);

const CustomerFunnel = dynamic(
	() => import('./CustomerFunnel'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
	},
);

const CustomerBased = dynamic(
	() => import('./TransactionsFunnel/CustomerBased'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
	},
);

const ServiceBased = dynamic(
	() => import('./TransactionsFunnel/ServiceBased'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
	},
);

const CustomerInteractionFunnel = dynamic(
	() => import('./TransactionsFunnel/CustomerInteractionFunnel'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
	},
);

const ServicesWiseBifurcation = dynamic(
	() => import('./TransactionsFunnel/ServicesWiseBifurcation'),
	{
		ssr     : false,
		loading : () => <DynamicLoader />,
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
			key  : 'campaign_demo_charts',
			Comp : () => (
				<>
					<CampaignPieChart
						widgetBlocks={['get_total_campaigns_data']}
						filterParams={filterParams}
					/>
					<DemoPieChart
						filterParams={filterParams}
					/>
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
			widgetBlocks     : ['get_performance_data_required'],
		},
	];
}

export default getComponentMapping;
