import { Input, Popover, Tabs, TabPanel, Pagination, Table } from '@cogoport/components';
import {
	IcMSearchlight,
	IcMFilter,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import tableTabs from '../../../configurations/table-tabs';
import { listEmptyState } from '../../../constants';

import FiltersContent from './FiltersContent';
import styles from './styles.module.css';
import TableColumns from './TableColumns';

const func = () => {};

function ListTables({
	searchValue = '',
	setSearchValue = func,
	setActiveTab = func,
	activeTab = '',
	setFilter = func,
	filter = '',
	listReferals = {},
	setListPagination = func,
	listLoading = false,
	getListReferrals = func,
	showPopover = {},
	setShowPopover = func,
	setActivityModal = func,
	listCountData = {},
	setUserData = func,

}) {
	const [filterVisible, setFilterVisible] = useState(false);
	const { tabs = [] } = tableTabs({ listCountData });

	const { list = [], page, total_count, page_limit } = listReferals;

	return (
		<div className={styles.container}>
			<div className={styles.filter_container}>

				<Input
					size="sm"
					prefix={<IcMSearchlight width={18} height={18} />}
					placeholder="Search here..."
					value={searchValue}
					onChange={(val) => setSearchValue(val)}
					className={styles.input_field}
				/>

				{activeTab === 'user' && (
					<Popover
						placement="left"
						render={(
							<FiltersContent
								setFilterVisible={setFilterVisible}
								filter={filter}
								setFilter={setFilter}
								getListReferrals={getListReferrals}
								setListPagination={setListPagination}
							/>
						)}
						visible={filterVisible}
						onClickOutside={() => setFilterVisible(false)}
					>
						<IcMFilter
							className={styles.filter_icon}
							onClick={() => setFilterVisible(!filterVisible)}
						/>
					</Popover>
				)}

			</div>
			<div className={styles.table_container}>

				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					{tabs
						.map(({ name, title, badge }) => (
							<TabPanel
								key={name}
								name={name}
								title={title}
								badge={badge}
							>

								<Table
									className={styles.table_container}
									columns={TableColumns({
										activeTab,
										showPopover,
										setShowPopover,
										setActivityModal,
										setUserData,
									})}
									data={list || []}
									loading={listLoading}
									loadingRowsCount={10}
								/>
								{isEmpty(list) && !listLoading && (
									<figure className={styles.empty_state}>
										<img
											src={listEmptyState}
											height="320px"
											alt="Empty State"
										/>
										<figcaption
											className={styles.empty_state_text}
										>
											No Data Found
										</figcaption>
									</figure>
								)}
								<Pagination
									type="table"
									className={styles.pagination_container}
									currentPage={page || 0}
									totalItems={total_count || 0}
									pageSize={page_limit || 10}
									onPageChange={setListPagination}
								/>
							</TabPanel>
						))}
				</Tabs>
			</div>
		</div>
	);
}

export default ListTables;
