import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCStarfull } from '@cogoport/icons-react';
import { isEmpty, upperCase } from '@cogoport/utils';
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
		showUnrated,
		setShowUnrated,
		refetch,
		cycle_month,
		setFilters,
		filters,
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

	useEffect(() => {
		if (filters?.year) {
			setMonthsToShow(month_year_data?.find((item) => item.year === filters.year).month);
		}
	}, [filters.year, month_year_data]);

	const handleSelectYear = (year) => {
		// setFilterYear(year);
		setFilters((prev) => ({ ...prev, year }));
		setMonthsToShow(month_year_data?.find((item) => item.year === year).month);
	};

	const { team_rating = 0 } = paginationData || {};

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
										value={filters?.year}
										onChange={(val) => { handleSelectYear(val); }}
										placeholder="Year"
										options={years_to_show}
										size="md"
										style={{ width: '120px', marginRight: '4px' }}
									/>
									{!isEmpty(filters?.month) && !isEmpty(months_to_show) && filters?.month > 0 && (
										<Select
											value={filters?.month}
											onChange={(val) => {
												setFilters((prev) => ({ ...prev, month: val }));
											}}
											placeholder="Month"
											options={months_to_show}
											size="md"
											style={{ width: '120px' }}
										/>
									)}
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
