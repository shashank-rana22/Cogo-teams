import FieldSales from '../FieldSales';

import NoDataFound from './NoDataFound';
import styles from './styles.module.css';

function FunnelHeader({
	currency,
	salesFunnel = {},
	filters,
	setFilters,
	showZone,
	setShowZone,
}) {
	const { distribution } = salesFunnel;

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

						ghost={showZone}
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
						ghost={!showZone}
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
			<div className={styles.fixed_header}>
				<div className={styles.sales_row}>
					<div className={styles.revenue_col}>
						Team / Person
					</div>
					<div className={styles.revenue_col}>
						Quotations Sent
					</div>
					<div className={styles.revenue_col}>
						Bookings Confirmed
					</div>
					<div className={styles.revenue_col}>
						Invoiced Revenue
					</div>
				</div>
				<div className={styles.row_2}>
					<div className={styles.revenue_gap} />
					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col_2}><b>Amount</b></div>
						<div className={styles.revenue_col_2}><b>#quotes</b></div>
						<div className={styles.revenue_col_2}><b>#cust</b></div>
					</div>
					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col_2}><b>Amount</b></div>
						<div className={styles.revenue_col_2}><b>#bookings</b></div>
						<div className={styles.revenue_col_2}><b>#cust</b></div>
					</div>
					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col_3}><b>Amount</b></div>
						<div className={styles.revenue_col_3}><b>#cust</b></div>
					</div>

				</div>
			</div>
			{distribution?.length > 0 ? (
				distribution.map((val) => (
					<FieldSales
						key={val.channel}
						currency={currency}
						val={val}
						filters={filters}
					/>
				))
			) : (
				<NoDataFound className={styles.nodata} />
			)}
		</div>
	);
}

export default FunnelHeader;
