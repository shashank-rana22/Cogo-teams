import { Table, Pagination, Input, Select } from '@cogoport/components';
import { useForm, DatepickerController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import useGetAllBonuses from '../../../hooks/useGetAllBonuses';
import useGetNextPayrollMonth from '../../../hooks/useGetNextPayrollMonth';

import FixedCard from './FixedCard';
import getBonusColumns from './getBonusColumns';
import styles from './styles.module.css';

const MAX_PAGE_LIMIT = 10;
function Bonus({ handleSetup = () => {} }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedItems, setSelectedItems] = useState({});
	const STATUSOPTIONS = [
		{ label: 'Over Due', value: 'over_due' },
		{ label: 'Not Due', value: 'not_due' },
		{ label: 'Due', value: 'due' },
		{ label: 'Paid', value: 'paid' },
		{ label: 'All', value: 'all' }];
	const { control } = useForm();

	const { data, filters, setFilters, debounceQuery, loading, refetch } = useGetAllBonuses();
	const { list, page, page_limit, total_count } = data || {};

	const onPageChange = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};

	const handleSearch = (val) => {
		debounceQuery(val);
		setSearchQuery(val);
	};

	const handleSelectedIds = (e, itemObj = {}) => {
		const { checked } = e.target;
		if (checked) {
			return setSelectedItems((prev) => ({ ...prev, [itemObj.id]: itemObj }));
		}
		const { [itemObj.id]:_, ...rest } = selectedItems;
		return setSelectedItems(rest);
	};

	const handleAllSelect = (e) => {
		const { checked } = e.target;

		if (checked) {
			return setSelectedItems((prev) => ({
				...(list || []).reduce((acc, item) => {
					if (item.payment_status === 'Not Due') {
						return acc;
					}
					return { ...acc, [item.id]: item };
				}, { ...prev }),
			}));
		}
		return 	setSelectedItems((prev) => Object.values(prev).reduce((acc, prevObj) => {
			if (list.find(({ id }) => id === prevObj.id)) {
				return acc;
			} return { ...acc, [prevObj.id]: prevObj };
		}, {}));
	};

	const columns = getBonusColumns({ handleSelectedIds, handleAllSelect, selectedItems, list });
	const { data:month } = useGetNextPayrollMonth();

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div
						className={styles.arrow_back}
						aria-hidden
						onClick={() => handleSetup('')}
					>
						<IcMArrowBack width={20} height={20} />
						<div className={styles.heading}>

							<div className={styles.upper_heading}>BONUS</div>
							<div className={styles.lower_heading}>
								All bonuses and their status
							</div>
						</div>
					</div>

					<div className={styles.heading}>
						<div className={styles.upper_heading}>{month}</div>
						<div className={styles.lower_heading}>
							Next Payroll Cycle
						</div>
					</div>
				</div>

				<div className={styles.search_bar}>
					<div className={styles.sb_left}>
						<DatepickerController
							placeholder="Select Date"
							name="startDateTime"
							control={control}
							isPreviousDaysAllowed
							onChange={(e) => setFilters((prev) => ({ ...prev, date_of_joining: e }))}
						/>
						<Select
							placeholder="Status"
							name="bonus_status"
							options={STATUSOPTIONS}
							onChange={(e) => setFilters((prev) => ({ ...prev, payment_status: e, page: 1 }))}
							value={filters.payment_status}
						/>

					</div>
					<div>
						<Input
							size="md"
							placeholder="Search"
							onChange={(e) => {
								handleSearch(e);
								setFilters((prev) => ({ ...prev, page: 1 }));
							}}
							value={searchQuery}
						/>
					</div>
				</div>
				{!isEmpty(list) || loading ? (
					<Table
						key={JSON.stringify(selectedItems)}
						columns={columns}
						data={list || []}
						loading={loading}
					/>
				)
					: <EmptyState />}
				{total_count > MAX_PAGE_LIMIT && (
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={onPageChange}
						/>
					</div>
				)}

			</div>
			{!isEmpty(selectedItems) ? (
				<FixedCard
					selectedItems={selectedItems}
					list={list}
					month={month}
					refetch={refetch}
					setSelectedItems={setSelectedItems}
				/>
			) : null}
		</div>
	);
}

export default Bonus;
