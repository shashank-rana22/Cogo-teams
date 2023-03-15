import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import ManagerList from '../ManagerList';
import NoData from '../ManagerList/NoData';

import styles from './styles.module.css';

function Manager({ val = {}, currency, filters }) {
	const [showManagerList, setShowManagerList] = useState(false);

	return (
		<div className={styles.card_wrapper}>
			<div className={styles.row}>
				<div
					className={styles.revenue_arrow}
					onClick={() => {
						setShowManagerList(!showManagerList);
					}}
					role="button"
					tabIndex="0"
				>
					<IcMArrowRotateDown
						className={showManagerList ? styles.colllapse_icon_active : styles.colllapse_icon_inactive}
					/>
					<div className={styles.text_tag}>
						{val.title}
					</div>
				</div>

				<div className={styles.revenue_gap}>
					<div className={styles.revenue_col}>
						{formatAmount({
							amount  : val?.quote_sent?.amount || 0,
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
						{val?.quote_sent?.quotations_count}
					</div>
					<div className={styles.revenue_col}>
						{val?.quote_sent?.customers_count}
					</div>
				</div>

				<div className={styles.revenue_gap}>
					<div className={styles.revenue_col}>
						{formatAmount({
							amount  : val?.bookings_confirmed?.amount || 0,
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
						{val?.bookings_confirmed?.booking_confirmed_count}
					</div>
					<div className={styles.revenue_col}>
						{val?.bookings_confirmed?.customers_count}
					</div>
				</div>

				<div className={styles.revenue_gap}>
					<div className={styles.revenue_col}>
						{formatAmount({
							amount  : val?.revenue?.revenue_amount || 0,
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
						{val?.revenue?.customers_count || 0}
					</div>
				</div>

			</div>

			{showManagerList ? (
				<ManagerList
					currency={currency}
					data={val?.managers}
					filters={filters}
					managerPad={20}
				/>
			) : (
				<NoData showGrid={showManagerList} entity="Employees" />
			)}
		</div>
	);
}

export default Manager;
