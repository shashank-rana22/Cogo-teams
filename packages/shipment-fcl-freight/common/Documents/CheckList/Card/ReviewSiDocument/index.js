import { Button, Modal } from '@cogoport/components';
import { TextAreaController, handleError, useForm } from '@cogoport/forms';

import useUpdateShipmentDocuments from '../../../../../hooks/useUpdateShipmentDocuments';

import styles from './styles.module.css';

const MIN_CONTENT_LENGTH = 20;

function ReviewSiDocument({
	siReviewState = false,
	setSiReviewState = () => {},
	uploadedItem = {},
	shipmentDocumentRefetch = () => {},
}) {
	const { control, handleSubmit, formState : { errors } } = useForm();

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

	const minContentLength = (value) => value.length >= MIN_CONTENT_LENGTH
        || 'Remark must be at least 20 characters long';

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
						rows={6}
						rules={{ validate: minContentLength }}
					/>
					{ errors?.remark ? (
						<div className={styles.error}>
							{handleError({ error: errors?.remark })}
						</div>
					) : null}
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
