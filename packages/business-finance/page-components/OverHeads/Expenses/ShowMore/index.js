import { Placeholder } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Filter from '../../../commons/Filters';
import TabStat from '../../commons/TabStat';
import filtersconfig from '../../Vendors/filtersconfig';
import useListExpense from '../hooks/useListExpense';
import useSendEmail from '../hooks/useSendEmail';
import useSendOverheadExpense from '../hooks/useSendOverheadExpense';

import BillList from './BillList';
import styles from './styles.module.css';

function ShowMore({ id, showExpenseModal, incidentId, TABS }) {
	const [moreData, setMoreData] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [expenseFilters, setExpenseFilters] = useState({});
	const [subActiveTab, setSubActiveTab] = useState('ALL_INVOICES');

	const { getList, listData, listLoading } = useListExpense({
		expenseFilters,
		id,
		expenseType  : 'RECURRING',
		pageIndexVal : currentPage,
		pageSizeVal  : 5,
		subActiveTab,
	});
	const totalRecords = listData?.totalRecords || 0;
	const billList = listData?.list;

	const { sendMail, loading: mailLoading } = useSendEmail();

	useEffect(() => {
		if (moreData) {
			getList();
		} else {
			setCurrentPage(1);
		}
	}, [getList, moreData, expenseFilters]);

	useEffect(() => {
		if (showExpenseModal === true) {
			setMoreData(false);
		}
	}, [showExpenseModal]);

	const handlePageChange = (pageValue) => {
		setCurrentPage(pageValue);
	};
	const { sendOverheadExpense } = useSendOverheadExpense();

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
				<div className={styles.stats_container}>
					{TABS.map(({ label, value }) => (
						<TabStat
							name={label}
							isActive={subActiveTab === value}
							key={value}
							number={listData?.stat?.[value] || 0}
							value={value}
							setSubActiveTab={setSubActiveTab}
						/>
					))}
				</div>
				<div className={styles.segmented_control}>
					<div className={styles.filtercont}>
						<Filter
							controls={filtersconfig}
							filters={expenseFilters}
							setFilters={setExpenseFilters}
						/>
					</div>
				</div>
				{listLoading ? (
					<div>
						{Array(3)
							.fill(null)
							.map((valu) => (
								<div style={{ display: 'flex' }} key={valu}>
									{Array(3)
										.fill(null)
										.map((val) => (
											<Placeholder
												key={val}
												height="50px"
												width="32%"
												margin="8px"
											/>
										))}
								</div>
							))}
					</div>
				) : (
					<div className={styles.list_container}>
						{!isEmpty(billList) ? (
							<BillList
								billList={billList}
								mailLoading={mailLoading}
								sendMail={sendMail}
								incidentId={incidentId}
								sendOverheadExpense={sendOverheadExpense}
								currentPage={currentPage}
								totalRecords={totalRecords}
								handlePageChange={handlePageChange}
							/>
						) : (
							<div
								style={{
									display       : 'flex',
									alignItems    : 'center',
									flexDirection : 'column',
									padding       : '8px',
								}}
							>
								<div
									style={{
										fontWeight : '500',
										margin     : '12px',
									}}
								>
									No data available
								</div>
								<img
									alt="no data"
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty_no_data.svg"
								/>
							</div>
						)}
					</div>
				)}
				{moreData && (
					<div className={styles.button_container}>
						<button
							className={styles.button_style}
							onClick={() => setMoreData(false)}
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
