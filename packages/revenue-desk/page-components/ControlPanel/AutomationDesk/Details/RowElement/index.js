import { Button, InputNumber } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import styles from './styles.module.css';

function RowElement({
	list = [],
	column_width = '', maxHeight: max,
	apiTrigger = () => {},
	deskValue = {},
	setOpenForm = () => {},
	openForm,
}) {
	const INITIAL_WEIGHT = {};
	list.map((item) => {
		const row = item?.key;
		INITIAL_WEIGHT[row] = GLOBAL_CONSTANTS.zeroth_index;
		return null;
	});
	const [weightageList, setWeightageList] = useState(INITIAL_WEIGHT);

	const setValue = ({ val, keyValue }) => {
		setWeightageList((prev) => ({ ...prev, [keyValue]: (val || GLOBAL_CONSTANTS.zeroth_index) }));
	};

	const handelWeightages = () => {
		apiTrigger({ deskValue, weightageList, setOpenForm, openForm });
	};

	return (
		<>
			<div className={styles.table} style={{ maxHeight: max, overflow: 'scroll' }}>
				{list.map((item) => (
					<div className={styles.row} key={item}>
						<div
							style={{ width: column_width }}
						>
							<div className={styles.row_subitem}>

								<div>{item.label}</div>
							</div>
						</div>

						<div style={{ width: column_width }} className={styles.row_item}>
							<InputNumber
								size="sm"
								placeholder="0.00%"
								max={100}
								step={0.1}
								onChange={(val) => setValue({ val, keyValue: item?.key })}
							/>
						</div>
					</div>
				))}
			</div>
			<div className={styles.button}>
				<Button onClick={handelWeightages} type="submit">Save</Button>
			</div>
		</>
	);
}
export default RowElement;
