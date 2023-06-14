import { Loader, Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useListDocuments from '../../../../hooks/useListDocuments';
import useUpdateShipmentDocuments from '../../../../hooks/useUpdateShipmentDocuments';

import styles from './styles.module.css';

function ReviewDoc({
	task = {},
	refetch = () => {},
	onClose = () => {},
}) {
	const [approvalState, setApprovalState] = useState(null);
	const [remarkValue, setRemarkValue] = useState('');
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
		docData = list.list[0] || {};
		params = {
			id                  : docData.id,
			pending_task_id     : task.id,
			document_type       : docData.document_type,
			performed_by_org_id : task.organization_id,
		};
	}
	const { updateDocument } = useUpdateShipmentDocuments(
		{ refetch: newRefetch },
	);

	const handleApprove = async () => {
		params = {
			...params,
			state: 'document_accepted',
		};

		await updateDocument(params);
	};

	const handleAmmend = () => {
		setApprovalState({ ammend: true });
	};

	const handleSubmit = async () => {
		if (approvalState?.ammend) {
			if (!remarkValue) {
				Toast.error('Please provide amendment reason');
			}
			params = {
				...params,
				state   : 'document_amendment_requested',
				remarks : [remarkValue],
			};
			await updateDocument(params);
		} else {
			params = {
				...params,
				state: 'document_accepted',
			};
			await updateDocument(params);
		}
	};

	if (loading) {
		return (
			<div>
				<Loader />
				Loading Document...
			</div>
		);
	}

	const getfileUrl = (url) => {
		if (url?.includes('finalUrl')) {
			const regex = /:finalUrl=>"([^"]*)"/;
			const match = url.match(regex);

			return match[1];
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

			{!approvalState ? (
				<div className={styles.file_view}>
					<object
						title="review_file"
						data={getfileUrl(docData?.document_url)}
						width="100%"
						type="application/pdf"
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
						themeType="secondary"
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
						themeType="secondary"
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
