import { Button, InputNumber } from '@cogoport/components';

import useCreateRDWeightages from '../../hooks/useCreateRDWeightages';

import styles from './styles.module.css';

function RowElement({ list, column_width }) {
	const { createRDWeightages, loading } = useCreateRDWeightages();

	const handelWeightages = () => {
		createRDWeightages();
	};
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
			<div className={styles.button}>
				<Button onClick={() => handelWeightages()} loading={loading}>Save</Button>
			</div>
		</div>
	);
}
export default RowElement;
