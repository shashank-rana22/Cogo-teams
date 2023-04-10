import { TabPanel, Tabs, Pagination } from '@cogoport/components';

import getFieldsByTab from '../../../constants/config';
import useGetMilestones from '../hooks/useGetMilestones';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function PageView({
	onClickCard = () => {},
	setSelected = () => {},
	setSideBar = () => {},
}) {
	const { list, filters, loading, hookSetters } = useGetMilestones();
	// const onTabChange = (val) => {
	// 	hookSetters.setFilters({ ...filters, type: val, page: 1 });
	// 	setSelected({});
	// 	setSideBar('');
	// };
	console.log(list, 'list');
	const { data = [], fullResponse } = list || {};
	const { shipping_lines = {} } = fullResponse || {};
	const { operator = [] } = shipping_lines || {};
	const { page, page_limit } = filters || {};
	const columns = getFieldsByTab(filters.type);

	const handlePageChange = (pageNumber) => {
		hookSetters.setFilters({ ...filters, page: pageNumber });
	};

	return (
		<div className={styles.container} id="milestones_main_container">
			<section className={styles.list_view} id="milestones_list_view">
				<Header columns={columns} id="milestones_list_header" />

				{(data || []).map((item) => (
					<List
						id="milestones_list_body"
						loading={loading}
						onClick={onClickCard}
						item={item}
						columns={columns}
						shippingInfo={operator[item.shipping_line_id]}
					/>
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
