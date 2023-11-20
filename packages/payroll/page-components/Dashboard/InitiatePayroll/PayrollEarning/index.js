import { Button, Input, Pagination } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';
import { useState } from 'react';

import FixedCard from '../../../../common/FixedCard';
import StepCircle from '../../../../common/StepCircle';
import StyledTable from '../../../../common/StyledTable';
import useCreatePayroll from '../../../../hooks/useCreatePayroll';
import useGetCurrentPayroll from '../../../../hooks/useGetCurrentPayroll';
import useGetEmployeePayrolls from '../../../../hooks/useGetEmployeePayroll';
import EditSalarayModelNew from '../EditSalaryModelNew';
import getColumnsEarning from '../getColumnsEarning';

import styles from './styles.module.css';

const selectConfigurations = [
	{
		name        : 'role_id',
		placeholder : 'Designation',
		asyncKey    : 'list_employee_roles',
		labelKey    : 'role_name',
		valueKey    : 'id',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		isClearable: true,
	},
	{
		name        : 'departmentList',
		placeholder : 'Department',
		asyncKey    : 'list_employee_departments',
		isClearable : true,
		labelKey    : 'department_name',
		valueKey    : 'id',
		params      : {
			filters: {
				status: 'active',
			},
		},
	},
	{
		name        : 'location',
		placeholder : 'Location',
		asyncKey    : 'list_company_locations',
		params      : { filters: { status: 'active' } },
		labelKey    : 'display_name',
		valueKey    : 'id',
	},
];

const CURRENT_STEP = 2;
const TOTAL_STEP = 3;

function PayrollEarning({
	proceed = 0,
	setProceed = () => {},
	selectedItems = {},
	month = '',
	handleBack = () => {},
	setlistId = () => {},
}) {
	const employeeIds = Object.values(selectedItems).map((item) => item.employee_id);

	const {
		data,
		getEmployeePayrolls,
		filters, setFilters, debounceQuery, loading:loadingEarning,
	} = useGetEmployeePayrolls({
		employeeIds: employeeIds || [],
	});
	const { data:payrolldata, getCurrentPayroll } = useGetCurrentPayroll();

	const { data:payroll_id, createPayroll } = useCreatePayroll();

	const [searchQuery, setSearchQuery] = useState('');
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [empId, setEmpId] = useState(null);
	const [dbId, setId] = useState(null);
	const onClose = () => {
		setShow(false);
		setLoading(false);
	};
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

	const handleOpenModal = async (employee_id, id) => {
		setShow(true);
		setEmpId(employee_id);
		setId(id);
		await getCurrentPayroll(employee_id, id);
		setLoading(true);
	};
	const handleSubmit = async () => {
		const payload = {
			employee_ids: employeeIds,
		};
		await createPayroll({ payload });
		setlistId(payroll_id);
		setProceed(proceed + GLOBAL_CONSTANTS.one);
	};
	const columns = getColumnsEarning({
		dataArr: list, setShow, onClose, handleOpenModal,
	});
	return (
		<>
			<div className={styles.main_container}>
				<div className={styles.sub_container}>
					<div className={styles.sub_heading}>
						<IcMArrowBack
							width={14}
							height={14}
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
									Earnings
								</div>
								<div className={styles.sub_heading_left}>
									Review total earnings for employees
								</div>
							</div>
							<div className={styles.heading_right}>
								<span className={styles.heading_right_selected}>
									Selected
								</span>
								<span className={styles.heading_right_employees}>
									{total_count}
									{' '}
									Employees
								</span>
								<span className={styles.heading_right_step}>
									<span className={styles.step_count}>
										step 2/3
									</span>
									<StepCircle current_step={CURRENT_STEP} total_step={TOTAL_STEP} />
								</span>
							</div>
						</div>
						<div className={styles.header_input}>
							<div className={styles.input_filters}>
								{(selectConfigurations || []).map((config) => (
									<AsyncSelect
										key={config.name}
										initialCall
										className={styles.select_input}
										asyncKey={config.asyncKey}
										name={config.name}
										placeholder={config.placeholder}
										params={config.params}
										isClearable
										labelKey={config.labelKey}
										valueKey={config.valueKey}
										value={filters[config.name]}
										onChange={(e) => setFilters((prev) => ({ ...prev, [config.name]: e, page: 1 }))}
									/>
								))}
							</div>
							<div className={styles.reload_section}>
								<Button size="lg" themeType="secondary" onClick={getEmployeePayrolls}>Reload</Button>
								<Input
									size="md"
									className={styles.input_search}
									// prefix={<IcMAppSearch className={styles.search_icon} width={20} height={20} />}
									placeholder="Search"
									onChange={(e) => handleSearch(e)}
									name="search_payroll"
									value={searchQuery}
								/>
							</div>
						</div>
						<StyledTable
							columns={columns}
							loading={loadingEarning}
							data={list}
							show={show}
							onClose={onClose}
						/>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={handlePagination}
							className={styles.pagination_container}
						/>
					</div>
				</div>
			</div>
			<FixedCard earningPayroll proceed={proceed} setProceed={setProceed} handleSubmit={handleSubmit} />
			<EditSalarayModelNew
				show={show}
				onClose={onClose}
				data={payrolldata}
				id={dbId}
				employee_id={empId}
				loading={loading}
				getEmployeePayrolls={getEmployeePayrolls}
			/>
		</>
	);
}

export default PayrollEarning;
