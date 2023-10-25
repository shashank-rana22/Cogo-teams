import { Select, Table, Pagination } from '@cogoport/components';
import {
	SelectController,
	useForm,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';
import React, { useEffect, useState	} from 'react';

import useUpdateStatus from '../../../../hooks/useUpdateStatus';

import getOrderColumns from './getOrderColumns';
import styles from './styles.module.css';

const STATUS_OPTIONS = [
	{ label: 'Placed', value: 'placed' },
	{ label: 'Delivered', value: 'delivered' },
	{ label: 'Returned', value: 'returned' },
	{ label: 'Cancelled', value: 'cancelled' },
	{ label: 'Out for Delivery', value: 'out_for_delivery' },
];

function OrderTable({ data, filters, setFilters, dateArray, refetch }) {
	const { push } = useRouter();
	const [selectedMonth, setSelectedMonth] = useState('');

	const { control, setValue } = useForm();

	const mapDateStringsToObjects = (dateStrings) => (dateStrings || []).map((dateString) => ({
		label: formatDate({
			date       : dateString,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
			separator  : ' | ',
		}),
		value: dateString,
	}));
	const DATE_OPTIONS = mapDateStringsToObjects(dateArray);
	console.log('🚀 ~ file: index.js:38 ~ OrderTable ~ DATE_OPTIONS:', DATE_OPTIONS);
	const { list, page, page_limit, total_count } = data || {};

	const onPageChange = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};
	const { updateStatus } = useUpdateStatus({ refetch });
	const columns = getOrderColumns({ STATUS_OPTIONS, updateStatus, push });

	useEffect(() => {
		setValue('filter_date', selectedMonth || DATE_OPTIONS[GLOBAL_CONSTANTS.zeroth_index]?.value);
	}, [setValue, selectedMonth, DATE_OPTIONS]);
	console.log(new Date(DATE_OPTIONS[GLOBAL_CONSTANTS.zeroth_index]), selectedMonth);
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div
						className={styles.arrow_back}
						aria-hidden
					>
						<div className={styles.heading}>

							<div className={styles.upper_heading}>ALL ORDERS</div>
							<div className={styles.lower_heading}>
								Please update the status of the orders
							</div>
						</div>
					</div>

					<div className={styles.heading}>
						<div className={styles.search_bar}>
							<div className={styles.sb_left}>
								<SelectController
									size="md"
									placeholder="date"
									className={styles.select_input}
									name="filter_date"
									control={control}
									options={DATE_OPTIONS}
									onChange={(e) => {
										setFilters((prev) => ({ ...prev, date_sort: e, page: 1 }));
										setSelectedMonth(e);
									}}
								/>
								<Select
									placeholder="Status"
									name="order_status"
									options={STATUS_OPTIONS}
									onChange={(e) => {
										setFilters((prev) => ({ ...prev, order_status: e, page: 1 }));
									}}
									value={filters.order_status}
									isClearable
								/>

							</div>
						</div>
					</div>
				</div>
				<div className={styles.table_container}>
					<Table columns={columns} data={list || []} />
				</div>
				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={onPageChange}
					/>
				</div>
			</div>
		</div>
	);
}

export default OrderTable;
