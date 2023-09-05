import { Modal, Button } from '@cogoport/components';
import { SelectController, useForm, MultiselectController } from '@cogoport/forms';

import { parametersForm } from '../../../../../configurations/parametersForm';

import styles from './styles.module.css';

function ParametersForm({ openForm = false, setOpenForm = () => {}, apiTrigger = () => {} }) {
	const { service, tradeType, importIncoTerms, exportIncoterms, containerType } = parametersForm;

	const { handleSubmit, control, watch, formState:{ errors } } = useForm();
	const tradeTypeValue = watch('trade_type');

	const onSubmit = (data) => {
		apiTrigger(data);
		setOpenForm(!openForm);
	};

	return (
		<Modal size="md" show={openForm} onClose={() => setOpenForm(!openForm)} placement="top">
			<Modal.Header title="Automation Desk" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<div className={styles.content}>
						<div>
							<div className={styles.label}>Select Service Type</div>
							<SelectController
								control={control}
								{...service}
								style={{ width: '250px' }}
							/>
							<div className={styles.errors}>{errors?.service_type?.message}</div>
						</div>

						<div>
							<div className={styles.label}>Select Container Type</div>
							<SelectController
								control={control}
								{...containerType}
								style={{ width: '250px' }}
							/>
							<div className={styles.errors}>{errors?.containerType?.message}</div>
						</div>
					</div>
					<div className={styles.content}>
						<div>
							<div className={styles.label}>Select Trade Type</div>
							<SelectController
								control={control}
								{...tradeType}
								style={{ width: '250px' }}
							/>
						</div>
						{tradeTypeValue && (
							<div>
								<div className={styles.label}>Select IncoTerms Type</div>
								<MultiselectController
									control={control}
									{...tradeTypeValue === 'import' ? { ...importIncoTerms } : { ...exportIncoterms }}
									style={{ width: '250px' }}
								/>
								<div className={styles.errors}>
									{tradeTypeValue === 'import' ? errors?.import_inco_terms?.message
										: errors?.export_inco_terms?.message}
								</div>
							</div>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button type="submit">Submit</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default ParametersForm;
