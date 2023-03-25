import { Textarea, Toast, Tabs, TabPanel, Modal, Button } from '@cogoport/components';
import { IcMDownload, IcMEdit, IcMUpload } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import tabPanelComponentMapping from '../../../../constants/tab-pannel-component-mapping';
import useCreateLog from '../../../../hooks/useCreateLog';
import UseCreatePipOrProbation from '../../../../hooks/useCreatePipOrProbation';
import DecisionModal from '../../DecisionModal';
import PipUloadModal from '../../PipUploadModal';

import LogModal from './LogModal';
import AllLogs from './LogModal/AllLogs';
import NewLog from './LogModal/NewLog';
import styles from './styles.module.css';

function PIPProbations() {
	const [activeLogTab, setActiveLogTab] = useState('new'); // logTabs new Log or ALl Logs
	const [modal, setModal] = useState(''); // for update,logs,create,upload modals

	const [status, setStatus] = useState(''); // for pip or probation (create,updateProbation,log=>updatePIP)
	const [item, setItem] = useState({}); // dor sending payload and setting the user id from the list
	const [activeTab, setActiveTab] = useState('dashboard'); // to switch between tabs
	const [disableNext, setDisableNext] = useState(true); // to enable the submit button in create and update

	const { onSubmitCreate = () => {} } = UseCreatePipOrProbation();

	const { onCreateLog = () => {} } = useCreateLog();

	// useEffect(() => debounceQuery(searchValue), [searchValue])
	// useEffect(() => setPipParams({ show: false, disableNext: false }), []);

	const onSubmit = () => {
		onCreateLog({
			user_id        : item?.user_id,
			log_id         : item?.id,
			log_type       : item?.log_type,
			comment        : item?.comments,
			final_decision : item?.final_decision,
			tags           : item?.tags,
			is_reviewed    : item?.is_reviewed,
		});
		Toast.success('Updated Successfully');
		setModal('');
	};

	const clickedBack = () => {
		if (status === '') { setModal(''); }
		if (isEmpty(item)) {
			setStatus('');
		} else {
			setItem({});
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
					{Object.values(tabPanelComponentMapping).map((tabPanelItem) => {
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
									setModal={setModal}
									// setType={setType}
								/>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>

			<div className={styles.button_container}>
				<Button
					size="lg"
					themeType="tertiary"
					style={{ marginRight: '16px' }}
					onClick={() => setModal('upload')}
				>
					<IcMUpload style={{ marginRight: '4px' }} />
					Upload CSV
				</Button>

				<Button
					size="lg"
					themeType="tertiary"
					style={{ marginRight: '16px' }}
					onClick={() => setModal('download')}
				>
					<IcMDownload style={{ marginRight: '4px' }} />
					Probation CSV
				</Button>

				<Button
					size="lg"
					themeType="primary"
					onClick={() => {
						// setType('create');
						setModal('create');
					}}
				>
					<IcMEdit style={{ marginRight: '4px' }} />
					Create
				</Button>
			</div>

			{modal === 'upload'
				&& (
					<Modal
						show={modal === 'upload'}
						onClose={() => setModal('')}
					>
						<Modal.Header title="Upload CSV" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								<PipUloadModal setModal={setModal} />
							</Modal.Body>
						</div>
					</Modal>
				)}

			{modal === 'update'
				&& (
					<Modal
						show={modal === 'update'}
						onClose={() => {
							setModal('');
							setItem({});
						}}
						size="lg"
					>
						<Modal.Header title="Update" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								<DecisionModal
									item={item}
									setItem={setItem}
									setDisableNext={setDisableNext}
									type="update"
								/>
							</Modal.Body>
						</div>
						<Modal.Footer>
							<Button
								size="md"
								themeType="tertiary"
								onClick={() => setModal('')}
							>
								Close
							</Button>

							<Button
								size="md"
								style={{ marginLeft: '8px' }}
								onClick={onSubmit}
								disabled={disableNext}
							>
								Submit
							</Button>

						</Modal.Footer>
					</Modal>
				)}

			{modal === 'create'
				&& (
					<Modal
						show={modal === 'create'}
						onClose={() => {
							setModal('');
							setItem({});
							setStatus('');
						}}
						size="lg"
					>
						<Modal.Header title={`Create ${startCase(status)}`} />
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
										setItem={setItem}
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
										onSubmitCreate(item, status);
										setModal('');
									}}
									disabled={disableNext}
								>
									Submit
								</Button>
							)}
						</Modal.Footer>
					</Modal>
				)}

			{modal === 'logs'
				&& (
					<Modal
						show={modal === 'logs'}
						onClose={() => {
							setModal('');
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
											item={item}
											setItem={setItem}
											setDisableNext={setDisableNext}
										/>
									</TabPanel>
									<TabPanel name="all" title="All Logs">
										<AllLogs
											item={item}
										/>
									</TabPanel>
								</Tabs>
							</Modal.Body>
						</div>
						<Modal.Footer>
							<Button
								size="md"
								themeType="tertiary"
								type="button"
								onClick={() => {
									setModal('');
									setItem({});
								}}
							>
								Close
							</Button>

							<Button
								size="md"
								themeType="primary"
								type="submit"
								disabled={disableNext}
								onClick={onSubmit}
							>
								Submit
							</Button>
						</Modal.Footer>
					</Modal>
				)}

			{modal === 'review'
					&& (
						<Modal
							show={modal === 'review'}
							onClose={() => {
								setModal(false);
								setItem({});
							}}
							size="lg"
						>
							<Modal.Header title="Review" />
							<div className={styles.upload_modal}>
								<Modal.Body>
									<div className={styles.modal_container}>
										<div style={{ display: 'flex' }}>
											<div className={styles.label}>
												{item?.name}

											</div>
											<div className={styles.label}>
												{item?.designation}

											</div>
											<div className={styles.label}>
												{` - ${item?.cogo_id}`}
											</div>
										</div>
										<div style={{ display: 'flex' }}>
											<div className={styles.sub_container}>
												<div className={styles.sub_heading}>Reports To</div>
												<div>{item?.manager_name}</div>
											</div>
											<div className={styles.sub_container}>
												<div className={styles.sub_heading}>Latest KPI</div>
												<div>{item?.rating}</div>
											</div>
											<div className={styles.sub_container}>
												<div className={styles.sub_heading}>Update</div>
												<div>{item?.update}</div>
											</div>
										</div>
										<div className={styles.sub_container}>
											<div className={styles.label}>Add Remarks</div>
											<Textarea placeholder="Type here..." style={{ height: '100px' }} />
										</div>
									</div>
								</Modal.Body>
							</div>
							<Modal.Footer>
								<Button
									size="md"
									themeType="tertiary"
									onClick={() => setModal('')}
								>
									Cancel

								</Button>

								<Button
									size="md"
									type="submit"
									onClick={onSubmit}
								>
									Mark as Reviewd

								</Button>
							</Modal.Footer>
						</Modal>
					)}
		</div>
	);
}

export default PIPProbations;
