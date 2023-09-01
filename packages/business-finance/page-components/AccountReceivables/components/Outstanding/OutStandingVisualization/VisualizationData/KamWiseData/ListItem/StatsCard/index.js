import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import { STATS_KEY_MAPPING } from '../../../../../../../constants/account-type';

import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;
function StatsCard({ item = {}, activeBucket = '' }) {
	const { currency } = item || {};
	return (
		<div className={styles.invoices_card}>
			<div className={styles.ageing_card}>
				<div style={{ marginRight: '30px' }}>
					<div className={styles.left_container}>
						<div className={styles.styled_heading}>OPEN INVOICES</div>
						<div className={styles.amount}>
							{formatAmount({
								amount  : item.open_invoice_amount || DEFAULT_AMOUNT,
								currency,
								options : {
									currencyDisplay : 'code',
									style           : 'currency',
								},
							})}
						</div>
					</div>
				</div>
				{(STATS_KEY_MAPPING || []).map((val) => {
					const active = Array.isArray(activeBucket)
						? activeBucket.some((bucket) => bucket === val.valueKey)
						: val.valueKey === activeBucket;
					const COLORS = val.textColor;
					return (
						<div key={val.valueKey} style={{ width: '12%' }}>
							<div
								className={cl`${styles.due_ageing} ${active && styles.due_ageing_bucket}`}
							>
								<div className={styles.ageing_data}>
									<div className={styles.label}>{val.label}</div>
									<div className={styles.amount} style={{ color: COLORS }}>
										{formatAmount({
											amount  : item[val.valueKey] || DEFAULT_AMOUNT,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
											},
										})}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default StatsCard;
