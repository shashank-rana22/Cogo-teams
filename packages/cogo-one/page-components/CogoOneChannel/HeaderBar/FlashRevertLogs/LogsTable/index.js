import { Table, Input, Button, ButtonIcon, Pagination, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListCogooneFlashRatesLogs from '../../../../../hooks/useListCogooneFlashRatesLogs';

import getLogsColumns from './getLogsColumns';
import styles from './styles.module.css';

function LogsTable() {
	const [sidQuery, setSidQuery] = useState('');
	const [filtersParams, setFilterParams] = useState({});

	const { logsLoading, logsData, setPagination } = useListCogooneFlashRatesLogs({ filtersParams, sidQuery });

	const logColumns = getLogsColumns({ setFilterParams, filtersParams });

	const reducedFilters = Object.keys(filtersParams).reduce((prev, itm) => {
		if (filtersParams[itm]) {
			return { ...prev, [itm]: filtersParams[itm] };
		}
		return prev;
	}, {});

	const { list = [], page, total_count, page_limit } = logsData || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Input
					size="sm"
					value={sidQuery || ''}
					placeholder="Search sid no.."
					className={styles.input_container}
					onChange={setSidQuery}
					prefix={<IcMSearchlight className={styles.search_icon} />}
					suffix={sidQuery && (
						<ButtonIcon
							size="sm"
							icon={<IcMDelete />}
							disabled={false}
							themeType="primary"
							onClick={() => setSidQuery('')}
						/>
					)}
				/>

				{Object.keys(reducedFilters).length ? (
					<div className={styles.filters_view}>
						{Object.entries(reducedFilters).map(
							([key, value]) => (
								<Pill key={key} color="#FAD1A5">
									{key === 'flashed_at'
										? `Flashed after ${formatDate({
											date       : value,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
											separator  : ', ',
										})}`
										: startCase(value)}
									<IcMDelete
										className={styles.delete_icon}
										onClick={() => setFilterParams(
											(prev) => ({
												...prev,
												[key]: undefined,
											}),
										)}
									/>
								</Pill>
							),
						)}
						<Button
							size="sm"
							themeType="tertiary"
							className={styles.button_container}
							onClick={() => setFilterParams({})}
						>
							Clear All
						</Button>
					</div>
				) : null}
			</div>

			<Table
				columns={logColumns}
				data={list}
				layoutType="table"
				loading={logsLoading}
				loadingRowsCount={10}
			/>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPagination}
				/>
			</div>
		</div>
	);
}

export default LogsTable;
