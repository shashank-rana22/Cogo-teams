import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import EmptyState from '../../common/EmptyState';
import Loader from '../../common/Loader';
import DashboardContext from '../../context/DashboardContext';
import useListDocumentDesk from '../../hooks/useListDocumentDesk';
import DeskTabs from '../FTL/DeskTabs';

import ListCard from './ListCard';
import styles from './styles.module.css';

function RAIL() {
	const { setFilters = () => {} } = useContext(DashboardContext);
	const { data, loading } = useListDocumentDesk();
	const tabData = data?.pending_tasks_stats;
	const { list = [], total_count = 0, page = 0, page_limit = 0 } = data;
	const handlePageChange = (pageVal) => {
		setFilters((prev) => ({ ...prev, page: pageVal }));
	};

	return (
		<div>
			<DeskTabs tabData={tabData} />
			{loading ? <Loader />
				: (
					<div>
						{isEmpty(list) ? <EmptyState /> : (
							<div>
								{list.map((item) => {
									const { id = '' } = item;
									return (
										<ListCard key={id} item={item} />
									);
								})}
								<div className={styles.pagination_container}>
									<Pagination
										type="number"
										totalItems={total_count}
										currentPage={page}
										pageSize={page_limit}
										onPageChange={(pageVal) => handlePageChange(pageVal)}
									/>
								</div>
							</div>
						)}

					</div>
				)}

		</div>
	);
}

export default RAIL;
