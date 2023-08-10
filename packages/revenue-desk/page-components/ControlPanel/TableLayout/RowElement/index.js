import { InputNumber } from '@cogoport/components';

import styles from './styles.module.css';

function RowElement({ list, column_width }) {
	return (
		<div className={styles.table}>
			{list.map((item) => (
				<div className={styles.row} key={item}>
					<div style={{ width: column_width }} className={styles.row_item}>{item}</div>
					<div style={{ width: column_width }} className={styles.row_item}>00 %</div>
					<div style={{ width: column_width }} className={styles.row_item}>
						<InputNumber
							size="md"
							placeholder="0.00%"
							max={100}
							min={0}
							step={0.1}
						/>

					</div>
				</div>
			))}
		</div>
	);
}
export default RowElement;
