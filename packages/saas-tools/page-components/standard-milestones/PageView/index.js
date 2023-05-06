import { Pagination } from '@cogoport/components';

import getFieldsByTab from '../../../constants/config';
import useGetMilestones from '../hooks/useGetMilestones';

import Filter from './Filter';
import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function PageView({
	onClickCard = () => {},
	sideBar,
}) {
	const { list, filters = {}, loading, hookSetters } = useGetMilestones({ sideBar });

	const { data = [], fullResponse } = list || {};
	const { shipping_lines = {} } = fullResponse || {};
	const { operator = [] } = shipping_lines || {};
	const { page, page_limit } = filters || {};
	const columns = getFieldsByTab(filters.type);

	const handlePageChange = (pageNumber) => {
		hookSetters.setFilters({ ...filters, page: pageNumber });
	};

	const getRender = () => {
		if (data.length === 0 && !loading) {
			return (
				<div>
					<div className={styles.no_data}>
						No Standard Milestones
					</div>
				</div>
			);
		}
		if (loading && data.length === 0) {
			return (
				<div className={styles.loading}>
					<img
						alt="cogoport-loading"
						src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-loading.gif"
					/>
				</div>
			);
		}
		return null;
	};
	return (
		<div className={styles.container} id="milestones_main_container">
			<Filter hookSetters={hookSetters} filters={filters} id="milestones_filters" />

			<div>
				<section className={styles.list_view} id="milestones_list_view">

					<Header columns={columns} id="milestones_list_header" />
					{getRender()}
					{(data || []).map((item) => (
						<List
							key={item.shipping_line_id}
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

		</div>
	);
}

export default PageView;
