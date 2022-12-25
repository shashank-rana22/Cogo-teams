import { TabPanel, Tabs, Pagination } from '@cogoport/components';

import getFieldsByTab from '../../constants/config';
import TABS_MAPPING from '../../constants/tabs';
import useGetLocationsList from '../../hooks/useGetLocationsList';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function PageView({ onClickCard = () => {}, setSelectedLocation = () => {}, setSideBar = () => {} }) {
	const {
		list,
		filters,
		loading,
		hookSetters,
	} = useGetLocationsList();

	const { page, page_limit } = filters || {};

	const columns = getFieldsByTab(filters.type);

	const onTabChange = (val) => {
		hookSetters.setFilters({ ...filters, type: val, page: 1 });
		setSelectedLocation({});
		setSideBar('');
	};

	const handlePageChange = (pageNumber) => {
		hookSetters.setFilters({ ...filters, page: pageNumber });
	};

	return (
		<div className={styles.container} id="locations_main_container">
			<Tabs activeTab={filters.type} onChange={onTabChange} id="locations_tab_view">
				{TABS_MAPPING.map(({ label = '', value = '' }) => <TabPanel name={value} title={label} />)}
			</Tabs>

			<section id="locations_list_view">
				<Header columns={columns} id="locations_list_header" />
				{(list.data || []).map((item) => (
					<List
						id="locations_list_body"
						loading={loading}
						onClick={onClickCard}
						item={item}
						columns={columns}
					/>
				))}
			</section>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={list.total}
					pageSize={page_limit}
					handlePageChange={handlePageChange}
				/>
			</div>

		</div>
	);
}

export default PageView;
