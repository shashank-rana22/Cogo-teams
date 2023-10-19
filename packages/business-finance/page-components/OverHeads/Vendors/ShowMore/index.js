/* eslint-disable max-len */
import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Filter from '../../../commons/Filters';
import SegmentedControl from '../../../commons/SegmentedControl';
import List from '../../commons/List';
import filtersconfig from '../filtersconfig';
import useListExpense from '../hooks/useListExpense';
import configs from '../utils/config';

import functions from './getFunctions';
import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'Recurring',
		value : 'RECURRING',
	},
	{
		label : 'Non-Recurring',
		value : 'NON_RECURRING',
	},
];

function ShowMore({ vendorId = '' }) {
	const [moreData, setMoreData] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const [expenseType, setExpenseType] = useState('NON_RECURRING');
	const [filters, setFilters] = useState({});

	const { getList, listData, listLoading } = useListExpense({ filters });

	const { EXPENSE_CONFIG } = configs();

	const handlePageChange = (pageValue) => {
		setPageIndex(pageValue);
	};

	useEffect(() => {
		if (moreData) {
			getList({ vendorId, expenseType, pageIndex, pageSize: 5 });
		}
	}, [expenseType, getList, moreData, pageIndex, vendorId]);

	useEffect(() => {
		setPageIndex(1);
	}, [expenseType]);

	return (
		<div className={styles.container}>
			{!moreData && (
				<div className={styles.button_container}>
					<button
						className={styles.button_style}
						onClick={() => setMoreData(true)}
					>
						<div>Show more</div>
						{' '}
						<div style={{ marginBottom: '-4px' }}>
							<IcMArrowDown />
						</div>
					</button>
				</div>
			)}
			<div
				className={
					moreData
						? styles.more_data_container
						: `${styles.more_data_container} ${styles.more_data_container_close}`
				}
			>
				<div className={styles.list_container}>
					{listLoading ? (
						<div>
							<div style={{ display: 'flex' }}>
								{[1, 2, 3].map((val) => (
									<Placeholder
										key={val}
										height="50px"
										width="32%"
										margin="8px"
									/>
								))}
							</div>
							<div style={{ display: 'flex' }}>
								{[1, 2, 3].map((val) => (
									<Placeholder
										key={val}
										height="50px"
										width="32%"
										margin="8px"
									/>
								))}
							</div>
							<div style={{ display: 'flex' }}>
								{[1, 2, 3].map((val) => (
									<Placeholder
										key={val}
										height="50px"
										width="32%"
										margin="8px"
									/>
								))}
							</div>
						</div>
					) : (
						<div style={{ padding: '20px' }}>
							<div className={styles.segmented_control}>
								<div>
									<SegmentedControl
										options={OPTIONS}
										activeTab={expenseType}
										setActiveTab={setExpenseType}
										color="#ED3726"
										background="#FFFAEB"
									/>
								</div>
								<div className={styles.filtercont}>
									<Filter
										controls={filtersconfig}
										filters={filters}
										setFilters={setFilters}
									/>
								</div>
							</div>
							{listData && !isEmpty(listData?.list) ? (
								<List
									config={EXPENSE_CONFIG}
									itemData={listData}
									loading={listLoading}
									functions={functions}
									page={pageIndex}
									pageSize={5}
									handlePageChange={handlePageChange}
									showPagination
								/>
							) : (
								<div className={styles.no_data}>
									<div>No data found</div>
									<img
										src={GLOBAL_CONSTANTS.image_url.no_data_found}
										alt="no data"
									/>
								</div>
							)}
						</div>
					)}
				</div>

				{moreData && (
					<div className={styles.button_container}>
						<button
							className={styles.button_style}
							onClick={() => {
								setMoreData(false);
								setExpenseType('RECURRING');
							}}
						>
							<div>Show less</div>
							{' '}
							<div style={{ marginBottom: '-4px' }}>
								<IcMArrowUp />
							</div>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ShowMore;
