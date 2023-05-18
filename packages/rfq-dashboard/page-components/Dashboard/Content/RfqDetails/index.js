import { useState, useEffect } from 'react';

import { data } from '../../../../configurations/list-dummy-data';

import Filter from './Filter';
import List from './List';
import styles from './styles.module.css';

function RfqDetails(props) {
	const [checkedItems, setCheckedItems] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const { list = [] } = props;

	// useEffect(() => {
	// 	setSelectAll(checkedItems.length === data.length);
	// }, [checkedItems.length]);

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
				data={list}
				checkedItems={checkedItems}
				setCheckedItems={setCheckedItems}
				setSelectAll={setSelectAll}
			/>
		</div>
	);
}

export default RfqDetails;
