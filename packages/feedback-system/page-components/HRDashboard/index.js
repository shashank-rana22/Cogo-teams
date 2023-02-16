import { Upload, Modal, Select, Input, Button } from '@cogoport/components';
import { SelectController, useDebounceQuery, useForm } from '@cogoport/forms';
import { IcMDownload, IcMNotifications, IcMSearchlight, IcMUpload } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetColumns from '../../common/Columns';
import PerformanceChart from '../../common/PerformanceChart';
import TeamStats from '../../common/TeamStats';
import UserTableData from '../../common/userTableData';
import useDownloadCsvFeedbacks from '../../hooks/useDownloadCsvFeedbacks';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import { deptControls as departmentControls } from '../../utils/departmentControls';
import { getControls } from '../../utils/filterControls';

import styles from './styles.module.css';
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
	}, [manager]);

	return (
		<div className={styles.container}>
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

				<div className={styles.question_button_container}>
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

					<Button size="lg" themeType="accent" onClick={() => routeToFeedbackForms()}>Forms</Button>
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
						<Button themeType="accent" size="md" style={{ marginRight: '8px' }}>
							<IcMNotifications style={{ marginRight: '4px' }} />
							Notify
						</Button>

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

				<div className={styles.table_section}>
					<UserTableData
						columns={columns}
						list={list}
						loading={loading}
						page_limit={page_limit}
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
			</div>
		</div>
	);
}

export default HRDashboard;
