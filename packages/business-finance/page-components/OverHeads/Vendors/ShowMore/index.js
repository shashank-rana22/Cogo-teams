import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import SegmentedControl from '../../../commons/SegmentedControl';
import filtersconfig from '../filtersconfig';

import styles from './styles.module.css';
import VendorList from './VendorList';

function ShowMore({ vendorId = '' }) {
	const [moreData, setMoreData] = useState(false);
	const [expenseType, setExpenseType] = useState('NON_RECURRING');
	const [filters, setFilters] = useState({});

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
					<div style={{ padding: '20px' }}>
						<div className={styles.segmented_control}>
							<SegmentedControl
								options={OPTIONS}
								activeTab={expenseType}
								setActiveTab={setExpenseType}
								color="#ED3726"
								background="#FFFAEB"
							/>

							<div className={styles.filtercont}>
								<Filter
									controls={filtersconfig}
									filters={filters}
									setFilters={setFilters}
								/>
							</div>
						</div>

						<VendorList
							filters={filters}
							moreData={moreData}
							vendorId={vendorId}
							expenseType={expenseType}
						/>
					</div>
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
