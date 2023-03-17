import { Toast, Tabs, TabPanel, Modal, Button } from '@cogoport/components';
import { IcMEdit, IcMUpload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetColumns from '../../../../common/Columns';
import UserTableData from '../../../../common/UserTableData';
import feedbackDataColumns from '../../../../constants/feedback-data-columns';
import useListEmployees from '../../../../hooks/useListEmployees';
import DecisionModal from '../../DecisionModal';
import PipUloadModal from '../../PipUploadModal';
import UploadModalBody from '../../UploadModal';

import Dashboard from './Dashboard';
import LogModal from './LogModal';
import styles from './styles.module.css';

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
		Component : () => <div>bvnm,,,,</div>,
	},
	uploaded_files: {
		name      : 'uploaded_files',
		title    	: 'Uploaded Files',
		Component : () => <div>bvnm,,,,</div>,
	},
};

function PIPProbations() {
	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openLogModal, setOpenLogModal] = useState(false);

	const [type, setType] = useState('');
	const [item, setItem] = useState({});
	const [activeTab, setActiveTab] = useState('dashboard');
	const [pipParams, setPipParams] = useState({
		show       : false,
		diableNext : true,
	});
	const { show, diableNext } = pipParams;

	const { employeeData = {}, loading = false, params, setPage } = useListEmployees({});

	// useEffect(() => debounceQuery(searchValue), [searchValue]);

	const columnsToShow = feedbackDataColumns.pipProbationList;
	const columns = useGetColumns({
		columnsToShow,
		setItem,
		source: 'hr_dashboard',
		setOpenUpdate,
		setType,
		setOpenLogModal,
	});

	const dataList = {
		1: [{
			name            : 'apple',
			id              : '1',
			designation     : 'fruit',
			manager_name    : 'apple_tree',
			employee_status : 'exited',
			is_pip          : true,
		},
		{
			name            : 'mango',
			id              : '2',
			designation     : 'fruit',
			manager_name    : 'mango_tree',
			employee_status : 'employed',
			is_pip          : true,
		}],
		2: [{
			name            : 'lemon',
			id              : '3',
			designation     : 'fruit',
			manager_name    : 'lemon_tree',
			employee_status : 'probation',
			is_pip          : false,
		},
		{
			name            : 'carrot',
			id              : '5',
			designation     : 'vegetable',
			manager_name    : 'carrot_plant',
			employee_status : 'probation',
			is_pip          : true,
		}],
	};

	// update and create functions
	const clickedNext = () => {
		if (show) {
			Toast.success('Update Sent to the Employee');
			setOpenUpdate(false);
		} else {
			setPipParams({ ...pipParams, show: true, diableNext: true });
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
								<Component />
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
					onClick={() => { setType('create'); console.log(type); setOpenUpdate(true); }}
				>
					<IcMEdit style={{ marginRight: '4px' }} />
					Update User Status
				</Button>
			</div>

			<UserTableData
				columns={columns}
				list={dataList[params.Page]}
				pagination={params.Page}
				page_limit={2}
				setPagination={setPage}
				total_count={4}
			/>

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
									type={type}
									params={pipParams}
									setParams={setPipParams}
								/>
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
										setPipParams({ ...pipParams, show: false, diableNext: false });
									}
								}}
							>
								Back

							</Button>

							<Button
								size="md"
								style={{ marginLeft: '8px' }}
								onClick={clickedNext}
								disabled={diableNext}
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
								<LogModal item={item} setItem={setItem} />
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
