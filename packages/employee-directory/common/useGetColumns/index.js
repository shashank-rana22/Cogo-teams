import { Checkbox, Pill } from '@cogoport/components';
import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_STATUS } from '../../page-components/utils/constants';

import styles from './styles.module.css';

const getStatus = (employeeStatus) => {
	if (employeeStatus === null) {
		return '-';
	}

	const pillData = EMPLOYEE_STATUS[employeeStatus];

	return <Pill {...pillData} size="md">{pillData.label}</Pill>;
};

const useGetColumns = ({
	bulkEdit, handleAllSelect, handleSelectId, selectedIds,
	dataArr, handleEmployeeId,
}) => {
	const columns = [
		{
			Header   : 'Employee Name',
			accessor : (item) => item.name || '-',
			id       : 'name',
		},
		{
			Header   : 'COGO ID',
			accessor : (item) => (
				<div
					className={styles.cogo_id}
					onClick={() => handleEmployeeId(item)}
					aria-hidden
				>
					{item.employee_code || '-'}
				</div>
			),
			id: 'cogo_id',
		},
		{
			Header   : 'Designation',
			accessor : (item) => item.designation || '-',
			id       : 'designation',
		},
		{
			Header   : 'Contact No',
			accessor : (item) => item.mobile_number || '-',
			id       : 'contact_no',
		},
		{
			Header   : 'Email Id',
			accessor : (item) => item.cogoport_email || '-',
			id       : 'email_id',
		},
		{
			Header   : 'Chapter',
			accessor : (item) => item.chapter_name || '-',
			id       : 'chapter',
		},
		{
			Header   : 'Location',
			accessor : (item) => startCase(item.office_location) || '-',
			id       : 'location',
		},
		{
			Header   : 'Reporting Manager',
			accessor : (item) => getByKey(item, 'reporting_manager.name') || '-',
			id       : 'reporting_manager',
		},
		{
			Header   : 'Status',
			accessor : (item) => (
				<div>
					{item.status === 'inactive' ? (
						<Pill
							key="Inactive"
							prefix=""
							size="md"
							color="red"
						>
							Inactive
						</Pill>
					) : getStatus(item.employee_status) }
				</div>
			),
			id: 'status',
		},
	];

	const checkBoxColumn = [
		{
			Header: <Checkbox
				checked={dataArr.length === selectedIds.length}
				onChange={(e) => handleAllSelect(e)}
			/>,
			accessor: (item) => (
				<Checkbox
					checked={selectedIds.includes(item.id)}
					onChange={(e) => handleSelectId(e, item.id)}
				/>
			),
			id: 'select_all',
		},
	];

	return bulkEdit ? [...checkBoxColumn, ...columns] : columns;
};

export default useGetColumns;
