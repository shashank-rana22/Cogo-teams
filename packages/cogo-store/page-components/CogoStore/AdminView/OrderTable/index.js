import { Select, Table, Pagination } from '@cogoport/components';
import {
	SelectController,
	useForm,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState	} from 'react';

import EmptyState from '../../../../commons/EmptyState';
import useGetProductFilterDetail from '../../../../hooks/useGetProductFilterDetail';
import useUpdateStatus from '../../../../hooks/useUpdateStatus';
import { STATUS_OPTIONS } from '../../../../utils/constants';

import getOrderColumns from './getOrderColumns';
import styles from './styles.module.css';

function OrderTable({ data, filters, setFilters, dateArray, refetch, loading }) {
	const { push } = useRouter();
	const [selectedMonth, setSelectedMonth] = useState('');
	const { data: productData } = useGetProductFilterDetail();
	const { currency_code } = productData || {};

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

	const { list, page, page_limit, total_count } = data || {};

	const onPageChange = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};
	const { updateStatus } = useUpdateStatus({ refetch });
	const columns = getOrderColumns({ STATUS_OPTIONS, updateStatus, push, currency_code });

	useEffect(() => {
		setValue('filter_date', selectedMonth || DATE_OPTIONS[GLOBAL_CONSTANTS.zeroth_index]?.value);
	}, [setValue, selectedMonth, DATE_OPTIONS]);

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
									onChange={(e) => (
										setFilters((prev) => ({ ...prev, order_status: e, page: 1 }))
									)}
									value={filters.order_status}
									isClearable
								/>

							</div>
						</div>
					</div>
				</div>
				{isEmpty(list) ? <EmptyState /> : (
					<>
						<div className={styles.table_container}>
							<Table columns={columns} data={list || []} loading={loading} />
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

					</>
				)}

			</div>
		</div>
	);
}

export default OrderTable;
