import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

// import { data } from '../../../../configurations/list-dummy-data';

import EmptyState from '../../../../common/EmptyState/EmptyState';

import Filter from './Filter';
import List from './List';
import ListLoading from './List/ListLoading';
import styles from './styles.module.css';

function RfqDetails(props) {
	const [checkedItems, setCheckedItems] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const { list = [], loading } = props;
	console.log('loading', loading);

	useEffect(() => {
		setSelectAll(checkedItems.length === list.length);
	}, [list.length, checkedItems.length]);
	if (!loading && isEmpty(list)) {
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
				<EmptyState
					height="250px"
					width="400px"
					flexDirection="column"
					emptyText="Data Not Found"
					textSize="20px"
				/>
			</div>
		);
	}

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

			{loading ? <ListLoading /> : (
				<List
					data={list}
					checkedItems={checkedItems}
					setCheckedItems={setCheckedItems}
					setSelectAll={setSelectAll}
					selectAll={selectAll}
				/>
			)}
		</div>
	);
}

export default RfqDetails;
