import { Button, Modal } from '@cogoport/components';
import { TextAreaController, useForm } from '@cogoport/forms';

import useUpdateShipmentDocuments from '../../../../../hooks/useUpdateShipmentDocuments';

import styles from './styles.module.css';

function ReviewSiDocument({
	siReviewState,
	setSiReviewState = () => {},
	uploadedItem = {},
	shipmentDocumentRefetch = () => {},
}) {
	const { control, handleSubmit } = useForm();

	const { updateDocument, loading } = useUpdateShipmentDocuments({
		refetch: () => {
			setSiReviewState(false);
			shipmentDocumentRefetch();
		},
		successMessage: 'Request Submitted Successfully',
	});

	const onUpdate = ({ remark }) => {
		const payload = {
			id                  : uploadedItem?.id,
			performed_by_org_id : uploadedItem?.uploaded_by_org_id,
			remarks             : [remark],
			state               : 'document_rejected',
		};

		updateDocument(payload);
	};

	return (
		<Modal
			show={siReviewState}
			onClose={() => setSiReviewState(false)}
		>
			<Modal.Header title="REJECT SI DOCUMENT" />

			<Modal.Body>
				<div className={styles.remark_container}>
					<h4>Please specify the reason for Document Rejection</h4>
					<TextAreaController
						name="remark"
						placeholder="Type here..."
						control={control}
						style={{ height: '100px' }}
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>

				<Button disabled={loading} onClick={handleSubmit(onUpdate)}>
					{loading ? 'Submiting...' : 'Submit'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default ReviewSiDocument;
