import { Checkbox, Pill, Tooltip } from '@cogoport/components';
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
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					content={<div className={styles.tooltip_data}>{item.name}</div>}
				>
					<div className={styles.data}>
						{item.name || '-'}
					</div>
				</Tooltip>
			),
			id: 'name',
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
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					content={(
						<div className={styles.tooltip_data}>
							{item.designation || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{item.designation || '-'}
					</div>
				</Tooltip>
			),
			id: 'designation',
		},
		{
			Header   : 'Contact No',
			accessor : (item) => item.mobile_number || '-',
			id       : 'contact_no',
		},
		{
			Header   : 'Email Id',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					content={(
						<div className={styles.tooltip_data}>
							{item.cogoport_email || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{item.cogoport_email || '-'}
					</div>
				</Tooltip>
			),
			id: 'email_id',
		},
		{
			Header   : 'Chapter',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					content={(
						<div className={styles.tooltip_data}>
							{item.chapter_name || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{item.chapter_name || '-'}
					</div>
				</Tooltip>
			),
			id: 'chapter',
		},
		{
			Header   : 'Location',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					content={(
						<div className={styles.tooltip_data}>
							{startCase(item.office_location) || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{startCase(item.office_location) || '-'}
					</div>
				</Tooltip>
			),
			id: 'location',
		},
		{
			Header   : 'Reporting Manager',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					content={(
						<div className={styles.tooltip_data}>
							{getByKey(item, 'reporting_manager.name') || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{getByKey(item, 'reporting_manager.name') || '-'}
					</div>
				</Tooltip>
			),
			id: 'reporting_manager',
		},
		{
			Header   : 'Status',
			accessor : (item) => (
				<div>
					{item.employee_tags?.is_resigned ? (
						<Pill
							key="Notice"
							size="md"
							color="#CBD1F8"
						>
							Notice
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
