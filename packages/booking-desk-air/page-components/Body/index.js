import { EmptyState } from '@cogoport/air-modules';
import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import Loader from '../../commons/Loader';

import ListCard from './ListCard';
import styles from './styles.module.css';

const INITIAL_PAGE = 1;
const TOTAL_COUNT_FOR_PAGINATION = 0;
const SIZE_FOR_SHIPMENT_PAGE = 10;

function Body({ data = {}, loading = false, setPage = () => {} }) {
	const { list = [], total_count = 0, page = 0 } = data;

	const handlePageChange = (pageVal) => {
		setPage(pageVal);
	};
	return (
		<div className={styles.body_container}>
			{loading ? <Loader />
				: (
					<div>
						{isEmpty(list) ? (
							<EmptyState
								height="50%"
								width="50%"
								emptyText="No Shipments found !!"
								subEmptyText="Looks like no results were found..."
							/>
						) : (
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
										totalItems={total_count || TOTAL_COUNT_FOR_PAGINATION}
										currentPage={page || INITIAL_PAGE}
										pageSize={SIZE_FOR_SHIPMENT_PAGE}
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

export default Body;
