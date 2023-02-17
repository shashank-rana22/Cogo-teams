import { Modal, Button, Input, Select } from '@cogoport/components';
import { SelectController, useDebounceQuery, useForm } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetColumns from '../../common/Columns';
import Filters from '../../common/Filters';
import PerformanceChart from '../../common/PerformanceChart';
import TeamStats from '../../common/TeamStats';
import UserTableData from '../../common/userTableData';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import { getControls } from '../../utils/filterControls';
import getUserFilterControls from '../../utils/getUserFilterControls';
import getMonthControls from '../../utils/monthControls';

import NotifyModal from './NotifyModal';
import styles from './styles.module.css';
import TeamMembersList from './TeamMembersList';
import UploadModalBody from './UploadModal';

// const dummyListData = [];
const dummyListData = [
	{
		month                 : 'March',
		year                  : 2023,
		feedbacks_given       : 36,
		below_avg_performance : 12,
		avg_performance       : 12,
		above_avg_performance : 12,
		details               : [],
		// details               : [{
		// 	user_name         : 'Hermione Granger',
		// 	employee_id       : 'COGO5666',
		// 	team_size         : 1,
		// 	feedbacks_pending : 20,
		// 	latest_kpi        : 4,
		// 	score             : 16,
		// },
		// {
		// 	user_name         : 'Neville Longbottom',
		// 	employee_id       : 'COGO5116',
		// 	team_size         : 1,
		// 	feedbacks_pending : 21,
		// 	latest_kpi        : 3,
		// 	score             : 12,
		// },
		// {
		// 	user_name         : 'Ron Weasley',
		// 	employee_id       : 'COGO5016',
		// 	team_size         : 1,
		// 	feedbacks_pending : 21,
		// 	latest_kpi        : 3,
		// 	score             : 16,
		// }],
	},
	{
		month                 : 'February',
		year                  : 2023,
		feedbacks_given       : 36,
		below_avg_performance : 12,
		avg_performance       : 12,
		above_avg_performance : 12,
		details               : [{
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
		month                 : 'January',
		year                  : 2023,
		feedbacks_given       : 36,
		below_avg_performance : 12,
		avg_performance       : 12,
		above_avg_performance : 12,
		details               : [{
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
	{
		month                 : 'December',
		year                  : 2022,
		feedbacks_given       : 36,
		below_avg_performance : 12,
		avg_performance       : 12,
		above_avg_performance : 12,
		details               : [{
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
];

function ManagerDashboard() {
	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [notifyModal, setNotifyModal] = useState(false);

	const [selectedBucket, setSelectedBucket] = useState('');

	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const feedbackColumns = useGetColumns({ source: 'manager_dashboard' });

	const monthControls = getMonthControls();
	const filterControls = getUserFilterControls();

	const { watch: watchDateFilter, control } = useForm();

	const monthFilter = watchDateFilter('created_at_month');
	const yearFilter = watchDateFilter('created_at_year');

	const { params, setParams, data, loading, setPage } = useListUserFeedbacks({
		searchValue: query,
	});

	const { list: newTeamList, page_limit, total_count } = data || {};

	const Router = useRouter();
	const redirectToFeedbackManagement = () => {
		Router.push('/feedback-system/manager-dashboard/feedback-management');
	};

	useEffect(() => setParams((pv) => ({
		...pv,
		filters: {
			...(pv.filters || {}),
			created_at_month : monthFilter || undefined,
			created_at_year  : yearFilter || undefined,
		},
	})), [monthFilter, yearFilter]);

	useEffect(() => debounceQuery(searchValue), [searchValue]);

	return (
		<div className={styles.container}>
			<div className={styles.top_most_container}>
				<h1>
					Manager Dashboard
				</h1>
			</div>

			<div className={styles.top_container}>
				<div className={styles.filters}>
					<div className={styles.month_container}>
						<SelectController {...monthControls.created_at_month} control={control} />
					</div>

					<div className={styles.month_container}>
						<SelectController {...monthControls.created_at_year} control={control} />
					</div>

					<div><Filters controls={filterControls} params={params} setParams={setParams} /></div>

					<div style={{ marginRight: '16px' }}>
						<Input
							size="md"
							value={searchValue}
							onChange={setSearchValue}
							placeholder="Search User.."
							suffix={<IcMSearchlight />}
							type="text"
							style={{ padding: '10px' }}
						/>
					</div>
				</div>

				<Button
					size="lg"
					themeType="accent"
					onClick={() => redirectToFeedbackManagement()}
				>
					Submit Feedback
				</Button>

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
						Feedback List
					</p>
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

export default ManagerDashboard;
