import { Tabs, TabPanel, Pagination, Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import Image from 'next/image';

import tableTabs from '../../../configurations/table-tabs';

import styles from './styles.module.css';
import TableColumns from './TableColumns';

const func = () => {};
const DEFAULT_VALUE = 0;
const DEFAULT_PAGE_LIMIT = 10;

function ListTables({
	setActiveTab = func,
	activeTab = '',
	listReferals = {},
	setListPagination = func,
	listLoading = false,
	showPopover = {},
	setShowPopover = func,
	setActivityModal = func,
	setUserData = func,

}) {
	const { tabs = [] } = tableTabs();

	const { list = [], page, total_count, page_limit } = listReferals;

	return (
		<div className={styles.container}>
			<div className={styles.table_container}>

				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					{tabs
						.map(({ name, title }) => (
							<TabPanel
								key={name}
								name={name}
								title={title}
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
										<Image
											src={GLOBAL_CONSTANTS.image_url.list_empty}
											alt="Empty State"
											width={300}
											height={250}
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
									currentPage={page || DEFAULT_VALUE}
									totalItems={total_count || DEFAULT_VALUE}
									pageSize={page_limit || DEFAULT_PAGE_LIMIT}
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
