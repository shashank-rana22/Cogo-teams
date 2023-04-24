import { Pagination } from '@cogoport/components';

import EventList from './EventList';
import Header from './Header';
import styles from './styles.module.css';

function EventDetails(props) {
	const {
		setEventListData, debounceQuery, loading, setSearchValue, searchValue, expertise, setExpertise,
		list = [], paginationData, getNextPage,
	} = props;

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	return (
		<div>
			<Header
				setEventListData={setEventListData}
				debounceQuery={debounceQuery}
				loading={loading}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				expertise={expertise}
				setExpertise={setExpertise}
			/>

			<div>
				<EventList
					list={list}
					setEventListData={setEventListData}
					loading={loading}
				/>

				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={getNextPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default EventDetails;
