import { Button, Modal } from '@cogoport/components';
import { InputController, SelectController, useForm } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const ZERO = 0;

const data = [
	{
		label : 'Bonus',
		value : 'Bonus',
	},
	{
		label : 'Loan',
		value : 'Loan',
	}, {
		label : 'Gift',
		value : 'Gift',
	},
];

function FinanceUpdateModal({
	showModal = false,
	setShowModal = () => {},
	setUpdateData = () => {},

}) {
	const { control, formState:{ errors }, handleSubmit, reset } = useForm();
	const onSubmit = (values) => {
		console.log('modal submit add new particular', values);
		setUpdateData((prev) => [...prev,
			{
				particular         : values.particular,
				category           : values.category,
				recoverable_amount : parseInt(values.recoverableAmount, 10),
			}]);
		setShowModal(false);
		reset();
	};

	return (
		<div>
			<Modal size="md" show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Body>
					<div className={styles.modal_message_container}>
						<div className={styles.modal_message_text}>
							Update FNF Status
						</div>
						<div className={styles.particular_input_cont}>
							<section>
								<div className={styles.modal_header}>
									Particular
								</div>
								<InputController
									control={control}
									placeholder="Type Particular here"
									className={styles.name_input}
									name="particular"
									size="md"
									type="text"
									rules={{ required: '*required' }}
								/>
								{errors?.particular ? (
									<div className={styles.errors}>*required</div>
								) : null}
							</section>

							<section>
								<div className={styles.modal_header}>
									Category
								</div>
								<SelectController
									control={control}
									placeholder="Select Category"
									className={styles.name_input}
									name="category"
									size="md"
									type="number"
									options={data}
									rules={{ required: '*required' }}
								/>
								{errors?.category ? (
									<div className={styles.errors}>*required</div>
								) : null}
							</section>

							<section>
								<div className={styles.modal_header}>
									Recoverable Amount
								</div>
								<InputController
									control={control}
									placeholder="Type Amount here"
									className={styles.name_input}
									name="recoverableAmount"
									size="md"
									type="number"
									value={ZERO}
									rules={{
										required : 'Value must be Greater than 0',
										validate : (value) => (parseInt(value, 10) >= ZERO
											? true : 'Number must be whole'),
									}}
								/>
								{errors?.recoverableAmount ? (
									<div className={styles.errors}>*Value must be Greater than 0</div>
								) : null}
							</section>
						</div>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						themeType="secondary"
						className={styles.cancel_modal_btn}
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>

					<Button
						size="md"
						themeType="primary"
						className={styles.proceed_modal_btn}
						onClick={handleSubmit(onSubmit)}
					>
						Yes, Proceed
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default FinanceUpdateModal;
