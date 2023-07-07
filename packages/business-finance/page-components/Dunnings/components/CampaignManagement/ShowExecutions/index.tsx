import React, { useState, useEffect } from 'react';

import CustomList from '../../../../commons/CustomList';
import { LIST_CONFIG } from '../config/listConfig';
import useListDunningExecution from '../hooks/useListDunningExecution';
import ShowExecutionMoreData from '../ShowExecutionMoreData';
import ShowMore from '../ShowMore';

import styles from './styles.module.css';

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_PAGE_INDEX = 1;

function ShowExecutions({ rowId, functions, dropdown }) {
	const [executionSort, setExecutionSort] = useState({});
	const [executionId, setExecutionId] = useState();
	const [page, setPage] = useState(DEFAULT_PAGE_INDEX);
	const {
		data:executionData, loading,
		getDunningExecutions,
	} = useListDunningExecution({ sort: executionSort, rowId, page });

	const newFunctions = {
		...functions,
		viewMore: ({ id }) => (
			<ShowExecutionMoreData
				id={id}
				dropdown={executionId}
				setDropdown={setExecutionId}
			/>
		),
	};
	const showDropDown = (e) => <ShowMore dropdown={executionId} rowId={e?.id} />;

	useEffect(() => {
		if (dropdown !== rowId) {
			setExecutionId(null);
		} else {
			getDunningExecutions();
		}
	}, [dropdown, page, rowId, getDunningExecutions]);

	if (dropdown === rowId) {
		return (
			<div className={styles.dropdown_container_visible}>
				<div className={styles.data_container}>
					<div className={styles.custom_list}>
						<CustomList
							config={LIST_CONFIG}
							itemData={executionData}
							loading={loading}
							functions={newFunctions}
							sort={executionSort}
							setSort={setExecutionSort}
							page={page || 1}
							pageSize={DEFAULT_PAGE_SIZE}
							handlePageChange={(pageValue:number) => {
								setPage(pageValue);
							}}
							renderDropdown={showDropDown}
						/>
					</div>
				</div>
			</div>
		);
	}
	return <div className={styles.dropdown_container_invisible} />;
}

export default ShowExecutions;
