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

function ListTables({
	searchValue = '',
	setSearchValue = () => {},
	setActiveTab = () => {},
	activeTab = '',
}) {
	const [filterVisible, setFilterVisible] = useState(false);
	const [filter, setFilter] = useState('');
	const { tabs = [] } = tableTabs();

	const listLoading = false;
	const list = [
		{
			id           : 1,
			name         : 'Rajesh Kumar',
			organisation : ['HELLOncjnnkmmkem', 'JNKJ', 'BEJ'],
			type         : 'importer_exporter',
		},
		{
			id           : 2,
			name         : 'Rajesh Kumar cowhan',
			organisation : ['HELLO', 'JNKJ', 'BEJ', 'NXJKNKMMKWMW', 'NJKKNMKMKMDEDE'],
			type         : 'channel_partner',

		},
		{
			id           : 3,
			name         : 'Rajesh Kumar',
			organisation : ['HELLO', 'JNKJ', 'BEJ'],
			type         : 'importer_exporter',
		},
		{
			id           : 4,
			name         : 'Rajesh Kumar',
			organisation : ['HELLO'],
			type         : 'channel_partner',
		},
		{
			id           : 5,
			name         : 'Rajesh Kumar cowhan naik jbj nj',
			organisation : ['HELLO', 'JNKJ', 'BEJ'],
			type         : 'importer_exporter',
		},
		{
			id           : 6,
			name         : 'Rajesh Kumar',
			organisation : ['HELLOJBJNEKMK'],
			type         : 'channel_partner',
		},

	];
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
				<Popover
					placement="left"
					render={(
						<FiltersContent
							setFilterVisible={setFilterVisible}
							filter={filter}
							setFilter={setFilter}
							// listReferrals={listReferrals}
							// setPagination={setPagination}
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
									})}
									data={list || []}
									loading={listLoading}
									// loadingRowsCount={10}
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
									currentPage={0}
									totalItems={10}
									pageSize={10}
									// currentPage={page || 0}
									// totalItems={total_count || 0}
									// pageSize={page_limit || 10}
									// onPageChange={handleOnPageChange}
								/>
							</TabPanel>
						))}
				</Tabs>
			</div>
		</div>
	);
}

export default ListTables;
