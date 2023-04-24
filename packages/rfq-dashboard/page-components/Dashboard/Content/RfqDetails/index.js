import { useState, useEffect } from 'react';

import Filter from './Filter';
import List from './List';
import styles from './styles.module.css';

function RfqDetails(props) {
	const [checkedItems, setCheckedItems] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const data = [
		{ id: '1', name: 'apple', services: ['fcl_freight', 'lcl_freight'] },
		{ id: '2', name: 'ball', services: ['fcl_freight', 'lcl_freight', 'air_freight'] },
		{ id: '3', name: 'cat', services: ['lcl_freight'] },
		{ id: '4', name: 'dog', services: ['fcl_freight', 'air_freight'] },
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
