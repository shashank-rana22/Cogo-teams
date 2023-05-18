import NoDataFound from '../../../common/NoDataFound';

import FieldSales from './FieldSales';
import styles from './styles.module.css';

function SalesOverallDetails({ currency, salesFunnel = {}, filters }) {
	const { list } = salesFunnel;
	return (
		<div className={styles.card_wrapper}>
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
			{list?.length > 0 ? (
				list.map((val) => (
					<FieldSales
						key={val.title}
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

export default SalesOverallDetails;
