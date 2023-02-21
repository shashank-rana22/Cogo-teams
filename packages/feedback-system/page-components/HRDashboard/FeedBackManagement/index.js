import { Button, Upload, Placeholder } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { IcMArrowBack, IcMNotifications } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import EmptyState from '../../../common/EmptyState';
import UserTableData from '../../../common/userTableData';
import useGetManagerFeedbackProgress from '../../../hooks/useGetManagerFeedbackProgress';
import useListUserFeedbacks from '../../../hooks/useListUserFeedbacks';

import getControls from './manager-controls';
import ManagersListCard from './ManagersListCard';
import styles from './styles.module.css';
// import useUploadNormalCSV from './useUploadNormalCSV';

function FeedbackManagement() {
	const Router = useRouter();

	const { profile: { user : { id: userId = '' } } } = useSelector((state) => state);

	const [showUserId, setShowUserId] = useState('');

	// const { data = {}, loading = false, setParams } = useGetManagerFeedbackProgress();

	const { feedbackData = {}, loading = false, setParams } = useListUserFeedbacks({ userId });

	console.log('data', feedbackData);

	const columnsToShow = ['name', 'cogo_id', 'role', 'manager', 'feedback', 'rating', 'month'];
	const tableColumns = useGetColumns({ source: 'hr_feedback', columnsToShow });

	// const { fileValue, setFileValue, loading: uploadFileLoading = false } = useUploadNormalCSV();

	const { list = [] } = feedbackData;

	const formProps = useForm();

	const {
		control,
		watch,
	} = formProps;

	const manager = watch('manager_id');

	useEffect(() => {
		setParams((pv) => ({ ...pv, manager_id: manager || undefined }));
	}, [manager]);

	const handleClick = () => {
		Router.push('/feedback-system/hr-dashboard');
	};

	const showLoading = () => (
		<div style={{ margin: '16px' }}>
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.redirect_container}>
				<div
					className={styles.go_back_container}
					role="button"
					tabIndex={0}
					onClick={() => {
						handleClick();
					}}
				>
					<IcMArrowBack style={{ marginRight: '8px' }} width={16} height={16} />
					<p>Go Back</p>
				</div>
			</div>

			<div className={styles.list_header}>
				<div className={styles.heading}>
					<p className={styles.header_text}>
						All Managers List
					</p>
				</div>

				{/* <Upload value={fileValue} onChange={setFileValue} loading={uploadFileLoading} /> */}
				<SelectController {...getControls()} control={control} formProps={formProps} />
			</div>

			{loading && showLoading()}

			{feedbackData?.length === 0 && !loading && <EmptyState />}

			{!loading && (
				<div>
					{/* {(list || []).map((item) => (
						<ManagersListCard
							key={item?.manager_id}
							item={item}
							showUserId={showUserId}
							setShowUserId={setShowUserId}
						/>
					))} */}
					<UserTableData
						columns={tableColumns}
						list={list}
						loading={loading}
						// page_limit={page_limit}
						// total_count={total_count}
						// pagination={params.page}
						// setPagination={setPage}
					/>
				</div>
			)}
		</div>
	);
}

export default FeedbackManagement;
