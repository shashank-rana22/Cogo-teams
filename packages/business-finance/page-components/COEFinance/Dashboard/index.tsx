import { Modal } from '@cogoport/components';
import { useState } from 'react';

import Filter from '../../commons/Filters';
import SegmentedControl from '../../commons/SegmentedControl';
import MyResponsiveLines from '../Components/linecharts';
import MyResponsiveBar from '../Components/ResponsiveBar';
import data from '../Components/ResponsiveBar/data';
import MyResponsiveLine from '../Components/Stream';
import lineData from '../Components/Stream/data';

import { OPTIONS } from './constants';
import { filterControls, reportControls } from './controls';
import styles from './styles.module.css';

function Dashboard() {
	const [currentTab, setCurrentTab] = useState('');
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
						<Filter
							controls={reportControls}
							filters={filters}
							setFilters={setFilters}
						/>
					</Modal.Body>

				</Modal>
			) }

			<div className={styles.spacebetween}>
				<div
					style={{
						minWidth     : '60%',
						height       : 368,
						background   : '#ffffff',
						borderRadius : '8px',
						margin       : '16px',
					}}
				>
					<MyResponsiveLine data={lineData} />
				</div>
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
			</div>
			<div className={styles.spacebetween}>
				<div
					style={{
						background   : '#ffffff',
						minWidth     : '50%',
						height       : 323,
						borderRadius : '8px',
						margin       : '16px',
						padding      : '16px',
					}}
				>
					<div className={styles.flex}>
						<div className={styles.heading}>Job Related Statistics</div>
						<SegmentedControl
							options={OPTIONS}
							activeTab={currentTab}
							setActiveTab={setCurrentTab}
							color="#ED3726"
							background="#FFFAEB"
						/>
					</div>
					<div className={styles.totalstats}>
						<div>
							<div className={styles.stat}>25</div>
							<div className={styles.month}>Current Month - March</div>
						</div>
						<div>
							<div className={styles.stat}>25</div>
							<div className={styles.month}>February</div>
						</div>
						<div>
							<div className={styles.stat}>25</div>
							<div className={styles.month}>January</div>
						</div>
					</div>
				</div>
				<div
					style={{
						height       : 323,
						minWidth     : '45%',
						background   : '#ffffff',
						borderRadius : '8px',
						margin       : '16px',
					}}
				>
					<MyResponsiveLines />
				</div>
			</div>

		</>
	);
}
export default Dashboard;
