import { Modal, Select, Input, Button } from '@cogoport/components';
import { SelectController, useDebounceQuery, useForm } from '@cogoport/forms';
import { IcMDownload, IcMNotifications, IcMSearchlight, IcMUpload } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetColumns from '../../common/Columns';
import PerformanceChart from '../../common/PerformanceChart';
import TeamStats from '../../common/TeamStats';
// import UserTableData from '../../common/userTableData';
import useDownloadCsvFeedbacks from '../../hooks/useDownloadCsvFeedbacks';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import { deptControls as departmentControls } from '../../utils/departmentControls';
import { getControls } from '../../utils/filterControls';

import styles from './styles.module.css';
import TeamMembersList from './TeamMembersList';
import UploadModalBody from './UploadModal';

const DEPARTMENT_MAPPING = {
	technology : 'tech_role',
	finance    : 'finance_role',
	business   : 'business_role',
};

const dummyListData = [];
// const dummyListData = [
// 	{
// 		user_name         : 'Harry Potter',
// 		employee_id       : 'COGO5196',
// 		team_size         : 3,
// 		feedbacks_pending : 29,
// 		latest_kpi        : 1,
// 		details           : [{
// 			user_name         : 'Hermione Granger',
// 			employee_id       : 'COGO5666',
// 			team_size         : 1,
// 			feedbacks_pending : 20,
// 			latest_kpi        : 4,
// 			score             : 16,
// 		},
// 		{
// 			user_name         : 'Neville Longbottom',
// 			employee_id       : 'COGO5116',
// 			team_size         : 1,
// 			feedbacks_pending : 21,
// 			latest_kpi        : 3,
// 			score             : 12,
// 		},
// 		{
// 			user_name         : 'Ron Weasley',
// 			employee_id       : 'COGO5016',
// 			team_size         : 1,
// 			feedbacks_pending : 21,
// 			latest_kpi        : 3,
// 			score             : 16,
// 		}],
// 	},
// 	{
// 		user_name         : 'Cute Person',
// 		employee_id       : 'COGO5896',
// 		team_size         : 3,
// 		feedbacks_pending : 23,
// 		latest_kpi        : 4,
// 		details           : [{
// 			user_name         : 'Nice Person',
// 			employee_id       : 'COGO5896',
// 			team_size         : 3,
// 			feedbacks_pending : 23,
// 			latest_kpi        : 4,
// 			score             : 16,
// 		},
// 		{
// 			user_name         : 'Also Person',
// 			employee_id       : 'COGO5116',
// 			team_size         : 7,
// 			feedbacks_pending : 21,
// 			latest_kpi        : 3,
// 			score             : 11,
// 		}],
// 	},
// 	{
// 		user_name         : 'Draco Malfoy',
// 		employee_id       : 'COGO5196',
// 		team_size         : 3,
// 		feedbacks_pending : 29,
// 		latest_kpi        : 2,
// 		details           : [{
// 			user_name         : 'Pansy Parkinson',
// 			employee_id       : 'COGO3166',
// 			team_size         : 1,
// 			feedbacks_pending : 18,
// 			latest_kpi        : 3,
// 			score             : 16,
// 		},
// 		{
// 			user_name         : 'Crabbe Goyle',
// 			employee_id       : 'COGO5116',
// 			team_size         : 1,
// 			feedbacks_pending : 3,
// 			latest_kpi        : 2,
// 			score             : 15,
// 		}],
// 	},
// ];

function HRDashboard() {
	const Router = useRouter();

	const routeToFeedbackForms = () => {
		Router.push('/feedback-system/hr-dashboard/feedback-forms');
	};

	const [searchValue, setSearchValue] = useState('');
	const [openUploadModal, setOpenUploadModal] = useState(false);

	const { query = '', debounceQuery } = useDebounceQuery();

	const [selectedBucket, setSelectedBucket] = useState('');

	const columns = useGetColumns({});
	const { getUserListCsv } = useDownloadCsvFeedbacks({});

	const { params, setParams, feedbackData, loading, setPage } = useListUserFeedbacks({ searchValue: query });

	const { watch, control: managerControl = {} } = useForm();
	const manager = watch('performed_by_id');

	const { list = [], page_limit, total_count } = feedbackData || {};

	const deptControls = departmentControls.find((control) => control.name === 'department');
	const setDept = (val) => { setParams({ ...params, filters: { ...(params.filters || {}), department: val } }); };

	const roleControls = params.filters?.department ? departmentControls.find((control) => control.name
	=== DEPARTMENT_MAPPING[params.filters?.department]) : {};

	const setRole = (val) => {
		setParams({
			...params,
			filters: {
				...(params.filters || {}),
				work_scope: val,
			},
		});
	};

	const managerControls = getControls().find((control) => control.name === 'performed_by_id');

	const download = () => {
		getUserListCsv();
	};

	useEffect(() => debounceQuery(searchValue), [searchValue]);

	useEffect(() => {
		setParams({
			...params,
			filters: {
				...(params.filters || {}),
				performed_by_id: manager || undefined,
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
						onClick={() => {}}
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
							onChange={setDept}
							options={deptControls.options}
							placeholder="Department..."
							style={{ marginRight: '8px' }}
						/>
						<Select
							value={params.filters?.work_scope}
							onChange={setRole}
							options={roleControls.options}
							disabled={!params.filters?.department}
							placeholder="Role..."
							style={{ marginRight: '8px' }}
						/>

						<SelectController
							{...managerControls}
							control={managerControl}
							style={{ marginRight: '8px' }}
						/>
						<Select
							placeholder="Select Month"
							style={{ marginRight: '8px' }}
						/>
					</div>

					<Input
						size="md"
						value={searchValue}
						onChange={setSearchValue}
						placeholder="Search User..."
						prefix={<IcMSearchlight />}
						type="text"
					/>
				</div>

			</div>

			<div>
				<div className={styles.stats_container}>
					<PerformanceChart />

					<TeamStats
						selectedBucket={selectedBucket}
						setParams={setParams}
						setSelectedBucket={setSelectedBucket}
					/>
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
								download();
							}}
						>
							<IcMDownload style={{ marginRight: '4px' }} />
							Download CSV
						</Button>
					</div>
				</div>

				{/* <div className={styles.table_section}>
					<UserTableData
						columns={columns}
						list={list}
						loading={loading}
						page_limit={page_limit}
						total_count={total_count}
						pagination={params.page}
						setPagination={setPage}
					/>
				</div> */}

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
			</div>
		</div>
	);
}

export default HRDashboard;
