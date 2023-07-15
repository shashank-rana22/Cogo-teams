import { Button, Modal, Textarea, Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateShipmentDocuments from '../../../../../../../hooks/useUpdateShipmentDocuments';

import styles from './styles.module.css';

const REGEX = /:finalUrl=>"([^"]*)"/;
const GET_FINAL_URL = 1;

function ReviewModal({
	setOpen = () => {},
	open = false, task = {}, item = {}, uploadedDocsRefetch = () => {},
}) {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const [remarkValue, setRemarkValue] = useState('');

	const getfileUrl = (url) => {
		if (url?.includes('finalUrl')) {
			const match = url.match(REGEX);
			return match[GET_FINAL_URL];
		}

		return url;
	};

	const afterCreateRefetch = () => {
		setOpen(false);
		uploadedDocsRefetch();
	};

	const { updateDocument, taskUpdateLoading } = useUpdateShipmentDocuments({ refetch: afterCreateRefetch });

	const onSubmit = async (value) => {
		if (['document_amendment_requested'].includes(value) && isEmpty(remarkValue)) {
			Toast.error('Remarks are required!');
			return;
		}

		const updateData = {
			id                   : item?.id,
			state                : value,
			remarks              : remarkValue ? [remarkValue] : undefined,
			performed_by_org_id  : task?.organization_id,
			performed_by_user_id : userId,
		};

		await updateDocument(updateData);
	};

	return (
		<Modal
			size="xl"
			show={open}
			onClose={() => setOpen(false)}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Review" />

			<Modal.Body>
				<div className={styles.file_view}>
					<object
						title="review_file"
						data={getfileUrl(item?.document_url)}
						width="100%"
						type="application/pdf"
					/>
				</div>

				<div className={styles.remark}>
					<div className={styles.sub_heading}>
						Remarks
						{' '}
						<sup>*</sup>
					</div>

					<Textarea
						value={remarkValue}
						onChange={(e) => setRemarkValue(e)}
						placeholder="Enter Remark Here"
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					style={{ padding: '6px 12px', marginRight: '16px' }}
					onClick={() => onSubmit('document_amendment_requested')}
					disabled={taskUpdateLoading}
				>
					Reject
				</Button>

				<Button
					style={{ color: '#fff', backgroundColor: '#000', padding: '6px 12px', marginRight: '16px' }}
					onClick={() => onSubmit('document_accepted')}
					disabled={taskUpdateLoading}
				>
					Accept
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ReviewModal;
