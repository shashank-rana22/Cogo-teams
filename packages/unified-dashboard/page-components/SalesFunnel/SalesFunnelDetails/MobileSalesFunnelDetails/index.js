import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import ManagerList from './FieldSales/ManagerList';
import NoDataFound from './NoDataFound';
import styles from './styles.module.css';

function MobileFunnelHeader({
	currency,
	salesFunnel = {},
	filters,
	setFilters,
	showZone,
	setShowZone,
}) {
	const { distribution } = salesFunnel;
	const [showFieldSales, setShowFieldSales] = useState(false);

	return (
		<div className={styles.card_wrapper}>
			<div className={styles.flex}>
				<div className={styles.flex_btn}>
					<div
						className={styles.sales_filter_btn}
						style={{
							backgroundColor : showZone ? 'white' : '#333333',
							color           : showZone ? '#333333' : 'white',
						}}
						onClick={() => {
							setShowZone(false);
							setFilters((prevFilters) => ({
								...prevFilters,
								show_my_zone: false,
							}));
						}}
						size="m"
						role="button"
						tabIndex="0"
					>
						ORG
					</div>
					{/* {salesFunnel?.is_zone_head && ( */}
					<div
						className={styles.sales_filter_btn}
						style={{
							backgroundColor : !showZone ? 'white' : '#333333',
							color           : showZone ? 'white' : '#333333',
						}}
						onClick={() => {
							setShowZone(true);
							setFilters((prevFilters) => ({
								...prevFilters,
								show_my_zone: true,
							}));
						}}
						size="m"
						role="button"
						tabIndex="0"
					>
						ZONE
					</div>
					{/* )} */}
				</div>
			</div>
			<br />

			{distribution?.length > 0 ? (distribution.map((val) => (
				<div className={styles.container}>
					<div>
						<div>
							<div>
								<div>Team / Person</div>
								<div>
									<div
										className={styles.revenue_arrow}
										onClick={() => setShowFieldSales(!showFieldSales)}
										role="button"
										tabIndex="0"
									>
										<IcMArrowRotateDown
											className={showFieldSales
												? styles.colllapse_icon_active : styles.colllapse_icon_inactive}
										/>
										<div className={styles.text_tag}>
											{val?.channel}
										</div>
						&nbsp;
										<span className={styles.head_name}>
											{val.head_name && ` - ${val.head_name}`}
										</span>
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
					</div>
					{showFieldSales && (
						<ManagerList currency={currency} data={val?.list} filters={filters} />
					)}
				</div>
			))) : (
				<NoDataFound className={styles.nodata} />
			)}

		</div>
	);
}

export default MobileFunnelHeader;
