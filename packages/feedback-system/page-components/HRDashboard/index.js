import { Modal, Select, Button } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { IcMNotifications, IcMUpload } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import PerformanceChart from '../../common/PerformanceChart';
import TeamStats from '../../common/TeamStats';

import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import { deptControls as departmentControls } from '../../utils/departmentControls';
import { getControls } from '../../utils/filterControls';
import getMonthControls from '../../utils/monthControls';

import NotifyModal from './NotifyModal';
import styles from './styles.module.css';
import TeamMembersList from './TeamMembersList';
import UploadModalBody from './UploadModal';

const DEPARTMENT_MAPPING = {
	technology : 'tech_role',
	finance    : 'finance_role',
	business   : 'business_role',
};

const dummyListData = [
	{
		user_name         : 'Harry Potter',
		employee_id       : 'COGO5196',
		team_size         : 3,
		feedbacks_pending : 29,
		latest_kpi        : 1,
		details           : [{
			user_name         : 'Hermione Granger',
			employee_id       : 'COGO5666',
			team_size         : 1,
			feedbacks_pending : 20,
			latest_kpi        : 4,
			score             : 16,
		},
		{
			user_name         : 'Neville Longbottom',
			employee_id       : 'COGO5116',
			team_size         : 1,
			feedbacks_pending : 21,
			latest_kpi        : 3,
			score             : 12,
		},
		{
			user_name         : 'Ron Weasley',
			employee_id       : 'COGO5016',
			team_size         : 1,
			feedbacks_pending : 21,
			latest_kpi        : 3,
			score             : 16,
		}],
	},
	{
		user_name         : 'Cute Person',
		employee_id       : 'COGO5896',
		team_size         : 3,
		feedbacks_pending : 23,
		latest_kpi        : 4,
		details           : [{
			user_name         : 'Nice Person',
			employee_id       : 'COGO5896',
			team_size         : 3,
			feedbacks_pending : 23,
			latest_kpi        : 4,
			score             : 16,
		},
		{
			user_name         : 'Also Person',
			employee_id       : 'COGO5116',
			team_size         : 7,
			feedbacks_pending : 21,
			latest_kpi        : 3,
			score             : 11,
		}],
	},
	{
		user_name         : 'Draco Malfoy',
		employee_id       : 'COGO5196',
		team_size         : 3,
		feedbacks_pending : 29,
		latest_kpi        : 2,
		details           : [{
			user_name         : 'Pansy Parkinson',
			employee_id       : 'COGO3166',
			team_size         : 1,
			feedbacks_pending : 18,
			latest_kpi        : 3,
			score             : 16,
		},
		{
			user_name         : 'Crabbe Goyle',
			employee_id       : 'COGO5116',
			team_size         : 1,
			feedbacks_pending : 3,
			latest_kpi        : 2,
			score             : 15,
		}],
	},
];

function HRDashboard() {
	const Router = useRouter();

	const routeToFeedbackForms = () => {
		Router.push('/feedback-system/hr-dashboard/feedback-forms');
	};

	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [notifyModal, setNotifyModal] = useState(false);

	const [selectedBucket, setSelectedBucket] = useState('');

	const { params, setParams, feedbackData, loading, setPage } = useListUserFeedbacks({});

	const monthControls = getMonthControls(params.filters.created_at_year);

	const { watch, control: managerControl = {} } = useForm();
	const manager = watch('manager_id');

	const { list = [] } = feedbackData || {};

	const deptControls = departmentControls.find((control) => control.name === 'department');

	const roleControls = params.filters?.department ? departmentControls.find((control) => control.name
	=== DEPARTMENT_MAPPING[params.filters?.department]) : {};

	const setFilter = (val, type) => {
		setParams({ ...params, filters: { ...(params.filters || {}), [type]: val } });
	};

	const managerControls = getControls().find((control) => control.name === 'manager_id');

	const redirectToFeedbackManagement = () => {
		Router.push('/feedback-system/hr-dashboard/feedback-management');
	};

	useEffect(() => {
		setParams({
			...params,
			filters: {
				...(params.filters || {}),
				manager_id: manager || undefined,
			},
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [manager]);

	return (
		<div className={styles.container}>
			<div className={styles.top_most_container}>
				<h1>
					HR Dashboard
				</h1>
				<div className={styles.question_button_container}>
					<Button
						size="lg"
						themeType="secondary"
						style={{ marginRight: '16px' }}
						onClick={() => setNotifyModal(true)}
					>
						<IcMNotifications style={{ marginRight: '4px' }} />
						Send Notification
					</Button>
					<Button
						size="lg"
						themeType="secondary"
						style={{ marginRight: '16px' }}
						onClick={() => {
						// upload();
							setOpenUploadModal(true);
						}}
					>
						<IcMUpload style={{ marginRight: '4px' }} />
						Upload CSV
					</Button>

					<Button size="lg" themeType="accent" onClick={() => routeToFeedbackForms()}>Create New Form</Button>
				</div>
			</div>

			<div className={styles.top_container}>
				<div className={styles.filters}>

					<div className={styles.department_select}>
						<Select
							value={params.filters?.department}
							onChange={(val) => setFilter(val, 'department')}
							options={deptControls.options}
							placeholder="Department..."
							style={{ marginRight: '8px' }}
							isClearable={!params.filters?.designation}
						/>
						<Select
							value={params.filters?.designation}
							onChange={(val) => setFilter(val, 'designation')}
							options={roleControls.options}
							disabled={!params.filters?.department}
							placeholder="Role..."
							style={{ marginRight: '8px' }}
							isClearable
						/>

						<SelectController
							{...managerControls}
							control={managerControl}
							style={{ marginRight: '8px' }}
						/>

						<Select
							value={params.filters?.created_at_year}
							onChange={(val) => setFilter(val, 'created_at_year')}
							placeholder="Select Year"
							style={{ marginRight: '8px' }}
							options={monthControls.created_at_year.options}
							isClearable={!params.filters?.created_at_month}
						/>

						<Select
							value={params.filters?.created_at_month}
							onChange={(val) => setFilter(val, 'created_at_month')}
							disabled={!params.filters?.created_at_year}
							placeholder="Select Month"
							style={{ marginRight: '8px' }}
							options={monthControls.created_at_month.options}
							isClearable
						/>
					</div>
				</div>

			</div>

			<div>
				<div className={styles.stats_container}>
					<PerformanceChart />

					{/* <TeamStats
						selectedBucket={selectedBucket}
						setParams={setParams}
						setSelectedBucket={setSelectedBucket}
					/> */}
				</div>

				<div className={styles.list_header}>
					<p className={styles.list_title}>
						All Users Feedback List
					</p>

					<div className={styles.list_actions}>

						<Button
							size="md"
							themeType="secondary"
							onClick={() => {
								redirectToFeedbackManagement();
							}}
						>
							View and Download all Feedbacks
						</Button>
					</div>
				</div>

				<div className={styles.table_section}>
					<TeamMembersList
						list={dummyListData}
						loading={false}
						page_limit={3}
						total_count={3}
						pagination={1}
						setPagination={setPage}
					/>
				</div>

				{openUploadModal
				&& (
					<Modal
						show={openUploadModal}
						onClose={() => setOpenUploadModal(false)}
						onClickOutside={() => setOpenUploadModal(false)}
					>
						<Modal.Header title="Upload CSV" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								<UploadModalBody setOpenUploadModal={setOpenUploadModal} />
							</Modal.Body>
						</div>

					</Modal>
				)}

				{notifyModal
				&& (
					<Modal
						show={notifyModal}
						onClose={() => setNotifyModal(false)}
						onClickOutside={() => setNotifyModal(false)}
					>
						<Modal.Header title="Notify Managers" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								<NotifyModal setNotifyModal={setNotifyModal} />
							</Modal.Body>
						</div>

					</Modal>
				)}
			</div>
		</div>
	);
}

export default HRDashboard;
