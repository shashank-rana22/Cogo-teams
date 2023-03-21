import { Pagination } from '@cogoport/components';
import React from 'react';

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
		deleteAnnouncement,
		activeList,
		setActiveList,
		page,
		setPage,
		paginationData,
	} = props;

	const { total_count = 0, page_limit = 10 } = paginationData;

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
