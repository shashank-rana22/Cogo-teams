import { Toast, Tabs, TabPanel, Modal, Button } from '@cogoport/components';
import { IcMEdit, IcMUpload } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import useCreateLog from '../../../../hooks/useCreateLog';
import UseCreatePipOrProbation from '../../../../hooks/useCreatePipOrProbation';
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
	const [openCreate, setOpenCreate] = useState(false);
	const [openLogModal, setOpenLogModal] = useState(false);
	const [activeLogTab, setActiveLogTab] = useState('new');
	const [tags, setTags] = useState([]);
	const [checkList, setCheckList] = useState([false, false, false]);
	const [comments, setComments] = useState('');
	const [logItem, setLogItem] = useState({});

	const [type, setType] = useState('');
	const [status, setStatus] = useState('');
	const [item, setItem] = useState({});
	const [activeTab, setActiveTab] = useState('dashboard');
	const [show, setShow] = useState(false);
	const [disableNext, setDisableNext] = useState(true);
	// const [pipParams, setPipParams] = useState({
	// 	show        : false,
	// 	disableNext : false,
	// });

	const { onSubmitCreate = () => {} } = UseCreatePipOrProbation();

	const { onCreateLog = () => {} } = useCreateLog();

	// useEffect(() => debounceQuery(searchValue), [searchValue])
	// useEffect(() => setPipParams({ show: false, disableNext: false }), []);

	// update and create functions
	const clickedNext = () => {
		if (show) {
			Toast.success('Update Sent to the Employee');
			setOpenUpdate(false);
		}
		// else {
		// 	setPipParams({ ...pipParams, show: true, disableNext: true });
		// }
	};

	const clickedBack = () => {
		if (status === '') { setOpenCreate(false); }
		if (isEmpty(item)) {
			setStatus('');
		} else {
			setItem({});
		}
	};

	const setLogTags = () => {
		if (checkList[0]) {
			setTags([...tags, 'email sent to employyee']);
		}
		if (checkList[1]) {
			setTags([...tags, 'email sent to manager']);
		}
		if (checkList[2]) {
			setTags([...tags, 'final discussion held']);
		}
	};

	const onSubmitLog = () => {
		setLogTags();
		setLogItem({
			user_id  : item?.user_id,
			log_id   : item?.id,
			log_type : item?.log_type,
			tags,
			comment  : comments,
		});
		onCreateLog(logItem);
		setOpenLogModal(false);
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
									item={item}
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
					themeType="primary"
					onClick={() => {
						setType('create');
						setOpenCreate(true);
					}}
				>
					<IcMEdit style={{ marginRight: '4px' }} />
					Create
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
								<DecisionModal
									item={item}
									setItem={setItem}
									// type={type}
									type="update"
									// params={pipParams}
									// setParams={setPipParams}
									show={show}
									setShow={setShow}
								/>
							</Modal.Body>
						</div>
						<Modal.Footer>
							<Button
								size="md"
								themeType="tertiary"
								onClick={setOpenUpdate(false)}
							>
								{status ? 'Back' : 'Close'}

							</Button>

							{status && (
								<Button
									size="md"
									style={{ marginLeft: '8px' }}
									onClick={clickedNext}
									disabled={disableNext}
								>
									{(show) ? ('Submit') : ('Next')}

								</Button>
							)}
						</Modal.Footer>
					</Modal>
				)}

			{openCreate
				&& (
					<Modal
						show={openCreate}
						onClose={() => {
							setOpenCreate(false);
							setItem({});
						}}
						size="lg"
					>
						<Modal.Header title="Create" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								{!status ? (
									<div>
										<p style={{ padding: '8px' }}>Do you wish to create new Probation or PIP</p>
										<div className={styles.pip_select}>
											<Button
												size="xl"
												className={styles.pip_select_btn}
												themeType="secondary"
												onClick={() => setStatus('probation')}
												style={{ width: '120px' }}
											>
												Probations
											</Button>

											<Button
												size="xl"
												className={styles.pip_select_btn}
												themeType="secondary"
												onClick={() => setStatus('pip')}
												style={{ width: '120px' }}
											>
												PIP
											</Button>
										</div>
									</div>
								) : (
									<LogModal
										item={item}
										type={type}
										setType={setType}
										setItem={setItem}
										show={show}
										setShow={setShow}
										setDisableNext={setDisableNext}
									/>
								)}
							</Modal.Body>
						</div>
						<Modal.Footer>
							<Button
								size="md"
								themeType="tertiary"
								onClick={clickedBack}
							>
								{status ? 'Back' : 'Close'}

							</Button>

							{!isEmpty(item) && (
								<Button
									size="md"
									style={{ marginLeft: '8px' }}
									onClick={() => {
										// console.log(item);
										onSubmitCreate(item, status);
										setOpenCreate(false);
									}}
									disabled={disableNext}
								>
									Submit
								</Button>
							)}
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
								<Tabs
									activeTab={activeLogTab}
									themeType="primary"
									onChange={setActiveLogTab}
								>
									<TabPanel name="new" title="New Log">
										<NewLog
											setComments={setComments}
											checkList={checkList}
											setCheckList={setCheckList}
										/>
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

							<Button
								size="md"
								themeType="primary"
								onClick={onSubmitLog}
							>
								Submit
							</Button>
						</Modal.Footer>
					</Modal>
				)}
		</div>
	);
}

export default PIPProbations;
