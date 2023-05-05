import { Button, Modal } from '@cogoport/components';
import { CheckboxGroupController, TextAreaController, useForm } from '@cogoport/forms';

import useUpdateShipmentBlDoDetails from '../../../../../hooks/useUpdateShipmentBlDoDetails';

import RestrictRequest from './RestrictRequest';
import styles from './styles.module.css';

function RequestModal({ closeModal = () => { }, data = {} }) {
	const { trade_type, bill_of_ladings, delivery_orders, is_request_doc_allowed } = data || {};

	const documentOptions = bill_of_ladings || delivery_orders;

	const blOptions = (documentOptions || []).filter(
		(item) => !['surrender_pending', 'surrendered'].includes(item?.status),
	).map((item) => ({
		label : item?.bl_number || item?.do_number,
		value : item?.id,
	}));

	const { formState: { errors }, control, handleSubmit } = useForm();

	const { onUpdate, loading } = useUpdateShipmentBlDoDetails({ trade_type, onClose: closeModal });

	const onSubmit = (formData) => {
		const payload = {
			ids  : formData?.ids,
			data : {
				[trade_type === 'export' ? 'bl_remarks' : 'remarks']:
					{ comment: formData?.remarks, status: 'requested' },
				status: 'requested',
			},
		};
		onUpdate(payload);
	};

	return !is_request_doc_allowed ? (
		<Modal show onClose={closeModal} showCloseIcon={!loading} className={styles.request_modal}>
			<Modal.Header title="Request for Approval" />

			<Modal.Body>
				<div className={styles.form}>
					{blOptions.length === 0 ? (
						<div className={styles.no_data_warning}>
							No document has been uploaded!
						</div>
					) : null}

					<div className={styles.form_element}>
						<CheckboxGroupController
							name="ids"
							control={control}
							size="md"
							options={blOptions}
							className={styles.checkbox_controller}
							rules={{ required: 'This field is required' }}
						/>
						{errors.ids ? <div className={styles.error_message}>{errors.ids.message}</div> : null}
					</div>

					<div className={styles.form_element}>
						<TextAreaController
							name="remarks"
							control={control}
							size="md"
							rows={4}
							placeholder="Enter Remarks Here..."
							rules={{ required: 'This field is Required' }}
						/>
						{errors.remarks ? <div className={styles.error_message}>{errors.remarks.message}</div> : null}
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button disabled={loading} themeType="secondary" onClick={closeModal}>Cancel</Button>
				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>Request</Button>
			</Modal.Footer>
		</Modal>
	) : <RestrictRequest closeModal={closeModal} />;
}

export default RequestModal;
