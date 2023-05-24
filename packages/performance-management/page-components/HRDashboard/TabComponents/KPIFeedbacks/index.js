import { Button } from '@cogoport/components';
import { IcMUpload, IcMNotifications } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import Filters from '../../../../common/Filters';
import PerformanceChart from '../../../../common/PerformanceChart';
import modalComoponentsMapping from '../../../../constants/modal-components-mapping';
import useListManagers from '../../../../hooks/useListManagers';
import TeamMembersList from '../../TeamMembersList';

import styles from './styles.module.css';

function KPIFeedbacks({ modal = '', setModal = () => {} }) {
	const router = useRouter();

	const { params, setParams, feedbackData, loading = false, setPage } = useListManagers({});

	const { list = [], pagination_data = {} } = feedbackData || {};

	const { total_count = '' } = pagination_data;

	const redirectToFeedbackManagement = () => {
		router.push('/performance-management/hr-dashboard/feedback-management');
	};

	const ModalComponent = modalComoponentsMapping[modal]?.Component;

	return (
		<>
			<div className={styles.top_container}>
				<div className={styles.filters}>
					<Filters
						setParams={setParams}
						params={params}
						source="hr_kpi_dashboard"
					/>
				</div>

				<div className={styles.button_container}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: '16px' }}
						onClick={() => setModal('manual_feedback')}
					>
						Manual Feedback
					</Button>
					<Button
						size="md"
						themeType="tertiary"
						style={{ marginRight: '16px' }}
						onClick={() => setModal('notify')}
					>
						<IcMNotifications style={{ marginRight: '4px' }} />
						Send Notification
					</Button>
					<Button
						size="md"
						themeType="tertiary"
						onClick={() => setModal('kpi_tab_upload')}
					>
						<IcMUpload style={{ marginRight: '4px' }} />
						Upload CSV
					</Button>
				</div>
			</div>

			<div className={styles.stats_container}>
				<PerformanceChart params={params} />
			</div>

			<div className={styles.list_header}>
				<p className={styles.list_title}>
					All Managers List
				</p>

				<div className={styles.list_actions}>
					<Button
						size="md"
						themeType="tertiary"
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
					loading={loading}
					params={params}
					total_count={total_count}
					setPagination={setPage}
				/>
			</div>

			{modal && (
				<ModalComponent
					modal={modal}
					setModal={setModal}
					source={modal}
				/>
			)}
		</>
	);
}

export default KPIFeedbacks;
