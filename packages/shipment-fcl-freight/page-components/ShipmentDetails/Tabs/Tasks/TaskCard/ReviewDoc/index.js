import { Button, Toast } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useListDocuments from '../../../../../../hooks/useListDocuments';
import useUpdateShipmentDocuments from '../../../../../../hooks/useUpdateShipmentDocuments';

import styles from './styles.module.css';

function ReviewDoc({
	task = {},
	refetch = () => {},
	onClose = () => {},
}) {
	const [approvalState, setApprovalState] = useState(null);
	const [params, setParams] = useState({});
	const [remarkValue, setRemarkValue] = useState('');
	const newRefetch = () => {
		onClose();
		refetch();
	};

	const { list, loading } = useListDocuments({
		defaultFilters: {
			id                  : task.task_field_id,
			pending_task_id     : task.id,
			performed_by_org_id : task.organization_id,
		},
	});

	let doc_data = {};
	const defaultParams = {};
	if (!loading && list?.length) {
		doc_data = list?.[0] || {};
		setParams({
			id            : doc_data.id,
			document_type : doc_data.document_type,
		});
	}
	const { updateDocument } = useUpdateShipmentDocuments(
		{ defaultParams, refetch: newRefetch, params },
	);

	const handleApprove = async () => {
		setParams({
			...params,
			state: 'document_accepted',
		});

		updateDocument();
	};

	const handleAmmend = () => {
		setApprovalState({ ammend: true });
	};

	const handleSubmit = async () => {
		if (approvalState?.ammend) {
			if (!remarkValue) {
				Toast.error('Please provide amendment reason');
			}
			setParams({
				...params,
				state   : 'document_amendment_requested',
				remarks : [remarkValue],
			});
			updateDocument();
		} else {
			setParams({
				...params,
				state: 'document_accepted',
			});
			updateDocument();
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.display_details}>
				<div className={styles.sub_half_detail}>
					<div className={styles.row}>
						<div className={styles.sub_heading}>Document Type : </div>
						<div className={styles.sub_detail}>{startCase(doc_data.document_type)}</div>
					</div>
					<div className={styles.row}>
						<div className={styles.sub_heading}>Document State : </div>
						<div className={styles.sub_detail}>{startCase(doc_data.state)}</div>
					</div>
				</div>
				<div className={styles.sub_half_detail}>
					<div className={styles.row}>
						<div className={styles.sub_heading}>Uploaded At : </div>
						<div className={styles.sub_detail}>
							{/* {formatDate({
								date       : doc_data.Uploaded_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})} */}
							Sub details date
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.sub_heading}>Uploaded By :</div>
						<div className={styles.sub_detail}>
							{startCase(doc_data.uploaded_by_org?.business_name)}
						</div>
					</div>
				</div>
			</div>

			{!approvalState ? (
				<div className={styles.file_view}>
					<object
						title="review_file"
						data={doc_data.document_url}
						width="100%"
						type="application/pdf"
						// allowFullScreen
					/>
				</div>
			) : null}

			{approvalState?.ammend ? (
				<div className={styles.remark}>
					<div className={styles.sub_heading}>Please specify the reason for this </div>
					<textarea
						className="remark_text"
						value={remarkValue}
						onChange={(e) => setRemarkValue(e?.target?.value)}
						placeholder="Type Remarks"
					/>
				</div>
			) : null}

			{!approvalState ? (
				<div className={styles.action_buttons}>
					<Button
						onClick={handleAmmend}
						className="secondary md"
						disabled={loading}
					>
						Amend
					</Button>

					<Button onClick={handleApprove} disabled={loading}>
						Approve
					</Button>
				</div>
			) : (
				<div className={styles.action_buttons}>
					<Button
						onClick={() => {
							onClose();
						}}
						className="secondary md"
						disabled={loading}
					>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={loading}>
						Submit
					</Button>
				</div>
			)}
		</div>
	);
}
export default ReviewDoc;
