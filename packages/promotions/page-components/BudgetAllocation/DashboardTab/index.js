import { Loader } from '@cogoport/components';
import currencyCode from '@cogoport/globalization/constants/currencyCode';
import { dynamic } from '@cogoport/next';

import useGetPromotionBudgetDashboard from '../../../hooks/useGetPromotionBudgetDashboard';

import styles from './styles.module.css';

const BudgetGenerator = dynamic(() => import('./BudgetGenerator'), {
	ssr: false,
});
const StatsAllotedBudget = dynamic(() => import('./StatsAllotedBudget'), {
	ssr: false,
});

const StatsPromoCodes = dynamic(() => import('./StatsPromoCodes'), {
	ssr: false,
});

const Graph = dynamic(() => import('./Graph'), { ssr: false });

const ProgressPercent = dynamic(() => import('./ProgressPercent'), { ssr: false });

function DashboardTab() {
	const {
		data = {},
		loading = {},
		params = {},
		setParams = () => {},
		fetchDashboardData = () => {},
	} = useGetPromotionBudgetDashboard({
		defaultParams: {
			currency: currencyCode.USD,
		},
	});

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader themeType="primary" />
			</div>
		);
	}

	const {
		alloted_budget = 0, promocodes_created_number, promocode_created_amount,
		promocode_used_number, promocode_used_amount,
	} = data || {};

	return (
		<div>
			<BudgetGenerator
				budgetId={data?.total_budget?.id}
				amount={data?.total_budget?.amount}
				refetchDashboard={fetchDashboardData}
				params={params}
				setParams={setParams}
			/>
			<div className={styles.stats}>
				<div className={styles.stats_item}>
					<StatsAllotedBudget
						amount={alloted_budget}
						params={params}
					/>
				</div>
				<div className={styles.stats_item}>
					<StatsPromoCodes
						title="Promo Codes Created"
						number={promocodes_created_number}
						amount={promocode_created_amount}
						params={params}
					/>
				</div>
				<div className={styles.stats_item}>
					<StatsPromoCodes
						title="Promo Codes Used"
						number={promocode_used_number}
						amount={promocode_used_amount}
						params={params}
					/>
				</div>
			</div>

			<Graph dataKeys={data} />

			<ProgressPercent
				allotedBudget={alloted_budget}
				promoUsed={promocode_used_amount}
				promoCreated={promocode_created_amount}
				params={params}
			/>
		</div>
	);
}

export default DashboardTab;
