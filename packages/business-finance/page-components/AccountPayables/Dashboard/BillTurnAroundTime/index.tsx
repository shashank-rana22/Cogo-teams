import { Button, Select, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import StyledTable from '../commons/StyledTable';
import useGetBillTat from '../hooks/useGetBillTat';

// import GaugeChart from './GaugeChart';
import styles from './styles.module.css';
import tatColumn from './tatColumn';
import { timeFrameControls } from './timeFrameControls';

const options = [
	{ label: 'SO2 upload', value: 'so2Upload' },
	{ label: 'COE approved', value: 'approved' },
	{ label: 'PayRun creation', value: 'payrunCreated' },
	{ label: 'Bank allocation', value: 'bankAllocated' },
	{ label: 'First UTR Upload', value: 'firstUtrUpload' },
	{ label: 'Last UTR', value: 'lastUtrUpload' },
];

interface FilterProps {
	currency:string,
	service:string,
}
interface ItemProps {
	activeTab:string,
	filtersData:FilterProps,
}

function BillTurnAroundTime({ activeTab, filtersData }:ItemProps) {
	const [firstEvent, setFirstEvent] = useState('');
	const [secondEvent, setSecondEvent] = useState('');

	const { data, loading, filters, setFilters } = useGetBillTat({ activeTab, filtersData, firstEvent, secondEvent });
	const { hours } = data || {};
	const { Date } = filters || {};
	const { startDate, endDate } = Date || {};
	console.log(startDate, 'date');
	const date1 = format(startDate, 'dd MMM yyyy');
	const date2 = format(endDate, 'dd MMM yyyy');

	const list = [
		{
			firstEvent,
			secondEvent,
			date1,
			date2,
			hours,
		},
	];

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
						content="Turnaround time for Bill to move from one status to
						another that involves human intervention"
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
						size="md"
						themeType="secondary"
						style={{ marginTop: '6px' }}
						role="presentation"
					>
						Apply

					</Button>
				</div>
				<div className={styles.reset_button}>
					<Button
						size="md"
						themeType="linkUi"
						style={{ color: '#F68B21', marginTop: '16px' }}
					>
						Reset Table

					</Button>
				</div>
			</div>
			<StyledTable data={list} columns={tatColumn} loading={loading} />
		</div>
	);
}

export default BillTurnAroundTime;
