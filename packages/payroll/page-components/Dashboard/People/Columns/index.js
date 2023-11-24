import { Avatar } from '@cogoport/components';
import React from 'react';

import CustomPill from '../../commons/CutomPill';

import styles from './styles.module.css';

function GetStatus({ employee }) {
	if (employee?.salary_on_hold === null) {
		return '-';
	}
	if (employee?.salary_on_hold === false) {
		return	(
			<CustomPill
				background="#F7FAEF"
				color="#849E4C"
				text="Active"
			/>
		);
	}
	return <CustomPill background="#FEF3E9" color="#C26D1A" text="On Hold" />;
}
const getColumns = ({ router }) => {
	const columns = [
		{
			Header   : <div className={styles.header}>NAME</div>,
			accessor : (item) => (

				<div
					className={styles.name_data}
					aria-hidden
					onClick={() => router.push(`/profile?employee_id=${item.user_id}&active_tab=payment_details`)}
				>
					<div className={styles.avatar}>
						<Avatar personName={item.name} />
					</div>
					<div className={styles.name_code_data}>
						{`${item.name}` || '-'}
						<br />
						{`(${item.employee_code})`}
					</div>

				</div>

			),
			id: 'name',
		},
		{
			Header   : <div className={styles.header}>DEPARTMENT</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item.department || '-'}
				</div>
			),
			id: 'department',
		},
		{
			Header   : <div className={styles.header}>DESGINATION</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item.role || '-'}
				</div>
			),
			id: 'designation',
		},
		{
			Header   : <div className={styles.header}>REPORTING OFFICE</div>,
			accessor : (item) => (

				<div className={styles.data}>
					{item.reporting_location || '-'}
				</div>

			),
			id: 'reporting_location',
		},
		{
			Header   : <div className={styles.header}>TYPE</div>,
			accessor : (item) => item.employee_type || '-',
			id       : 'employee_type',
		},
		{
			Header   : <div className={styles.header}>MONTHLY CTC</div>,
			accessor : (item) => (

				<div className={styles.data}>
					{Math.round(item.monthly_ctc) || '-'}
				</div>

			),
			id: 'monthly_ctc',
		},
		{
			Header   : <div className={styles.header}>PAYMENT STRUCTURE</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item.salary_configuration_name || '-'}
				</div>
			),
			id: 'salary_configuration_name',
		},
		{
			Header   : <div className={styles.header}>STATUS</div>,
			accessor : (item) => (
				<div>
					<GetStatus item={item} />
				</div>
			),
			id: 'status',
		},
	];
	return [...columns];
};
export default getColumns;
