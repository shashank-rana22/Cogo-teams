import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['milestone']);
	const { list, filters = {}, loading = false, hookSetters } = useGetMilestones({ sideBar });

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
			<Filter hookSetters={hookSetters} filters={filters} id="milestones_filters" />

			<div>
				<section className={styles.list_view} id="milestones_list_view">

					<Header columns={columns} id="milestones_list_header" />

					{loading ? (
						<div className={styles.loading}>
							<Image
								src={GLOBAL_CONSTANTS.image_url.network_loader}
								width={200}
								height={200}
								alt={t('milestone:loader_alt')}
							/>
						</div>
					) : null}

					{isEmpty(data) && !loading ? (
						<div>
							<div className={styles.no_data}>
								{t('milestone:empty_milestone')}
							</div>
						</div>
					) : null}

					{(data || []).map((item) => (
						<List
							key={item?.id}
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
