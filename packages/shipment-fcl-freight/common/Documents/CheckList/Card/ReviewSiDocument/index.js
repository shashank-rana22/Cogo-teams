import { Button, Modal } from '@cogoport/components';
import { RadioGroupController, TextAreaController, handleError, useForm } from '@cogoport/forms';

import useUpdateShipmentDocuments from '../../../../../hooks/useUpdateShipmentDocuments';

import styles from './styles.module.css';

const STATE_OPTIONS = [
	{
		label : 'Rejected',
		value : 'document_rejected',
	},
	{
		label : 'Accepted',
		value : 'document_accepted',
	},
];

function ReviewSiDocument({ siReviewState, setSiReviewState, uploadedItem, ShipmentDocumentRefetch = () => {} }) {
	const { control, handleSubmit, formState : { errors }, watch } = useForm({
		document_state: 'accepted',
	});

	const document_state = watch('document_state');

	const { updateDocument, loading } = useUpdateShipmentDocuments({
		refetch: () => {
			setSiReviewState(false);
			ShipmentDocumentRefetch();
		},
		successMessage: 'Request Submitted Successfully',
	});

	const onUpdate = ({ remark }) => {
		const payload = {
			id                  : uploadedItem?.id,
			performed_by_org_id : uploadedItem?.uploaded_by_org_id,
			remarks             : [remark],
			state               : document_state,
		};

		updateDocument(payload);
	};

	return (
		<Modal
			show={siReviewState}
			onClose={() => setSiReviewState(false)}
		>
			<Modal.Header title="REVIEW SI DOCUMENT" />

			<Modal.Body>
				<div>
					<div>
						<RadioGroupController
							options={STATE_OPTIONS}
							control={control}
							name="document_state"
							rules={{
								required:
									{
										value   : true,
										message : 'document state is required',
									},
							}}
						/>

						{errors?.document_state ? (
							<div className={styles.error_text}>
								{handleError({ error: errors?.document_state })}
							</div>
						) : null}
					</div>
					{document_state === 'document_rejected' ? (
						<>
							<h4>Please specify the reason for Document Rejection</h4>
							<TextAreaController
								name="remark"
								placeholder="Type here..."
								control={control}
								style={{ height: '100px' }}
							/>
						</>

					) : null }

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
