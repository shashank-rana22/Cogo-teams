import { IcCError, IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const useGetColumns = ({
	level = '',
	setEmployeeId,
	setOpenKraModal,
	setSortData,
	sortData,
}) => {
	const handleEmployeeId = (item) => {
		setEmployeeId(item?.employee_id);
		setOpenKraModal(true);
	};

	const { sortBy, sortOrder } = sortData || {};

	const renderSortingArrows = (key) => (
		<div className={styles.icon_flex}>
			<IcMArrowRotateUp
				className={sortBy === key && sortOrder === 'asc' && styles.active}
				cursor="pointer"
				onClick={() => setSortData({
					...sortData,
					sortOrder : 'asc',
					sortBy    : key,
				})}
			/>
			<IcMArrowRotateDown
				className={sortBy === key && sortOrder === 'desc' && styles.active}
				cursor="pointer"
				onClick={() => setSortData({
					...sortData,
					sortOrder : 'desc',
					sortBy    : key,
				})}
			/>
		</div>
	);

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
			Header: (
				<div className={styles.header_text}>
					Calculated Rating
					{renderSortingArrows('system_rating')}
				</div>
			),
			accessor: (item) => (
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
			Header: (
				<div className={styles.header_text}>
					Final Rating
					{renderSortingArrows('final_rating')}
				</div>
			),
			accessor: (item) => (
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
			Header: (
				<div className={styles.header_text}>
					Z-score
					{renderSortingArrows('z_score')}
				</div>
			),
			accessor: (item) => (
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
