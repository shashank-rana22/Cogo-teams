import { Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import DisplayCards from './DisplayCards';
import Header from './Header';
import styles from './styles.module.css';
import useListAnnouncements from './useListAnnouncements';

function AddedAnnouncements() {
	const router = useRouter();
	const props = useListAnnouncements();

	const {
		data,
		currentAnnouncement,
		setCurrentAnnouncement,
		loading,
		deleteAnnouncement,
		activeList,
		setActiveList,
		page,
		setPage,
		paginationData,
	} = props;

	return (
		<div className={styles.container}>
			<Header
				activeList={activeList}
				setActiveList={setActiveList}
			/>

			<div className={styles.table}>
				<DisplayCards
					data={data?.list}
					activeTab={activeList}
					loading={loading}
					currentAnnouncement={currentAnnouncement}
					setCurrentAnnouncement={setCurrentAnnouncement}
					deleteAnnouncement={deleteAnnouncement}
				/>
			</div>

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={paginationData?.total_count}
					pageSize={paginationData?.page_limit}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
}

export default AddedAnnouncements;
