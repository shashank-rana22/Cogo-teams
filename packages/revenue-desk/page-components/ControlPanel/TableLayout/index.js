import RowElement from './RowElement';
import styles from './styles.module.css';

const NUMBERS = {
	ONE     : 1,
	HUNDRED : 100,
};
const columnTitle = ['variables', 'current weightage', 'edit weightage'];
const list = [
	{ key: 'preferred_shipping_line', label: 'Preferred Shipping Line' },
	{ key: 'same_port_same_customer', label: 'Same Customer in Last 5 Shipments' },
	{ key: 'same_customer', label: 'Different port, same SP' },
	{ key: 'preferred_supplier', label: 'Preferred Supplier' },
	{ key: 'monthly_active_booking', label: 'Active Shipment' },
	{ key: 'allocation_ratio', label: 'Allocation Ratio' },
	{ key: 'overall_weightage', label: 'Fulfillment Ratio' },
	{ key: 'overall_weightage_2_day', label: 'Ratio 2 Day' },
	{ key: 'overall_weightage_7_day', label: 'Ratio 7 Day' },
	{ key: 'overall_weightage_30_day', label: 'Ratio 30 Day' },
	{ key: 'threshold', label: 'Profitability Cutoff' },
	{ key: 'weightage_override_cuttoff', label: 'Weightage Override Cutoff' },
];
function TableLayout({ data = {}, filter = {}, apiTrigger = () => {} }) {
	const column_width = `${NUMBERS.HUNDRED / (columnTitle.length || NUMBERS.ONE)}%`;

	return (
		<div className={styles.body}>
			<div className={styles.tableheader}>
				{columnTitle.map((item) => (
					<div
						key={item}
						style={{ width: column_width }}
						className={styles.tableheader_item}
					>
						{item}
					</div>
				))}
			</div>

			<RowElement
				list={list}
				data={data}
				columnTitle={columnTitle}
				column_width={column_width}
				filter={filter}
				refetch={apiTrigger}
			/>
		</div>
	);
}

export default TableLayout;
