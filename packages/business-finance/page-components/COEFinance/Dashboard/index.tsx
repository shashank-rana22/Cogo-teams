import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import Filter from '../../commons/Filters';
import MyResponsiveBar from '../Components/ResponsiveBar';
import data from '../Components/ResponsiveBar/data';

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

			<div
				style={{
					height       : 368,
					minWidth     : '35%',
					background   : '#ffffff',
					borderRadius : '8px',
					margin       : '16px',
				}}
			>
				<MyResponsiveBar data={data} />
			</div>

		</>
	);
}
export default Dashboard;
