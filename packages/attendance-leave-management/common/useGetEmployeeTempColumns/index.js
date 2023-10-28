import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const useGetLocationColumn = ({
	data = [],
}) => {
	console.log(data, '::');
	const getStatusColor = (status) => {
		switch (status) {
			case 'pending':
				return 'orange';
			case 'approved':
				return 'green';
			case 'rejected':
				return 'red';
			default:
				return 'default';
		}
	};
	const columns = [
		{
			Header   : <div className={styles.table_header}>NAME</div>,
			accessor : (item) => (
				<div className={styles.item_data}>
					{`${startCase(item.name)}(${item.employee_code})` || '-'}
				</div>
			),
			id: 'name',
		},
		{
			Header   : <div className={styles.table_header}>FROM DATE</div>,
			accessor : (item) => (
				<div className={styles.item_data}>
					{ formatDate({
						date       : item?.permission_from_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) || '--'}
				</div>
			),
			id: 'permission_from_date',
		},
		{
			Header   : <div className={styles.table_header}>TO DATE</div>,
			accessor : (item) => (
				<div className={styles.item_data}>
					{ formatDate({
						date       : item?.permission_to_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) || '--'}
				</div>
			),
			id: 'permission_to_date',
		},
		// {
		// 	Header   : <div className={styles.table_header}>REJECTION REASON</div>,
		// 	accessor : (item) => (
		// 		<div className={styles.item_data}>
		// 			{item?.rejection_reason}
		// 		</div>
		// 	),
		// 	id: 'rejection_reason',
		// },
		{
			Header   : <div className={styles.table_header}>REMARKS</div>,
			accessor : (item) => (
				<div className={styles.item_data}>
					{item?.remarks}
				</div>
			),
			id: 'remarks',
		},
		{
			Header   : <div className={styles.table_header}>ATTACHMENT</div>,
			accessor : (item) => (
				<div className={styles.item_data}>
					{item?.attachment_url
						? (
							<Button
								size="md"
								themeType="secondary"
								onClick={() => (window.open(item?.attachment_url, '_blank'))}
							>
								<span>Download</span>
								<IcMDownload style={{ marginLeft: '4px' }} width={14} height={14} />
							</Button>
						)

						: null}
					{' '}

				</div>
			),
			id: 'attachments',
		},

		{
			Header   : <div className={styles.table_header}>STATUS</div>,
			accessor : (item) => (
				<div className={styles.item_data}>
					<Pill
						key={item?.status}
						size="md"
						color={getStatusColor(item?.status)}
					>
						{item?.status}
					</Pill>
				</div>
			),
			id: 'status',
		},
	];
	return columns;
};

export default useGetLocationColumn;
