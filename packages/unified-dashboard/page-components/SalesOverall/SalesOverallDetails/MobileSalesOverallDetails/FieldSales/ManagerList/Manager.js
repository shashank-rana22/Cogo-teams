import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import EmployeeList from './EmployeeList';
import NoData from './NoData';
import styles from './styles.module.css';

function Manager({ val = {}, currency, filters }) {
	const [showManagerList, setShowManagerList] = useState(false);

	return (
		<div className={styles.container}>
			<div>
				<div>
					<div>
						<div>Team / Person</div>
						<div>
							<div
								className={styles.revenue_arrow}
								onClick={() => {
									setShowManagerList(!showManagerList);
								}}
								role="button"
								tabIndex="0"
							>
								<IcMArrowRotateDown
									className={showManagerList ? styles.colllapse_icon_active
										: styles.colllapse_icon_inactive}
								/>
								<div className={styles.text_tag}>

									{val.title}
								</div>
								{val.role_name?.length && (
									<>
                &nbsp;
										<span className={styles.role_name}>
											(
											{val.role_name}
											)
										</span>
									</>
								)}
							</div>
						</div>
					</div>
					<div className={styles.section}>
						<div>
							Quotations Sent
						</div>
						<div className={styles.revenue_gap}>
							<div className={styles.revenue_col_2}><b>Amount</b></div>
							<div className={styles.revenue_col_2}><b>#quotes</b></div>
							<div className={styles.revenue_col_2}><b>#cust</b></div>
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
								{val?.quote_sent?.quotations_count || 0}
							</div>
							<div className={styles.revenue_col}>
								{val?.quote_sent?.customers_count || 0}
							</div>
						</div>
					</div>
					<div className={styles.section}>
						<div>
							Bookings Confirmed
						</div>
						<div className={styles.revenue_gap}>
							<div className={styles.revenue_col_2}><b>Amount</b></div>
							<div className={styles.revenue_col_2}><b>#bookings</b></div>
							<div className={styles.revenue_col_2}><b>#cust</b></div>
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
								{val?.bookings_confirmed?.booking_confirmed_count || 0}
							</div>
							<div className={styles.revenue_col}>
								{val?.bookings_confirmed?.customers_count}
							</div>
						</div>
					</div>
					<div className={styles.section}>
						<div>
							Invoiced Revenue
						</div>
						<div className={styles.revenue_gap}>
							<div className={styles.revenue_col_3}><b>Amount</b></div>
							<div className={styles.revenue_col_3}><b>#cust</b></div>
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
				</div>
			</div>
			{showManagerList ? (
				<EmployeeList currency={currency} data={val} filters={filters} />
			) : (
				<NoData showGrid={showManagerList} entity="Employees" />
			)}
		</div>
	);
}

export default Manager;
