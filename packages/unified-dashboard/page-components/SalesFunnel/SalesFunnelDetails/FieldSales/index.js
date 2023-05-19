import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import ManagerList from './ManagerList';
import styles from './styles.module.css';

function FieldSales({ val, currency, filters }) {
	const [showFieldSales, setShowFieldSales] = useState(false);
	return (
		<>
			<div className={styles.card_wrapper}>
				<div className={styles.row}>
					<div
						className={styles.revenue_arrow}
						onClick={() => setShowFieldSales(!showFieldSales)}
						role="button"
						tabIndex="0"
					>
						<IcMArrowRotateDown
							className={showFieldSales ? styles.colllapse_icon_active : styles.colllapse_icon_inactive}
						/>
						<div className={styles.text_tag}>
							{val?.channel}
						</div>
						&nbsp;
						<span className={styles.head_name}>
							{val.head_name && ` - ${val.head_name}`}
						</span>
					</div>

					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col}>
							{formatAmount({
								amount  : val?.stats?.quotations?.amount || 0,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</div>
						<div className={styles.revenue_col}>
							{val?.stats?.quotations?.count}
						</div>
						<div className={styles.revenue_col}>
							{val?.stats?.quotations?.customers_count}
						</div>
					</div>

					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col}>
							{formatAmount({
								amount  : val?.stats?.booking_confirmed?.amount || 0,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</div>
						<div className={styles.revenue_col}>
							{val?.stats?.booking_confirmed?.count || 0}
						</div>
						<div className={styles.revenue_col}>
							{val?.stats?.booking_confirmed?.customers_count}
						</div>
					</div>

					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col}>
							{formatAmount({
								amount  : val?.stats?.invoices?.amount || 0,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</div>

						<div className={styles.revenue_col}>
							{val?.stats?.invoices?.customers_count}
						</div>
					</div>

				</div>
			</div>

			{showFieldSales && (
				<ManagerList currency={currency} data={val?.list} filters={filters} />
			)}
		</>
	);
}

export default FieldSales;
