import { Button, Toast, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListDocuments from '../../../../hooks/useListDocuments';
import useUpdateShipmentDocuments from '../../../../hooks/useUpdateShipmentDocuments';

import AmendModal from './AmendModal';
import ApprovalModal from './ApprovalModal';
import styles from './styles.module.css';

const GET_FINAL_URL = 1;

function ReviewDoc({
	task = {},
	refetch = () => {},
	onClose = () => {},
}) {
	const [isAmend, setIsAmend] = useState(false);
	const [remarkValue, setRemarkValue] = useState('');
	const [showModal, setShowModal] = useState({ display: false, type: '' });

	const newRefetch = () => {
		onClose();
		refetch();
	};

	const { list = {}, loading = true } = useListDocuments({
		defaultFilters: {
			shipment_id: task.shipment_id, id: task.task_field_id,
		},
		defaultParams: {
			performed_by_org_id: task.organization_id,
		},
	});

	let docData = {};
	let params = {};

	if (!loading && list.list?.length) {
		docData = list.list[GLOBAL_CONSTANTS.zeroth_index] || {};
		params = {
			id                  : docData.id,
			pending_task_id     : task.id,
			document_type       : docData.document_type,
			performed_by_org_id : task.organization_id,
		};
	}
	const { taskUpdateLoading, updateDocument } = useUpdateShipmentDocuments(
		{ refetch: newRefetch },
	);

	const handleFinalApprove = async () => {
		params = {
			...params,
			state: 'document_accepted',
		};

		await updateDocument(params);
	};

	const handleSubmit = () => {
		if (isEmpty(remarkValue)) {
			Toast.error('Please provide amendment reason');
		} else {
			setShowModal({ display: true, type: 'amend' });
		}
	};

	const handleFinalSubmit = async () => {
		if (!isEmpty(remarkValue)) {
			const amendParams = {
				...params,
				state   : 'document_amendment_requested',
				remarks : [remarkValue],
			};

			await updateDocument(amendParams);
		} else {
			Toast.error('Please provide amendment reason');
		}
	};

	if (loading) {
		return (
			<ThreeDotLoader message="Loading Document" />
		);
	}

	const getFileUrl = (url) => {
		if (url?.includes('finalUrl')) {
			const match = url.match(GLOBAL_CONSTANTS.regex_patterns.file_upload_url);
			return match[GET_FINAL_URL];
		}

		return url;
	};

	return (

		<div className={styles.container}>
			<div className={styles.display_details}>
				<div className={styles.sub_half_detail}>
					<div className={styles.row}>
						<div className={styles.sub_heading}>Document Type : </div>
						<div className={styles.sub_detail}>{startCase(docData.document_type)}</div>
					</div>
					<div className={styles.row}>
						<div className={styles.sub_heading}>Document State : </div>
						<div className={styles.sub_detail}>{startCase(docData.state)}</div>
					</div>
				</div>
				<div className={styles.sub_half_detail}>
					<div className={styles.row}>
						<div className={styles.sub_heading}>Uploaded At : </div>
						<div className={styles.sub_detail}>
							{formatDate({
								date       : docData.uploaded_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}

						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.sub_heading}>Uploaded By :</div>
						<div className={styles.sub_detail}>
							{startCase(docData.uploaded_by_org?.business_name)}
						</div>
					</div>
				</div>
			</div>

			{isAmend ? (
				<>
					<div className={styles.remark}>
						<div className={styles.sub_heading}>Please specify the reason for this </div>
						<Textarea
							className="remark_text"
							value={remarkValue}
							onChange={(e) => setRemarkValue(e)}
							placeholder="Type Remarks"
						/>
					</div>
					<div className={styles.action_buttons}>
						<Button
							onClick={onClose}
							themeType="secondary"
							disabled={loading}
						>
							Cancel
						</Button>
						<Button onClick={handleSubmit}>
							Submit
						</Button>
					</div>
				</>
			) : (
				<>
					<div className={styles.file_view}>
						<object
							title="review_file"
							data={getFileUrl(docData?.document_url)}
							width="100%"
							type="application/pdf"
						/>
					</div>

					<div className={styles.action_buttons}>
						<Button
							onClick={() => setIsAmend(true)}
							themeType="secondary"
							disabled={loading}
						>
							Amend
						</Button>

						<Button onClick={() => setShowModal({ display: true, type: 'approve' })}>
							Approve
						</Button>
					</div>
				</>

			)}

			{(showModal.display && showModal.type === 'approve') ? (
				<ApprovalModal
					showModal={showModal}
					setShowModal={setShowModal}
					task={task}
					handleFinalApprove={handleFinalApprove}
					taskUpdateLoading={taskUpdateLoading}
				/>
			) : (
				<AmendModal
					showModal={showModal}
					setShowModal={setShowModal}
					handleFinalSubmit={handleFinalSubmit}
					remarkValue={remarkValue}
					document_type={docData?.document_type}
					taskUpdateLoading={taskUpdateLoading}
				/>
			) }
		</div>

	);
}

export default ReviewDoc;
