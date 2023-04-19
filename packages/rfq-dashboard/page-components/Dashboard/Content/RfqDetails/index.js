import { useState, useEffect } from 'react';

import Filter from './Filter';
import List from './List';
import styles from './styles.module.css';

function RfqDetails(props) {
	const [checkedItems, setCheckedItems] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const data = [
		{ id: '1', name: 'apple' },
		{ id: '2', name: 'ball' },
		{ id: '3', name: 'cat' },
		{ id: '4', name: 'dog' },
	];

	useEffect(() => {
		setSelectAll(checkedItems.length === data.length);
	}, [checkedItems.length, data.length]);

	return (
		<div className={styles.container}>
			<Filter
				{...props}
				data={data}
				selectAll={selectAll}
				checkedItems={checkedItems}
				setSelectAll={setSelectAll}
				setCheckedItems={setCheckedItems}
			/>

			<List
				data={data}
				checkedItems={checkedItems}
				setCheckedItems={setCheckedItems}
				setSelectAll={setSelectAll}
			/>
		</div>
	);
}

export default RfqDetails;
