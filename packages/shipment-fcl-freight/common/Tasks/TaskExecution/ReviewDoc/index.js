import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useListDocuments from '../../../../hooks/useListDocuments';
import useUpdateShipmentDocuments from '../../../../hooks/useUpdateShipmentDocuments';

import AmmendDoc from './AmmendDoc';
import styles from './styles.module.css';

const GET_FINAL_URL = 1;

function ReviewDoc({
	task = {},
	refetch = () => {},
	onClose = () => {},
}) {
	const [isAmmend, setIsAmmend] = useState(false);

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

	if (loading) {
		return (
			<div>
				<ThreeDotLoader message="Loading Document" />
			</div>
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

			{isAmmend ? (
				<AmmendDoc
					task={task}
					onClose={onClose}
					newRefetch={newRefetch}
				/>
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
							onClick={() => { setIsAmmend(true); }}
							themeType="secondary"
							disabled={loading}
						>
							Amend
						</Button>

						<Button onClick={handleApprove} disabled={loading}>
							Approve
						</Button>
					</div>
				</>
			)}
		</div>
	);
}
export default ReviewDoc;
