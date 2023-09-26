import { TabPanel, Tabs, Pagination, Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState, useRef } from 'react';

import Form from '../../../../common/SideBar/CreateUpdate/Form';
import getFieldsByTab from '../../../../constants/config';
import getTabsMapping from '../../../../constants/tabs';
import useGetLocationsList from '../../../../hooks/useGetLocationsList';
import Header from '../Header';

import List from './List';
import styles from './styles.module.css';

function PageView({ onClickCard = () => {}, setSelectedLocation = () => {}, setSideBar = () => {} }) {
	const { t } = useTranslation(['locations']);

	const {
		list,
		filters,
		loading,
		hookSetters,
	} = useGetLocationsList();

	const { page, page_limit, type } = filters || {};

	const columns = getFieldsByTab({ type, t });

	const tabsMapping = getTabsMapping({ t });

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
				{(tabsMapping || []).map(({
					label = '',
					value = '',
				}) => <TabPanel key={label} name={value} title={label} />)}
			</Tabs>

			<section className={styles.list_view} id="locations_list_view">
				<Header columns={columns} id="locations_list_header" />
				{(list.data || []).map((item) => (
					<div key={item?.id}>
						<List
							key={item?.id}
							id="locations_list_body"
							loading={loading}
							onClick={onClickCard}
							item={item}
							columns={columns}
						/>

					</div>

				))}
			</section>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={list.total}
					pageSize={page_limit}
					onPageChange={handlePageChange}
				/>
			</div>

		</div>
	);
}

export default PageView;
