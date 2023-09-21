import { Modal, Button } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { useState } from 'react';

import { parametersForm } from '../../../../../configurations/parametersForm';
import Details from '../../Details';

import styles from './styles.module.css';

function ParametersForm({ openForm = false, setOpenForm = () => {}, refetch = () => {} }) {
	const [openTable, setOpentable] = useState(false);
	const [deskValue, setDeskValue] = useState({});
	const {
		service = '', tradeType = '', importIncoTerms = '',
		exportIncoterms = '', containerType = '',
	} = parametersForm;

	const { handleSubmit, control, watch, formState:{ errors } } = useForm();
	const serviceType = watch('service_type');
	const tradeTypeValue = watch('trade_type');
	const incoTerms = watch('inco_term');

	const onSubmit = (data) => {
		setDeskValue(data);
		setOpentable(!openTable);
	};

	return (
		<Modal
			size="md"
			show={openForm}
			onClose={() => setOpenForm(!openForm)}
			placement="top"
		>
			<Modal.Header title="Automation Desk" />
			{!openTable
			&& (
				<form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<div className={styles.content}>
							<div>
								<div className={styles.label}>Select Service Type *</div>
								<SelectController
									control={control}
									{...service}
									style={{ width: '250px' }}
								/>
								<div className={styles.errors}>{errors?.service_type?.message}</div>
							</div>

							{serviceType && (
								<div>
									<div className={styles.label}>Select Trade Type *</div>
									<SelectController
										control={control}
										{...tradeType}
										style={{ width: '250px' }}
									/>
									<div className={styles.errors}>{errors?.trade_type?.message}</div>
								</div>
							)}

							{tradeTypeValue && (
								<div>
									<div className={styles.label}>Select IncoTerms Type *</div>
									<SelectController
										control={control}
										{...tradeTypeValue === 'import'
											? { ...importIncoTerms } : { ...exportIncoterms }}
										style={{ width: '250px' }}
									/>
									<div className={styles.errors}>
										{errors?.inco_term?.message}
									</div>
								</div>
							)}
							{incoTerms && (
								<div>
									<div className={styles.label}>Select Container Type</div>
									<SelectController
										control={control}
										{...containerType}
										style={{ width: '250px' }}
									/>
									<div className={styles.errors}>{errors?.containerType?.message}</div>
								</div>
							)}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button type="submit">Submit</Button>
					</Modal.Footer>
				</form>
			)}

			{openTable
			&& (
				<Details
					deskValue={deskValue}
					addWeightage
					setOpenForm={setOpenForm}
					openForm={openForm}
					maxHeight="300px"
					margin="0 5px 10px"
					refetch={refetch}
				/>
			)}

		</Modal>
	);
}

export default ParametersForm;
