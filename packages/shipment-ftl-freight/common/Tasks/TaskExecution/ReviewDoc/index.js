import { Loader, Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useListDocuments from '../../../../hooks/useListDocuments';
import useUpdateDocuments from '../../../../hooks/useUpdateDocuments';

import styles from './styles.module.css';

const FIRST_INDEX = 1;
const ZERO_INDEX = 0;

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
		docData = list.list[ZERO_INDEX] || {};
		params = {
			id                  : docData.id,
			pending_task_id     : task.id,
			document_type       : docData.document_type,
			performed_by_org_id : task.organization_id,
		};
	}
	const { updateDocument } = useUpdateDocuments(
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
			<div className={styles.loader}>
				<Loader />
				Loading Document...
			</div>
		);
	}

	const getfileUrl = (url) => {
		if (url?.includes('finalUrl')) {
			const REGEX = /:finalUrl=>"([^"]*)"/;
			const match = url.match(REGEX);

			return match?.[FIRST_INDEX];
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
