import { Button, Modal } from '@cogoport/components';
import { SelectController, useForm, AsyncSelectController, InputController } from '@cogoport/forms';
import { useState } from 'react';

import BL_OPTIONS from '../../../../configs/BL_CATEGORY.json';
import HBL_SOURCE from '../../../../configs/HBL_SOURCE.json';

import styles from './styles.module.css';

function AddStationary() {
	const [show, setShow] = useState(false);

	const { control, reset, watch } = useForm({
		defaultValues: {
			bl_category : 'house_bill_of_lading',
			source      : 'bluetide',
		},
	});

	const watchBlCategory = watch('bl_category');

	const onClose = () => {
		setShow(false);
		reset();
	};

	const organizationParams = {
		filters    : { status: 'active', account_type: 'service_provider' },
		page_limit : 10,
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
								name="bl_category"
								control={control}
								options={BL_OPTIONS.bl_category}
							/>
						</div>

						{watchBlCategory === 'bill_of_lading' ? (
							<div className={styles.width_49}>
								<label>Organization</label>
								<AsyncSelectController
									size="sm"
									name="organization_id"
									control={control}
									asyncKey="organizations"
									params={organizationParams}
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
						<Button>Confirm</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddStationary;
