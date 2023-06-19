import { Button, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import GetSortingData from '../components/ExceptionsManagement/sorting';

import styles from './styles.module.css';

const ORANGE = '#F68B21';
const GREY = '#BDBDBD';

const cycleWiseExceptionTable = ({
	setShowCycleExceptions,
	sort,
	setSort,
	exceptionFilter,
	setExceptionFilter,
	setCycleListId,
}) => {
	const { sortType = '', sortBy = '' } = sort || {};
	const createdAtSortingAsc = (sortType === 'ASC' && sortBy === 'createdAt') ? ORANGE : GREY;
	const createdAtSortingDesc = (sortType === 'DESC' && sortBy === 'createdAt') ? ORANGE : GREY;
	const updatedAtSortingAsc = (sortType === 'ASC' && sortBy === 'updatedAt') ? ORANGE : GREY;
	const updatedAtSortingDesc = (sortType === 'DESC' && sortBy === 'updatedAt') ? ORANGE : GREY;
	return (
		[
			{
				Header   : 'Cycle Name',
				id       : 'name',
				accessor : (row) => (
					<div>
						<Tooltip
							content={(
								<div className={styles.tooltip_text}>
									{row?.name}
								</div>
							)}
							interactive
						>
							<div className={styles.customer_name}>
								{row?.name || '-'}
							</div>
						</Tooltip>
					</div>
				),
			},
			{
				Header   : 'Type',
				id       : 'cycleType',
				accessor : (row) => (
					<div className={styles.text}>
						{row?.cycleType || '-' }
					</div>

				),
			},
			{
				Header   : 'Frequency',
				id       : 'frequency',
				accessor : (row) => (
					<div className={styles.text}>
						{row?.frequencyType || '-'}
					</div>

				),
			},
			{
				Header: (
					<div style={{ display: 'flex' }}>
						<span style={{ marginRight: '8px' }}>Created On</span>
						<GetSortingData
							setOrderBy={setSort}
							type="createdAt"
							exceptionFilter={exceptionFilter}
							setExceptionFilter={setExceptionFilter}
							sortStyleAsc={createdAtSortingAsc}
							sortStyleDesc={createdAtSortingDesc}
						/>
					</div>
				),
				id       : 'createdAt',
				accessor : (row) => (
					<div className={styles.text}>
						{formatDate({
							date       : row?.createdAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM, yyyy'],
							formatType : 'date',
						})}
					</div>

				),

			},
			{
				Header: (
					<div style={{ display: 'flex' }}>
						<span style={{ marginRight: '8px' }}>Last Edited On</span>
						<GetSortingData
							setOrderBy={setSort}
							type="updatedAt"
							exceptionFilter={exceptionFilter}
							setExceptionFilter={setExceptionFilter}
							sortStyleAsc={updatedAtSortingAsc}
							sortStyleDesc={updatedAtSortingDesc}
						/>
					</div>
				),
				id       : 'updatedAt',
				accessor : (row) => (
					<div className={styles.text}>
						{formatDate({
							date       : row?.updatedAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM, yyyy'],
							formatType : 'date',
						})}
					</div>

				),
			},
			{
				Header   : '',
				id       : 'button',
				accessor : (row) => (
					<div>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => { setCycleListId(row?.id); setShowCycleExceptions(true); }}
						>
							Manage Exceptions

						</Button>
					</div>

				),
			},
		]
	);
};

export default cycleWiseExceptionTable;
