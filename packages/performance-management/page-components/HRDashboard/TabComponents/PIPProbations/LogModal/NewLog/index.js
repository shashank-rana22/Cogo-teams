import { Textarea, Chips, Checkbox } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function NewLog() {
	const [multiSelected, setMultiSelected] = useState([]);
	const [checkList, setCheckList] = useState([false, false, false]);

	const chipList = [{
		key      : 'Email',
		children : 'Email',
	},
	{
		key      : 'Performance',
		children : 'Performance',
	},
	{
		key      : 'Meeting',
		children : 'Meeting',
	},
	{
		key      : 'Manager',
		children : 'Manager',
	}];

	return (
		<div>
			<div className={styles.lable}>Select Tags</div>

			<Chips
				size="lg"
				enableMultiSelect
				items={chipList}
				selectedItems={multiSelected}
				onItemChange={setMultiSelected}
			/>

			<div className={styles.lable}>Add Note</div>

			<Textarea style={{ height: '120px' }} name="comments" size="lg" placeholder="Text Area" />
			<Checkbox
				className={styles.checkbox}
				label="Email sent to Employee"
				checked={checkList[0]}
				onChange={() => setCheckList(!checkList[0])}
			/>
			<Checkbox
				className={styles.checkbox}
				label="Email sent to Manager"
				checked={checkList[1]}
				onChange={() => setCheckList(!checkList[1])}
			/>
			<Checkbox
				className={styles.checkbox}
				label="Final discussion held"
				checked={checkList[2]}
				onChange={() => setCheckList(!checkList[2])}
			/>
		</div>
	);
}
export default NewLog;
