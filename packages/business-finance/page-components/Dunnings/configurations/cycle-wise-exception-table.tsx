import { Button, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import GetSortingData from '../components/ExceptionsManagement/sorting';

import styles from './styles.module.css';

const cycleWiseExceptionTable = ({
	setShowCycleExceptions,
	sort,
	setSort,
	exceptionFilter,
	setExceptionFilter,
	setCycleListId,
}) => (
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
			accessor : (row) => {
				const {
					dunningExecutionFrequency = '', oneTimeDate = '',
					scheduleTime = '', dayOfMonth = '',
					week = '',
					scheduleTimeZone = '',
				} = row?.scheduleRule || {};
				return (
					<div className={styles.text}>
						<span style={{ marginRight: '6px' }}>
							{startCase(dunningExecutionFrequency.toLowerCase())}
						</span>
						(
						{oneTimeDate
							? (
								<>
									<span className={styles.frequency_value}>
										{formatDate({
											date       : oneTimeDate,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
										})}
									</span>
									<span className={styles.border} />

								</>
							)
							: ''}
						{dayOfMonth
							? (
								<>
									<span className={styles.frequency_value}>
										{dayOfMonth}
									</span>
									<span className={styles.border} />
								</>
							)
							: ''}
						{week ? (
							<>
								<span className={styles.frequency_value}>
									{week.slice(0, 3)}
								</span>
								<span className={styles.border} />
							</>
						) : ''}

						<span style={{ marginLeft: '4px' }}>
							{scheduleTime}
							{' '}
							{scheduleTimeZone}
						</span>
						)
					</div>
				);
			},
		},
		{
			Header: (
				<div style={{ display: 'flex' }}>
					<span style={{ marginRight: '8px' }}>Created On</span>
					<GetSortingData
						setSort={setSort}
						sort={sort}
						type="createdAt"
						exceptionFilter={exceptionFilter}
						setExceptionFilter={setExceptionFilter}
					/>
				</div>
			),
			id       : 'createdAt',
			accessor : (row) => (
				<div className={styles.text}>
					{formatDate({
						date       : row?.createdAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
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
						setSort={setSort}
						sort={sort}
						type="updatedAt"
						exceptionFilter={exceptionFilter}
						setExceptionFilter={setExceptionFilter}
					/>
				</div>
			),
			id       : 'updatedAt',
			accessor : (row) => (
				<div className={styles.text}>
					{formatDate({
						date       : row?.updatedAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
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

export default cycleWiseExceptionTable;
