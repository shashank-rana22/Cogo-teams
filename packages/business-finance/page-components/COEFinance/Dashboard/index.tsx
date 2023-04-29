import { Tooltip, Button, Modal } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import Filter from '../../commons/Filters';
import StyledTable from '../../commons/StyledTable';
import MyResponsivePie from '../Components/PieChart';
import { PieChartData } from '../Components/PieChart/PieChartData';
import MyResponsiveBar from '../Components/ResponsiveBar';
import BarData from '../Components/ResponsiveBar/BarData';
import useJobStats from '../hook/useJobStats';
import useServiceOpsStats from '../hook/useServiceOpsStats';

import { columns } from './constants';
import { filterControls, reportControls } from './controls';
import JobStats from './JobStats';
import styles from './styles.module.css';

function Dashboard({ statsData }) {
	const [filters, setFilters] = useState({ zone: '', serviceType: '', days: '' });
	const [reportModal, setReportModal] = useState(false);
	const { So2statsData } = useServiceOpsStats(filters);
	const { jobStatsData } = useJobStats(filters);
	const { INITIATED = '', FINANCE_ACCEPTED = '', COE_REJECTED = '', FINANCE_REJECTED = '' } = statsData || {};

	const Status = [
		{ id: 1, label: 'Pending', value: INITIATED || '-' },
		{ id: 2, label: 'Approved', value: FINANCE_ACCEPTED || '-' },
		{ id: 3, label: 'Rejected', value: COE_REJECTED || '-' },
		{ id: 4, label: 'Finance Rejected', value: FINANCE_REJECTED || '-' },
	];

	return (
		<>
			<div className={styles.card_flex}>
				{Status.map((item) => (
					<div className={styles.card}>
						<div className={styles.card_label}>{item?.label}</div>
						<div className={styles.border} />
						<div className={styles.card_value}>{item?.value}</div>
					</div>
				))}
			</div>

			<div className={styles.filter_flex}>
				<Filter
					controls={filterControls}
					filters={filters}
					setFilters={setFilters}
				/>
				<div
					role="presentation"
					className={styles.report}
					onClick={() => { setReportModal(true); }}
				>
					Request Report
				</div>
			</div>

			<div className={styles.responsive}>
				<MyResponsiveBar data={BarData()} />
			</div>

			<div className={styles.space_between}>
				<div className={styles.service_stats}>
					<div className={styles.invoice}>
						Service Ops 2 Statistics
						<Tooltip content="Percentage of Invoices approved" placement="top">
							<div className={styles.icon}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>

					<div className={styles.border_main} />

					<div className={styles.table_data}>
						<StyledTable
							data={So2statsData}
							columns={columns}
							loading={false}
							imageFind=""
						/>
					</div>

				</div>

				<div className={styles.responsive_pie}>
					<MyResponsivePie data={PieChartData(filters)} />
				</div>
			</div>
			<div className={styles.stats}>
				<div className={styles.jobs}>
					Job Statistics & Profitability
					<Tooltip content="No. of Jobs/Shipment IDs and it’s profitability" placement="top">
						<div className={styles.icon}>
							<IcMInfo />
						</div>
					</Tooltip>
				</div>

				<div className={styles.job_border} />
				<JobStats jobData={jobStatsData} />
			</div>

			{reportModal && (
				<Modal
					size="md"
					placement="center"
					scroll={false}
					show={reportModal}
					onClose={() => {
						setReportModal(false);
					}}
				>
					<Modal.Header title="CREATE REPORT" />
					<Modal.Body>
						<div className={styles.filter}>
							<Filter
								controls={reportControls}
								filters={filters}
								setFilters={setFilters}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.button_flex}>
							<Button>Submit</Button>
						</div>

					</Modal.Footer>

				</Modal>
			) }

		</>
	);
}
export default Dashboard;
