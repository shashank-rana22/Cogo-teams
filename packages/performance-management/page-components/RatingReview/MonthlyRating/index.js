import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCStarfull } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import TableView from './TableView';
import useMonthlyRating from './useMonthlyRating';

const COMPANY_AVERAGE_RATING = 2.5;

function MonthlyRating({ props = {} }) {
	const {
		list,
		loading,
		paginationData,
		page,
		setPage,
		search,
		setSearch,
		location,
		setLocation,
		department,
		setDepartment,
		showUnrated,
		setShowUnrated,
		refetch,
	} = useMonthlyRating({ props });

	const { team_rating = 0 } = paginationData || {};

	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<div className={styles.header}>
					<div>
						<div className={styles.title}>OCTOBER RATINGS</div>
						<div className={styles.sub_title}>Please rate your employees as you see fit</div>
					</div>
					<div className={styles.rating_container}>
						Team Rating
						<div className={styles.rating}>
							<IcCStarfull style={{ marginRight: 4 }} height="16px" width="16px" />
							{team_rating.toFixed(GLOBAL_CONSTANTS.two) || '0'}
							{' '}
							stars
						</div>
						Company Average Rating
						<div className={styles.rating}>
							<IcCStarfull style={{ marginRight: 4 }} height="16px" width="16px" />
							{COMPANY_AVERAGE_RATING}
							{' '}
							stars
						</div>
					</div>
				</div>

				{(team_rating) > COMPANY_AVERAGE_RATING ? (
					<div className={styles.remarks}>
						👏 Bravooo! Your team is doing better than most of the company. Keep it Up 🙌
					</div>
				) : (
					<div className={styles.remarks}>
						👍 Push yourself to do better. Aim to be better than most of the company!
					</div>
				)}

				<TableView
					list={list}
					loading={loading}
					paginationData={paginationData}
					page={page}
					setPage={setPage}
					search={search}
					setSearch={setSearch}
					location={location}
					setLocation={setLocation}
					department={department}
					setDepartment={setDepartment}
					props={props}
					showUnrated={showUnrated}
					setShowUnrated={setShowUnrated}
					refetch={refetch}
				/>
			</div>
		</div>
	);
}

export default MonthlyRating;
