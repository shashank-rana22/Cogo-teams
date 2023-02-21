import { Modal, Button } from '@cogoport/components';
import { IcMNotifications, IcMUpload } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Filters from '../../common/Filters';
import PerformanceChart from '../../common/PerformanceChart';
import useListManagers from '../../hooks/useListManagers';

import NotifyModal from './NotifyModal';
import styles from './styles.module.css';
import TeamMembersList from './TeamMembersList';
import UploadModalBody from './UploadModal';

function HRDashboard() {
	const Router = useRouter();

	const routeToFeedbackForms = () => {
		Router.push('/feedback-system/hr-dashboard/feedback-forms');
	};

	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [notifyModal, setNotifyModal] = useState(false);

	const { params, setParams, feedbackData, loading, setPage } = useListManagers({});

	const { list = [], pagination_data = {} } = feedbackData || {};

	const { total_count = '' } = pagination_data;

	const redirectToFeedbackManagement = () => {
		Router.push('/feedback-system/hr-dashboard/feedback-management');
	};

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
					<Filters setParams={setParams} params={params} />
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
