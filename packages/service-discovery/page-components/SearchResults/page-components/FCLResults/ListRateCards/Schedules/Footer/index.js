import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const ONE_VALUE = 1;

function Footer({ paginationProps = {}, selectedWeek = {}, setFilters = () => {} }) {
	const { page, page_limit, total_count } = paginationProps;

	return (
		<div className={styles.container}>
			{!isEmpty(selectedWeek) ? (
				<div className={styles.rates_count}>
					{selectedWeek?.count}
					{' '}
					{selectedWeek?.count > ONE_VALUE ? 'Options available' : 'Option available'}
					{'  '}
					<span>
						between
						{' '}
						<strong>
							{formatDate({
								date       : selectedWeek?.start_date,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
								formatType : 'date',
							})}
							{' '}
							&
							{' '}
							{formatDate({
								date       : selectedWeek?.end_date,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
								formatType : 'date',
							})}
						</strong>
					</span>
				</div>
			) : null}

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
		</div>
	);
}

export default Footer;
