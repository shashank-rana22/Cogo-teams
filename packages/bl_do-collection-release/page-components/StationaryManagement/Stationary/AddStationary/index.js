import { Button, Modal } from '@cogoport/components';
import { SelectController, useForm, AsyncSelectController, InputController } from '@cogoport/forms';
import { useState } from 'react';

import BL_OPTIONS from '../../../../configs/BL_CATEGORY.json';
import HBL_SOURCE from '../../../../configs/HBL_SOURCE.json';
import useCreateOrganizationDocumentInventory from '../../../../hooks/useCreateOrganizationDocumentInventory';

import styles from './styles.module.css';

const ORG_PARAMS = {
	filters    : { status: 'active', account_type: 'service_provider' },
	page_limit : 10,
};

function AddStationary({ listOrgDocTrigger = () => {} }) {
	const [show, setShow] = useState(false);

	const { control, reset, watch, handleSubmit } = useForm({
		defaultValues: {
			document_type : 'house_bill_of_lading',
			source        : 'bluetide',
		},
	});

	const watchDocType = watch('document_type');

	const onClose = () => {
		setShow(false);
		reset();
	};

	const createRefetch = () => {
		listOrgDocTrigger();
		onClose();
	};

	const { apiTrigger } = useCreateOrganizationDocumentInventory({ refetch: createRefetch });

	const onSubmit = (val) => {
		const payload = {
			document_type   : val?.document_type,
			bl_count        : val?.bl_count,
			range           : [val?.serial_no_start, val?.serial_no_end],
			organization_id : val?.document_type === 'bill_of_lading' ? val?.organization_id : undefined,
			source          : val?.document_type === 'house_bill_of_lading' ? val?.source : undefined,
		};

		apiTrigger(payload);
	};

	return (
		<div>
			<Button themeType="secondary" onClick={() => setShow(true)}>Add Stationary</Button>

			<Modal closeOnOuterClick={false} show={show} onClose={onClose} placement="top">
				<Modal.Header title="Add Stationary" />

				<Modal.Body>
					<div className={styles.container}>
						<div className={styles.width_49}>
							<label>BL Category</label>
							<SelectController
								size="sm"
								name="document_type"
								control={control}
								options={BL_OPTIONS.bl_category}
							/>
						</div>

						{watchDocType === 'bill_of_lading' ? (
							<div className={styles.width_49}>
								<label>Organization</label>
								<AsyncSelectController
									size="sm"
									name="organization_id"
									control={control}
									asyncKey="organizations"
									params={ORG_PARAMS}
								/>
							</div>
						)
							:						(
								<div className={styles.width_49}>
									<label>Source</label>
									<SelectController
										size="sm"
										name="source"
										control={control}
										options={HBL_SOURCE.hbl_source}
									/>
								</div>
							)}

						<div className={styles.width_32}>
							<label>BL Count</label>
							<InputController
								size="sm"
								name="bl_count"
								type="number"
								control={control}
								placeholder="Enter BL count"
							/>
						</div>

						<div className={styles.width_32}>
							<label>Serial No. Start</label>
							<InputController
								size="sm"
								name="serial_no_start"
								control={control}
								placeholder="Enter Serial No Start"
							/>
						</div>

						<div className={styles.width_32}>
							<label>Serial No. End</label>
							<InputController
								name="serial_no_end"
								size="sm"
								control={control}
								placeholder="Enter Serial No End"
							/>
						</div>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.button_wrapper}>
						<Button themeType="secondary" onClick={onClose}>Cancel</Button>
						<Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddStationary;
