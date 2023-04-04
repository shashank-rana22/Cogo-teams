/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Select, Tooltip } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Filter from '../../../commons/Filters';
import StyledTable from '../commons/StyledTable';
import { options } from '../Constants';
import useGetBillTat from '../hooks/useGetBillTat';

import styles from './styles.module.css';
import tatColumn from './tatColumn';
import { timeFrameControls } from './timeFrameControls';

interface FilterProps {
	currency:string,
	service:string,
}
interface ItemProps {
	filtersData: FilterProps,
	activeEntity: string;
}

function BillTurnAroundTime({ filtersData, activeEntity }:ItemProps) {
	const [firstEvent, setFirstEvent] = useState('');
	const [secondEvent, setSecondEvent] = useState('');

	const { data, loading, filters, setFilters, onApply } = useGetBillTat({
		filtersData,
		firstEvent,
		secondEvent,
		activeEntity,
	});
	const { handleSubmit } = useForm();

	const { hours } = data || {};
	const { Date } = filters || {};
	const { startDate, endDate } = Date || {};

	const date1 = format(startDate, 'dd MMM yyyy');
	const date2 = format(endDate, 'dd MMM yyyy');

	const [dataList, setDataList] = useState([]);

	const list = [
		{
			firstEvent,
			secondEvent,
			date1,
			date2,
			hours,
		},
	];

	useEffect(() => {
		if (hours) {
			setDataList([...dataList, ...list]);
		}
	}, [hours]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Bill Turn Around Time
						<div className={styles.hr} />
					</div>
					<Tooltip
						placement="top"
						content={(
							<div>
								Turnaround time for Bill to move from one status to
								<br />
								another that involves
								<br />
								human intervention.
								<br />
								<div className={styles.tooltip_text}>
									[Select TASKS and DATE
									<br />
									to see TAT]
								</div>
							</div>
						)}
					>
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
			</div>
			<div className={styles.filter}>
				<div className={styles.task_filter}>
					<div className={styles.select_filter}>
						Select Start Task
						<Select
							name="firstEvent"
							value={firstEvent}
							onChange={setFirstEvent}
							placeholder="From"
							options={options}
							size="md"
							isClearable
							style={{ width: '200px' }}
						/>
					</div>
					<div className={styles.select_filter}>
						Select End Task
						<Select
							name="secondEvent"
							value={secondEvent}
							onChange={setSecondEvent}
							placeholder="To"
							options={options}
							size="md"
							isClearable
							style={{ width: '200px' }}
						/>
					</div>
					<div className={styles.select_filter}>
						Date
						<div>
							<Filter controls={timeFrameControls} filters={filters} setFilters={setFilters} />
						</div>
					</div>
					<Button
						size="lg"
						themeType="secondary"
						style={{ marginTop: '2px' }}
						onClick={handleSubmit(onApply)}
						disabled={firstEvent === '' || secondEvent === ''
						|| startDate === undefined || endDate === null}
					>
						Apply

					</Button>
				</div>
				<div className={styles.reset_button}>
					<Button
						size="md"
						themeType="linkUi"
						style={{ color: '#F68B21', marginTop: '16px' }}
						onClick={() => {
							setDataList([]);
							setFirstEvent(undefined);
							setSecondEvent(undefined);
							setFilters({ Date: undefined });
						}}
					>
						Reset Table

					</Button>
				</div>
			</div>
			<StyledTable data={dataList} columns={tatColumn} loading={loading} />
		</div>
	);
}

export default BillTurnAroundTime;
