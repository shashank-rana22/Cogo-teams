import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const ONE_VALUE = 1;

function Footer({ paginationProps = {}, selectedWeek = {}, setFilters = () => {}, loading = false, schedules = [] }) {
	const { page, page_limit, total_count } = paginationProps;

	const { count = 0, start_date = '', end_date = '' } = selectedWeek;

	const initialDate = schedules[GLOBAL_CONSTANTS.zeroth_index]?.start_date;

	const finalDate = schedules[schedules.length - ONE_VALUE]?.end_date;

	const MAPPING = {
		true: {
			count,
			startDate : start_date,
			endDate   : end_date,
		},
		false: {
			count     : total_count,
			startDate : initialDate,
			endDate   : finalDate,
		},
	};

	const { count:countToShow, startDate, endDate } = MAPPING[!isEmpty(selectedWeek)];

	return (
		<div className={styles.container}>
			<div className={styles.rates_count}>
				{countToShow}
				{' '}
				{countToShow > ONE_VALUE ? 'Options available' : 'Option available'}
				{'  '}
				<span>
					between
					{' '}
					<strong>
						{formatDate({
							date       : startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						})}
						{' '}
						&
						{' '}
						{formatDate({
							date       : endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						})}
					</strong>
				</span>
			</div>

			{loading ? null : (
				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(val) => setFilters((prev) => ({
							...prev,
							page: val,
						}))}
					/>
				</div>
			)}
		</div>
	);
}

export default Footer;
