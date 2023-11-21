import { Input, Pagination, Select } from '@cogoport/components';
import {
	AsyncSelectController,
	useForm,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty, upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import FixedCard from '../../../../common/FixedCard';
import StepCircle from '../../../../common/StepCircle';
import StyledTable from '../../../../common/StyledTable';
import useGetEmployeePayroll from '../../../../hooks/useGetEmployeePayroll';
import useUpdateEmployeePayrollStatus from '../../../../hooks/useUpdateEmployeePayrollStatus';
import getColumns from '../getColumns';

import styles from './styles.module.css';

const selectConfigurations = [
	{
		name        : 'departmentList',
		placeholder : 'Department',
		asyncKey    : 'list_employee_departments',
		isClearable : true,
		filterKey   : 'department',
		labelKey    : 'department_name',
		valueKey    : 'id',
		params      : { filters: { status: 'active' } },
	},
	{
		name        : 'location',
		placeholder : 'Location',
		asyncKey    : 'list_company_locations',
		filterKey   : 'department',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		name        : 'payband',
		placeholder : 'Payband',
		isClearable : true,
		asyncKey    : 'list_salary_bands',
		params      : { filters: { status: 'active' } },
	},

];
const OPTION_STATUS = [
	{ label: 'pending', value: 'pending' },
	{ label: 'approved', value: 'approved' },
	{ label: 'processed', value: 'processed' },
	{ label: 'paid', value: 'paid' },
	{ label: 'cancelled', value: 'cancelled' },
	{ label: 'failed', value: 'failed' },
	{ label: 'on hold', value: 'on hold' },
];

const CURRENT_STEP = GLOBAL_CONSTANTS.one;
const TOTAL_STEP = 3;

function RunPayroll({
	proceed = 0, setProceed = () => {},
	selectedItems = {}, setSelectedItems = () => {},
	month = '', handleBack = () => {},
}) {
	const {
		data = {},
		filters,
		setFilters,
		debounceQuery,
		loading,
		refetch,
	} =	 useGetEmployeePayroll({ employeeIds: null });
	const [status, setStatus] = useState('pending');

	const [selectedIds, setSelectedIds] = useState([]);

	const [searchQuery, setSearchQuery] = useState('');
	const { updatePayrollStatus } = useUpdateEmployeePayrollStatus();

	const handleChangeStatus = (employee) => {
		const payload = {
			employee_payroll_id : employee?.id,
			status              : employee?.status === 'pending' ? 'on hold' : 'pending',
		};
		updatePayrollStatus({ payload, refetch });
	};

	const { control } = useForm();

	const { list = [], page, page_limit, total_count } = data || {};

	const handlePagination = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};
	const handleSearch = (val) => {
		debounceQuery(val);
		setSearchQuery(val);
	};

	const handleSelectId = (e, itemObj = {}) => {
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
					if (item.status !== 'pending') {
						return acc;
					}

					return { ...acc, [item.id]: item };
				}, { ...prev }),

			}));
		}

		return setSelectedItems((prev) => Object.values(prev).reduce((acc, prevObj) => {
			if (list.find(({ id }) => id === prevObj.id)) {
				return acc;
			} return { ...acc, [prevObj.id]: prevObj };
		}, {}));
	};
	const columns = getColumns({
		handleAllSelect,
		handleSelectId,
		selectedIds,
		list,
		page,
		selectedItems,
		handleChangeStatus,
	});
	const handleSubmit = () => {
		setProceed(proceed + GLOBAL_CONSTANTS.one);
	};

	return (
		<>
			<div className={styles.main_container}>
				<div className={styles.sub_container}>
					<div className={styles.sub_heading}>
						<IcMArrowBack
							width={14}
							height={14}
							style={{ cursor: 'pointer' }}
							onClick={handleBack}
						/>
						<div className={styles.top_text_container}>
							<span className={styles.top_bold_text}>
								{upperCase(month)}
								{' '}
								CYCLE
							</span>
							<span className={styles.top_grey_text}>Run Payroll</span>
						</div>
					</div>
					<div className={styles.employee_list}>
						<div className={styles.employee_list_heading}>
							<div className={styles.heading_left}>
								<div className={styles.bold_heading_left}>
									Employee List
								</div>
								<div className={styles.sub_heading_left}>
									Select employees to include in this payroll
								</div>
							</div>
							<div className={styles.heading_right}>
								<span className={styles.step_count}>
									Step 1/3
								</span>
								<StepCircle current_step={CURRENT_STEP} total_step={TOTAL_STEP} />
							</div>
						</div>
						<div className={styles.header_input}>
							<div className={styles.input_filters}>
								{(selectConfigurations || []).map((config) => (
									<AsyncSelectController
										key={config.name}
										control={control}
										className={styles.select_input}
										initialCall
										asyncKey={config.asyncKey}
										name={config.name}
										placeholder={config.placeholder}
										params={config.params}
										isClearable={config?.isClearable}
										value={filters[config.name]}
										onChange={(e) => setFilters((prev) => ({ ...prev, [config.name]: e, page: 1 }))}
									/>
								))}
								<Select
									size="md"
									placeholder="Status"
									className={styles.select_input}
									value={status}
									options={OPTION_STATUS}
									isClearable
									onChange={(e) => {
										setStatus(e);
										setFilters((prev) => ({ ...prev, payroll_status: e, page: 1 }));
									}}
								/>
							</div>
							<div>
								<Input
									size="md"
									className={styles.input_search}
									placeholder="Search"
									onChange={(e) => handleSearch(e)}
									name="search_payroll"
									value={searchQuery}
								/>
							</div>
						</div>
						<StyledTable
							key={JSON.stringify(selectedItems)}
							loading={loading}
							columns={columns}
							data={list}
						/>
						{total_count > page_limit && (
							<Pagination
								type="table"
								currentPage={page}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={handlePagination}
								className={styles.pagination_container}
							/>
						)}
					</div>
				</div>
			</div>
			{

			!isEmpty(selectedItems)
			&& (
				<FixedCard
					selectedIds={selectedIds}
					setSelectedIds={setSelectedIds}
					data={list}
					total_count={total_count}
					handleSubmit={handleSubmit}
					selectedItems={selectedItems}
				/>
			)
}
		</>
	);
}

export default RunPayroll;
