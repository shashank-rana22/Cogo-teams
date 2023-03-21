import { Toast, Tabs, TabPanel, Modal, Button } from '@cogoport/components';
import { IcMEdit, IcMUpload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useListEmployees from '../../../../hooks/useListEmployees';
import DecisionModal from '../../DecisionModal';
import PipUloadModal from '../../PipUploadModal';
// import UploadModalBody from '../../UploadModal';

import Dashboard from './Dashboard';
import LogModal from './LogModal';
import AllLogs from './LogModal/AllLogs';
import NewLog from './LogModal/NewLog';
import PendingReviews from './PendingReviews';
import styles from './styles.module.css';
import UploadedFiles from './UploadedFiles';

// Todo put it inside constants
const TAB_PANEL_COMPONENT_MAPPING = {
	dashboard: {
		name      : 'dashboard',
		title     : 'Dashboard',
		Component : Dashboard,
	},
	pending_reviews: {
		name      : 'pending_reviews',
		title     : 'Pending Reviews',
		Component : PendingReviews,
	},
	uploaded_files: {
		name      : 'uploaded_files',
		title    	: 'Uploaded Files',
		Component : UploadedFiles,
	},
};

function PIPProbations() {
	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openLogModal, setOpenLogModal] = useState(false);
	const [activeLogTab, setActiveLogTab] = useState('new');

	const [type, setType] = useState('');
	const [item, setItem] = useState({});
	const [activeTab, setActiveTab] = useState('dashboard');
	const [pipParams, setPipParams] = useState({
		show        : false,
		disableNext : false,
	});
	const { show, disableNext } = pipParams;

	const { employeeData = {}, loading = false, params, setPage } = useListEmployees({});

	// useEffect(() => debounceQuery(searchValue), [searchValue])
	// useEffect(() => setPipParams({ show: false, disableNext: false }), []);

	// update and create functions
	const clickedNext = () => {
		if (show) {
			Toast.success('Update Sent to the Employee');
			setOpenUpdate(false);
		} else {
			setPipParams({ ...pipParams, show: true, disableNext: true });
		}
	};

	return (
		<div className={styles.container}>
			<div>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					{Object.values(TAB_PANEL_COMPONENT_MAPPING).map((tabPanelItem) => {
						const { name = '', title = '', Component } = tabPanelItem;

						if (!Component) return null;

						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							>
								<Component
									activeTab={activeTab}
									params={params}
									setPage={setPage}
									setItem={setItem}
									setOpenUpdate={setOpenUpdate}
									setOpenLogModal={setOpenLogModal}
									setType={setType}
								/>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="tertiary"
					style={{ marginRight: '16px' }}
					onClick={() => setOpenUploadModal(true)}
				>
					<IcMUpload style={{ marginRight: '4px' }} />
					Upload CSV
				</Button>

				<Button
					size="md"
					themeType="secondary"
					onClick={() => { setType('create'); setOpenUpdate(true); }}
				>
					<IcMEdit style={{ marginRight: '4px' }} />
					Update User Status
				</Button>
			</div>

			{openUploadModal
				&& (
					<Modal
						show={openUploadModal}
						onClose={() => setOpenUploadModal(false)}
					>
						<Modal.Header title="Upload CSV" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								<PipUloadModal setOpenUploadModal={setOpenUploadModal} />
							</Modal.Body>
						</div>
					</Modal>
				)}

			{openUpdate
				&& (
					<Modal
						show={openUpdate}
						onClose={() => {
							setOpenUpdate(false);
							setItem({});
						}}
						size="lg"
					>
						<Modal.Header title={startCase(type)} />
						<div className={styles.upload_modal}>
							<Modal.Body>
								{type === 'update' ? (
									<DecisionModal
										item={item}
										setItem={setItem}
										type={type}
										params={pipParams}
										setParams={setPipParams}
									/>
								)
									: (
										<LogModal
											item={item}
											type={type}
											setType={setType}
											setItem={setItem}
											params={pipParams}
											setParams={setPipParams}
										/>
									)}
							</Modal.Body>
						</div>
						<Modal.Footer>
							<Button
								size="md"
								themeType="tertiary"
								onClick={() => {
									if (type === 'create') {
										setOpenUpdate(false);
									} else {
										setPipParams({ ...pipParams, show: false, disableNext: false });
									}
								}}
							>
								Back

							</Button>

							<Button
								size="md"
								style={{ marginLeft: '8px' }}
								onClick={clickedNext}
								disabled={disableNext}
							>
								{(show || type === 'create') ? ('Submit And Notify') : ('Next')}

							</Button>
						</Modal.Footer>
					</Modal>
				)}

			{openLogModal
				&& (
					<Modal
						show={openLogModal}
						onClose={() => {
							setOpenLogModal(false);
							setItem({});
						}}
						size="lg"
					>
						<Modal.Header title="Logs" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								{/* <LogModal item={item} setItem={setItem} /> */}
								<Tabs
									activeTab={activeLogTab}
									themeType="primary"
									onChange={setActiveLogTab}
								>
									<TabPanel name="new" title="New Log">
										<NewLog />
									</TabPanel>
									<TabPanel name="all" title="All Logs">
										<AllLogs />
									</TabPanel>
								</Tabs>
							</Modal.Body>
						</div>
						<Modal.Footer>
							<Button
								size="md"
								themeType="tertiary"
								onClick={() => setOpenLogModal(false)}
							>
								Back

							</Button>
						</Modal.Footer>
					</Modal>
				)}
		</div>
	);
}

export default PIPProbations;
