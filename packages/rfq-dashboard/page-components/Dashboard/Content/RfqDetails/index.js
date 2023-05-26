import { useState, useEffect } from 'react';

// import { data } from '../../../../configurations/list-dummy-data';

import Filter from './Filter';
import List from './List';
import styles from './styles.module.css';

function RfqDetails(props) {
	const [checkedItems, setCheckedItems] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const { list = [] } = props;

	useEffect(() => {
		setSelectAll(checkedItems.length === list.length);
	}, [list.length, checkedItems.length]);

	return (
		<div className={styles.container}>
			<Filter
				{...props}
				data={list}
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
				selectAll={selectAll}
			/>
		</div>
	);
}

export default RfqDetails;
