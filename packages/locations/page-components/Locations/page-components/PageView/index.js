import { TabPanel, Tabs, Pagination, Table } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getFieldsByTab from '../../../../constants/config';
import getTabsMapping from '../../../../constants/tabs';
import useGetLocationsList from '../../../../hooks/useGetLocationsList';
import Filter from '../Filters';
import Header from '../Header';

import styles from './styles.module.css';

function PageView({ onClickCard = () => {}, setSelectedLocation = () => {}, setSideBar = () => {} }) {
	const { t } = useTranslation(['locations']);

	const {
		data,
		filters,
		loading,
		setFilters,
	} = useGetLocationsList();

	const { page, page_limit, type } = filters || {};

	const columns = getFieldsByTab({ type, t });

	const tabsMapping = getTabsMapping({ t });

	const onTabChange = (val) => {
		setFilters({ ...filters, type: val, page: 1 });
		setSelectedLocation({});
		setSideBar('');
	};

	const handlePageChange = (pageNumber) => {
		setFilters({ ...filters, page: pageNumber });
	};
	return (
		<div className={styles.container} id="locations_main_container">

			<Header setFilters={setFilters} filters={filters} activeTab={filters.type} />

			<Tabs themeType="primary" activeTab={filters.type} onChange={onTabChange} id="locations_tab_view">
				{(tabsMapping || []).map(({
					label = '',
					value = '',
				}) => <TabPanel key={label} name={value} title={label} />)}
			</Tabs>

			<Table
				className={styles.table}
				columns={columns}
				data={data?.list || []}
				loading={loading}
				onRowClick={onClickCard}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={data?.total_count}
					pageSize={page_limit}
					onPageChange={handlePageChange}
				/>
			</div>

		</div>
	);
}

export default PageView;
