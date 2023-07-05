import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState/EmptyState';

import Filter from './Filter';
import List from './List';
import ListLoading from './List/ListLoading';
import styles from './styles.module.css';

function RfqDetails(props) {
	const [checkedItems, setCheckedItems] = useState([]);
	const [selectAll, setSelectAll] = useState(false);
	const { list = [], loading, getRfqsForApproval } = props;

	useEffect(() => {
		setSelectAll(checkedItems.length === list.length && list.length !== 0);
	}, [list.length, checkedItems.length]);

	if (!loading && isEmpty(list)) {
		return (
			<div className={styles.emptycontainer}>

				<Filter
					{...props}
					data={list}
					selectAll={selectAll}
					checkedItems={checkedItems}
					setSelectAll={setSelectAll}
					setCheckedItems={setCheckedItems}
					getRfqsForApproval={getRfqsForApproval}
				/>

				<div>
					<EmptyState
						height="250"
						width="400"
						flexDirection="column"
						alignItems="center"
						emptyText="Data Not Found"
						textSize="20"
						marginTop="100px"
					/>
				</div>
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
				getRfqsForApproval={getRfqsForApproval}

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
