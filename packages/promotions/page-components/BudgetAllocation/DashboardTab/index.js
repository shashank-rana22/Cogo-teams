import { Loader } from '@cogoport/components';
import currencyCode from '@cogoport/globalization/constants/currencyCode';

import useGetPromotionBudgetDashboard from '../../../hooks/useGetPromotionBudgetDashboard';

import BudgetGenerator from './BudgetGenerator';
import Graph from './Graph';
import ProgressPercent from './ProgressPercent';
import StatsAllotedBudget from './StatsAllotedBudget';
import StatsPromoCodes from './StatsPromoCodes';
import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;

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

	return (
		<div>
			<BudgetGenerator
				budgetId={data?.total_budget?.id}
				amount={data?.total_budget?.amount || DEFAULT_AMOUNT}
				refetchDashboard={fetchDashboardData}
				params={params}
				setParams={setParams}
			/>
			<div className={styles.stats}>
				<div className={styles.stats_item}>
					<StatsAllotedBudget
						amount={data?.alloted_budget || DEFAULT_AMOUNT}
						params={params}
					/>
				</div>
				<div className={styles.stats_item}>
					<StatsPromoCodes
						title="Promo Codes Created"
						number={data?.promocodes_created_number}
						amount={data?.promocode_created_amount || DEFAULT_AMOUNT}
						params={params}
					/>
				</div>
				<div className={styles.stats_item}>
					<StatsPromoCodes
						title="Promo Codes Used"
						number={data?.promocode_used_number}
						amount={data?.promocode_used_amount || DEFAULT_AMOUNT}
						params={params}
					/>
				</div>
			</div>
			<Graph dataKeys={data} />
			<ProgressPercent
				allotedBudget={data?.alloted_budget || DEFAULT_AMOUNT}
				promoUsed={data?.promocode_used_amount || DEFAULT_AMOUNT}
				promoCreated={data?.promocode_created_amount || DEFAULT_AMOUNT}
				params={params}
			/>
		</div>
	);
}

export default DashboardTab;
