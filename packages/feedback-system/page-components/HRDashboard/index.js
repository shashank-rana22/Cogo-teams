import { Modal, Select, Button } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { IcMNotifications, IcMUpload } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import PerformanceChart from '../../common/PerformanceChart';
import TeamStats from '../../common/TeamStats';
import useListManagers from '../../hooks/useListManagers';
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

function HRDashboard() {
	const Router = useRouter();

	const routeToFeedbackForms = () => {
		Router.push('/feedback-system/hr-dashboard/feedback-forms');
	};

	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [notifyModal, setNotifyModal] = useState(false);

	const { params, setParams, feedbackData, loading, setPage } = useListManagers({});

	const monthControls = getMonthControls(params.filters.created_at_year);

	const { watch, control: managerControl = {} } = useForm();
	const manager = watch('manager_id');

	const { list = [], pagination_data = {} } = feedbackData || {};

	const { total_count = '' } = pagination_data;

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
						list={list}
						loading={false}
						page_limit={params.page_limit}
						total_count={total_count}
						pagination={params.page}
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
