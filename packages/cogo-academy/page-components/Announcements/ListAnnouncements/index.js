import { Pagination } from '@cogoport/components';
import React from 'react';

import useCreateAnnouncements from '../CreateAnnouncement/useCreateAnnouncement';

import DisplayCards from './DisplayCards';
import Header from './Header';
import styles from './styles.module.css';
import useListAnnouncements from './useListAnnouncements';

function AddedAnnouncements() {
	const props = useListAnnouncements();

	const {
		data,
		currentAnnouncement,
		setCurrentAnnouncement,
		loading,
		loadingUpdate,
		deleteAnnouncement,
		getAnnouncementList,
		activeList,
		setActiveList,
		page,
		filters,
		setFilters,
		setPage,
		paginationData,
	} = props;

	const {
		goLive = () => {},
		loadingEditAndGoLive = false,
	} = useCreateAnnouncements({ refetchList: getAnnouncementList });
	const { total_count = 0, page_limit = 10 } = paginationData;

	return (
		<div className={styles.container}>
			<Header
				activeList={activeList}
				setActiveList={setActiveList}
				filters={filters}
				setFilters={setFilters}
			/>

			<div className={styles.table}>
				<DisplayCards
					data={data?.list}
					activeTab={activeList}
					loading={loading}
					loadingUpdate={loadingUpdate}
					loadingEditAndGoLive={loadingEditAndGoLive}
					currentAnnouncement={currentAnnouncement}
					setCurrentAnnouncement={setCurrentAnnouncement}
					deleteAnnouncement={deleteAnnouncement}
					goLive={goLive}
				/>
			</div>

			{total_count === 0 ? null : (
				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setPage}
					/>
				</div>
			)}

		</div>
	);
}

export default AddedAnnouncements;
