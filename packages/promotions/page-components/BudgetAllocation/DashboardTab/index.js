import { Loader } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import useGetPromotionBudgetDashboard from '../../../hooks/useGetPromotionBudgetDashboard';

import BudgetGenerator from './BudgetGenerator';
import Graph from './Graph';
import ProgressPercent from './ProgressPercent';
import StatsAllotedBudget from './StatsAllotedBudget';
import StatsPromoCodes from './StatsPromoCodes';
import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;

function DashboardTab() {
	const [selectedCurrency, setSelectedCurrency] = useState('USD');
	const { data, loading, refetch } = useGetPromotionBudgetDashboard({
		selectedCurrency,
	});
	const [budgetId, setBudgetId] = useState(data.total_budget?.id);
	const [budgetValue, setBudgetValue] = useState(data.total_budget?.amount || DEFAULT_AMOUNT);

	useEffect(() => {
		setBudgetId(data.total_budget?.id);
		setBudgetValue(data.total_budget?.amount || DEFAULT_AMOUNT);
	}, [data]);

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
				budgetId={budgetId}
				amount={data.total_budget?.amount || DEFAULT_AMOUNT}
				budgetValue={budgetValue}
				setBudgetValue={setBudgetValue}
				refetchDashboard={refetch}
				selectedCurrency={selectedCurrency}
				setSelectedCurrency={setSelectedCurrency}
			/>
			<div className={styles.stats}>
				<div className={styles.stats_item}>
					<StatsAllotedBudget
						amount={data?.alloted_budget || DEFAULT_AMOUNT}
						selectedCurrency={selectedCurrency}
					/>
				</div>
				<div className={styles.stats_item}>
					<StatsPromoCodes
						title="Promo Codes Created"
						number={data?.promocodes_created_number}
						amount={data?.promocode_created_amount || DEFAULT_AMOUNT}
						selectedCurrency={selectedCurrency}
					/>
				</div>
				<div className={styles.stats_item}>
					<StatsPromoCodes
						title="Promo Codes Used"
						number={data?.promocode_used_number}
						amount={data?.promocode_used_amount || DEFAULT_AMOUNT}
						selectedCurrency={selectedCurrency}
					/>
				</div>
			</div>
			<Graph dataKeys={data} />
			<ProgressPercent
				allotedBudget={data?.alloted_budget || DEFAULT_AMOUNT}
				promoUsed={data?.promocode_used_amount || DEFAULT_AMOUNT}
				promoCreated={data?.promocode_created_amount || DEFAULT_AMOUNT}
				selectedCurrency={selectedCurrency}
			/>
		</div>
	);
}

export default DashboardTab;
