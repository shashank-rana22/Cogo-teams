import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMDummyCircle, IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import MyResponsiveBar from '../MyResponsiveBar';

import styles from './styles.module.css';

const COMPARE_LOSS = GLOBAL_CONSTANTS.zeroth_index;
const HUNDRED = 100;

function CompanyPaymentOverview({ graphItem = [] }) {
	const {
		Others: others,
		Salary: salary,
		'Total Cost':total_cost,
		percent_others_increase,
		percent_salary_increase,
		percent_total_cost_increase,
	} = graphItem[COMPARE_LOSS] || {};

	return (
		<div className={styles.main_container}>
			<span className={styles.heading}>
				Company Payment Overviews
			</span>
			<div className={styles.overview_details}>
				<MyResponsiveBar data={graphItem} />
				<div className={styles.graph_legends}>
					<div className={styles.legend_data}>
						<div className={styles.legend_item}>
							Total Cost
						</div>
						<div className={styles.legend_item_value}>
							<div className={styles.profit_value}>
								{formatAmount({
									amount  : total_cost,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 2,
									},
								})}
							</div>
							<div className={
								parseInt(percent_total_cost_increase, 10) >= COMPARE_LOSS
									? styles.profit_value_icon
									: styles.loss_value_icon
							}
							>
								{parseInt(percent_total_cost_increase, 10) >= COMPARE_LOSS
									? (<IcMArrowRotateUp color="#849e4c" />)
									: (<IcMArrowRotateDown color="#bf291e" />)}
								{Math.round(percent_total_cost_increase * HUNDRED) / HUNDRED}
								%
							</div>
						</div>
					</div>
					<div className={styles.legend_data}>
						<div className={styles.legend_item}>
							<IcMDummyCircle className={styles.legend_item_salary} />
							<span>Salary</span>
						</div>
						<div className={styles.legend_item_value}>
							<div className={styles.profit_value}>
								{formatAmount({
									amount  : salary,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 2,
									},
								})}
							</div>
							<div className={
								parseInt(percent_salary_increase, 10) >= COMPARE_LOSS
									? styles.profit_value_icon
									: styles.loss_value_icon
							}
							>
								{parseInt(percent_salary_increase, 10) >= COMPARE_LOSS
									? (<IcMArrowRotateUp color="#849e4c" />)
									: (<IcMArrowRotateDown color="#bf291e" />)}
								{Math.round(percent_total_cost_increase * HUNDRED) / HUNDRED}
								%

							</div>
						</div>
					</div>
					<div className={styles.legend_data}>
						<div className={styles.legend_item}>
							<IcMDummyCircle className={styles.legend_item_others} />
							<span>Others</span>
						</div>
						<div className={styles.legend_item_value}>
							<div className={styles.profit_value}>
								{formatAmount({
									amount  : others,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 2,
									},
								})}
							</div>
							<div className={
								parseInt(percent_others_increase, 10) >= COMPARE_LOSS
									? styles.profit_value_icon
									: styles.loss_value_icon
							}
							>
								{parseInt(percent_others_increase, 10) >= COMPARE_LOSS
									? (<IcMArrowRotateUp color="#849e4c" />)
									: (<IcMArrowRotateDown color="#bf291e" />)}
								{Math.round(percent_others_increase * HUNDRED) / HUNDRED}
								%
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}

export default CompanyPaymentOverview;
