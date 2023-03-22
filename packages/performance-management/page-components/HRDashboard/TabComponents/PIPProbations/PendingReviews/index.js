import { Textarea, Modal } from '@cogoport/components';
import { useState } from 'react';

import useGetColumns from '../../../../../common/Columns';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';
import useListEmployees from '../../../../../hooks/useListEmployees';

import styles from './styles.module.css';

function PendingReviews({
	activeTab,
	setItem = () => {}, setOpenLogModal = () => {},
	setType = () => {},
}) {
	const [reviewModal, setReviewModal] = useState(false);
	const dataList = {
		1: [{
			name         : 'apple',
			id           : '1',
			designation  : 'fruit',
			manager_name : 'apple_tree',
			rating       : 3,
			update       : 'probation created',
		},
		{
			name            : 'mango',
			id              : '2',
			designation     : 'fruit',
			manager_name    : 'mango_tree',
			employee_status : 'employed',
			rating          : 3,
			update          : 'cleared',
		}],
		2: [{
			name            : 'lemon',
			id              : '3',
			designation     : 'fruit',
			manager_name    : 'lemon_tree',
			employee_status : 'probation',
			rating          : 3,
			update          : 'pip extended',
		},
		{
			name            : 'carrot',
			id              : '5',
			designation     : 'vegetable',
			manager_name    : 'carrot_plant',
			employee_status : 'probation',
			rating          : 3,
			update          : 'exited',
		}],
	};

	const {
		employeeData,
		loading,
		// params,
		// setParams,
		setPage,
	} = useListEmployees();
	const { list = [], pagination_data = {} } = employeeData;
	const { page_limit, page, total_count } = pagination_data;

	const columnsToShow = feedbackDataColumns.pendingReviewsList;
	const columns = useGetColumns({
		columnsToShow,
		setItem,
		source: 'hr_dashboard',
		activeTab,
		setType,
		setOpenLogModal,
		setReviewModal,
	});

	return (
		<div className={styles.container}>
			<UserTableData
				loading={loading}
				columns={columns}
				list={list}
				pagination={page}
				page_limit={page_limit}
				setPagination={setPage}
				total_count={total_count}
			/>
			{reviewModal
				&& (
					<Modal
						show={reviewModal}
						onClose={() => {
							setReviewModal(false);
							setItem({});
						}}
						size="lg"
					>
						<Modal.Header title="Review" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								<div className={styles.modal_container}>
									<div className={styles.heading}>
										{dataList[1][1].name}
										{' '}
										{dataList[1][1].designation}
										-
										{dataList[1][1].id}
									</div>
									<div style={{ display: 'flex' }}>
										<div className={styles.sub_container}>
											<div className={styles.sub_heading}>Reports To</div>
											<div>{dataList[1][1].manager_name}</div>
										</div>
										<div className={styles.sub_container}>
											<div className={styles.sub_heading}>Latest KPI</div>
											<div>{dataList[1][1].rating}</div>
										</div>
										<div className={styles.sub_container}>
											<div className={styles.sub_heading}>Update</div>
											<div>{dataList[1][1].update}</div>
										</div>
									</div>
									<div className={styles.sub_container}>
										<div className={styles.label}>Add Remarks</div>
										<Textarea placeholder="Type here" />
									</div>
								</div>
							</Modal.Body>
						</div>
						<Modal.Footer />
					</Modal>
				)}
		</div>
	);
}

export default PendingReviews;
