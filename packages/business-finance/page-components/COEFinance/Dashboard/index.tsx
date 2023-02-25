import { Tooltip, Button, Modal } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import Filter from '../../commons/Filters';
import StyledTable from '../../commons/StyledTable';
import MyResponsivePie from '../Components/PieChart';
import MyResponsiveBar from '../Components/ResponsiveBar';
import data from '../Components/ResponsiveBar/data';

import { columns } from './constants';
import { filterControls, reportControls } from './controls';
import styles from './styles.module.css';

function Dashboard() {
	const [filters, setFilters] = useState({});
	const [reportModal, setReportModal] = useState(false);

	const Status = [
		{ id: 1, label: 'Pending', value: '24' },
		{ id: 2, label: 'Approved', value: '12' },
		{ id: 3, label: 'Rejected', value: '20' },
		{ id: 4, label: 'Finance Rejected', value: '28' },
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

			<div className={styles.responsive}>
				<MyResponsiveBar data={data} />
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

					<div>
						<StyledTable
							data={[{}]}
							columns={columns}
						/>
					</div>

				</div>
				<div className={styles.responsive_pie}>
					<MyResponsivePie />
				</div>
			</div>
			<div className={styles.stats}>
				<div className={styles.invoice}>
					Job Statistics & Profitability
					<Tooltip content="No. of Jobs/Shipment IDs and it’s profitability" placement="top">
						<div className={styles.icon}>
							<IcMInfo />
						</div>
					</Tooltip>
				</div>

				<div className={styles.border_main} />

			</div>

		</>
	);
}
export default Dashboard;
