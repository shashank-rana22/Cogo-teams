import { IcCError, IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const getColumns = ({
	level = '',
	setEmployeeId,
	setOpenKraModal,
	setSortData,
	sortData,
	t = () => {},
}) => {
	const handleEmployeeId = (item) => {
		setEmployeeId(item?.employee_id);
		setOpenKraModal(true);
	};

	const { sortBy, sortOrder } = sortData || {};

	function RenderSortingArrows({ key }) {
		return (
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
	}

	const getTableColumns = () => {
		const columns = [
			{
				Header   : t('managerDashboard:name_column'),
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
						{t('managerDashboard:calculated_rating')}
						<RenderSortingArrows key="system_rating" />
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
				Header   : <div className={styles.table_text}>{t('managerDashboard:revised_rating')}</div>,
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
						{t('managerDashboard:final_rating')}
						<RenderSortingArrows key="final_rating" />
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
				Header   : <div className={styles.table_text}>{t('managerDashboard:average_rating')}</div>,
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
						{t('managerDashboard:z_score')}
						<RenderSortingArrows key="z_score" />
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

		const surpriseGift = [
			{
				Header   : <div className={styles.table_text}>{t('managerDashboard:surprise_gift')}</div>,
				accessor : (item) => (
					<div className={styles.rating_flag}>
						{startCase(item?.surprise_gift) || '-'}
					</div>
				),
				id: 'surprise_gift',
			},
		];

		return level === 'vertical_head' ? [...columns, ...surpriseGift] : columns;
	};

	const tableColumns = getTableColumns();

	return tableColumns;
};

export default getColumns;
