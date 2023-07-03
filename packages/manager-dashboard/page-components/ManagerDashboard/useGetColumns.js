import { IcCError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const useGetColumns = ({
	level = '',
	setEmployeeId,
	setOpenKraModal,
}) => {
	const handleEmployeeId = (item) => {
		setEmployeeId(item?.employee_id);
		setOpenKraModal(true);
	};

	const columns = [
		{
			Header   : 'Name',
			accessor : (item) => (
				<div
					className={styles.employee_name}
					role="presentation"
					onClick={() => handleEmployeeId(item)}
				>
					{startCase(item?.employee_name) || startCase(item?.name) || '-'}
				</div>
			),
		},

		{
			Header   : <div className={styles.table_text}>Calculated Rating</div>,
			accessor : (item) => (
				<div className={styles.table_text}>
					{startCase(item?.system_rating) || '-'}
				</div>
			),
			id: 'system_rating',
		},

		{
			Header   : <div className={styles.table_text}>Revised Rating</div>,
			accessor : (item) => (
				<div className={styles.table_text}>
					{startCase(item?.revised_rating) || '-'}
				</div>
			),
			id: 'revised_rating',
		},

		{
			Header   : <div className={styles.table_text}>Final Rating</div>,
			accessor : (item) => (
				<div className={styles.table_text}>
					{startCase(item?.final_rating) || '-'}
				</div>
			),
			id: 'final_rating',
		},
		{
			Header   : <div className={styles.table_text}>Average Rating</div>,
			accessor : (item) => (
				<div className={styles.table_text}>
					{startCase(item?.average_rating) || '-'}
				</div>
			),
			id: 'average_rating',
		},
		{
			Header   : <div className={styles.table_text}>Z-Score</div>,
			accessor : (item) => (
				<div className={styles.table_text}>
					{startCase(item?.z_score) || '-'}
				</div>
			),
			id: 'z_score',
		},
		{
			Header   : '',
			accessor : (item) => {
				if (item.final_rating !== item.revised_rating) {
					return (
						<div className={styles.rating_flag}>
							<IcCError />
						</div>
					);
				}
				return null;
			},
			id: 'status',
		},
	];

	if (level === 'vertical_head') {
		return [...columns, {
			Header   : <div className={styles.table_text}>Surprise Gift</div>,
			accessor : (item) => (
				<div className={styles.rating_flag}>
					{startCase(item?.surprise_gift) || '-'}
				</div>
			),
			id: 'surprise_gift',
		}];
	}

	return columns;
};

export default useGetColumns;
