import { Checkbox, Pill, Tooltip, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_STATUS } from '../../page-components/utils/constants';

import styles from './styles.module.css';

function GetStatus({ employeeStatus = '' }) {
	if (employeeStatus === null) {
		return '-';
	}

	const pillData = EMPLOYEE_STATUS[employeeStatus.toLowerCase()] || {};

	return <Pill {...pillData} size="md">{pillData?.label}</Pill>;
}

function useGetColumns({
	bulkEdit, handleAllSelect, handleSelectId, selectedIds,
	dataArr, handleEmployeeId,
}) {
	const router = useRouter();

	const columns = [
		{
			Header   : 'Employee Name',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
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
					className={styles.tooltip}
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
					className={styles.tooltip}
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
			Header   : 'Date of Joining',
			accessor : (item) => (
				item.date_of_joining ? formatDate({
					date       : item.date_of_joining || '-',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) : '-'
			),
			id: 'chapter',
		},
		{
			Header   : 'Location',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
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
					className={styles.tooltip}
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
					) : <GetStatus employeeStatus={item.employee_status} /> }
				</div>
			),
			id: 'status',
		},
		{
			Header   : '',
			accessor : (item) => (
				<div className={styles.button_container}>
					<ButtonIcon
						size="md"
						icon={<IcMEyeopen />}
						themeType="primary"
						onClick={() => {
							router.push(`/profile?employee_id=${item.user_id}`);
						}}
					/>
				</div>
			),
			id: 'view',
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
}

export default useGetColumns;
