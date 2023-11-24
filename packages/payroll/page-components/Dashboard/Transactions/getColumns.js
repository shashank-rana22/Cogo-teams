import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import CustomPill from '../commons/CutomPill';

import styles from './styles.module.css';

const ONETOINCREMENT = 1;

const COLOR_MAPPING = {
	paid    : { color: '#849E4C', background: '#F7FAEF' },
	pending : { color: '#C26D1A', background: '#FEF3E9' },
	default : { color: '#BF291E', background: '#FDEBE9' },
};

function GetStatus(status) {
	if (status === null) {
		return '-';
	}

	const colors = status in COLOR_MAPPING
		? COLOR_MAPPING[status] : COLOR_MAPPING.default;

	return (
		<CustomPill
			background={colors.background}
			color={colors.color}
			text={status}
		/>
	);
}

const getColumns = () => {
	const columns = [
		{
			Header   : <div className={styles.header}>SI .NO</div>,
			accessor : (item, index) => (
				<div
					className={styles.data}
				>
					{index + ONETOINCREMENT}
				</div>
			),
			id: 'sino',
		},
		{
			Header   : <div className={styles.header}>NAME</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{`${item.name}(${item.employee_code})` || '-'}
				</div>
			),
			id: 'name',
		},
		{
			Header   : <div className={styles.header}>DATE</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item.salary_date ? formatDate({
						date       : item.salary_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) : '-'}
				</div>
			),
			id: 'salary_date',
		},
		{
			Header   : <div className={styles.header}>TRANSACTION DATE</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item.created_at ? formatDate({
						date       : item.created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) : '-'}
				</div>
			),
			id: 'created_at',
		},
		{
			Header   : <div className={styles.header}>TYPE</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item.component_type || '-'}
				</div>
			),
			id: 'component_type',
		},
		{
			Header   : <div className={styles.header}>REMARKS</div>,
			accessor : (item) => (
				<div className={styles.data}>
					{item.description || '-'}
				</div>
			),
			id: 'description',
		},
		{
			Header   : <div className={styles.header}>ATTACHMENTS</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item.attachments || '-'}
				</div>
			),
			id: 'attachments',
		},
		{
			Header   : <div className={styles.header}>PAID</div>,
			accessor : (item) => (
				<div>
					{ GetStatus(item?.status) }
				</div>
			),
			id: 'paid',
		},
	];
	return [...columns];
};
export default getColumns;
