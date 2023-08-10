import RowElement from './RowElement';
import styles from './styles.module.css';

const NUMBERS = {
	ONE     : 1,
	HUNDRED : 100,
};
const columnTitle = ['variables', 'current weightage', 'edit weightage'];
const list = ['preferred_shipping_line', 'allocation_ratio', 'active_shipment', 'fulfillment_ratio'];
function TableLayout() {
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

			<RowElement list={list} columnTitle={columnTitle} column_width={column_width} />
		</div>
	);
}

export default TableLayout;
