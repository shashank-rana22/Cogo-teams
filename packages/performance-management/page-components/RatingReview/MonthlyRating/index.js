import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCStarfull } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import useGetListRatingYears from '../hooks/useGetListRatingYears';

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
		// location,
		// setLocation,
		// department,
		// setDepartment,
		showUnrated,
		setShowUnrated,
		refetch,
		cycle_month,
		setFilterMonth,
		filter_month,
		filter_year,
		setFilterYear,
	} = useMonthlyRating({ props });

	const { loading: year_loading, data:month_year_data } = useGetListRatingYears();

	const [years_to_show, setYearsToShow] = useState([]);
	const [months_to_show, setMonthsToShow] = useState([]);

	useEffect(() => {
		if (!year_loading) {
			const yearsArray = month_year_data?.map((item) => ({
				label : item?.year,
				value : item?.year,
			}));
			setYearsToShow(yearsArray);
		}
	}, [month_year_data, year_loading]);

	const handleSelectYear = (year) => {
		setFilterYear(year);
		setMonthsToShow(month_year_data?.find((item) => item.year === year).month);
	};
	const { team_rating = 0 } = paginationData || {};
	// const today = new Date();
	// const date_now = getDate(today);
	// const month_now = getMonth(today);
	// const year_now = getYear(today);

	// const options = Array.from({ length: 6 }, (_, index) => {
	// 	let monthIndex = month_now - index;
	// 	let year = year_now;

	// 	if (date_now < 21) {
	// 		monthIndex -= 1;
	// 		if (monthIndex < 0) {
	// 			monthIndex = 11;
	// 			year -= 1;
	// 		}
	// 	}

	// 	const prevMonth = new Date(year, monthIndex, date_now);
	// 	const prevMonthLabel = `${prevMonth.toLocaleString('default', { month: 'long' })} - ${prevMonth.getFullYear()}`;
	// 	const monthValue = {
	// 		month : prevMonth.getMonth() + 1,
	// 		year  : prevMonth.getFullYear(),
	// 	};

	// 	return { label: prevMonthLabel, value: monthValue };
	// });
	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<div className={styles.header}>
					<div>
						<div className={styles.title}>
							{upperCase(cycle_month)}
							{' '}
							RATINGS
						</div>
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
					{
						props?.activeTab === 'hrbp_view' || props?.activeTab === 'functional_manager'
							? (
								<div style={{ display: 'flex' }}>
									<Select
										value={filter_year}
										onChange={(val) => { handleSelectYear(val); }}
										placeholder="Year"
										options={years_to_show}
										size="md"
										style={{ width: '120px', marginRight: '4px' }}
									/>
									<Select
										value={filter_month}
										onChange={(val) => { setFilterMonth(val); }}
										placeholder="Month"
										options={months_to_show}
										size="md"
										style={{ width: '120px' }}
									/>
								</div>
							)

							:								null
					}

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
					// location={location}
					// setLocation={setLocation}
					// department={department}
					// setDepartment={setDepartment}
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
