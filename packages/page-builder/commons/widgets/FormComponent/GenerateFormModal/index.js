import { Modal, Button } from '@cogoport/components';
import dynamic from 'next/dynamic';

import FormLayout from '../../FormLayout';

import styles from './styles.module.css';

const DynamicFormEditor = dynamic(() => import('../FormEditor'), { ssr: false });

function GenerateFormModal({
	setShow,
	show,
	control,
	controls,
	errors,
	showElements,
	handleSubmit,
	formValues,
	onSubmit,
	showForm,
}) {
	const onClose = () => {
		setShow(false);
	};

	return (
		<Modal className={styles.modal_styles} size="xl" show={show} onClose={onClose} placement="center">
			<Modal.Header title="Customize Form" />
			<Modal.Body>
				<div className={styles.flex_item}>
					<div className={styles.left_panel}>
						<DynamicFormEditor formData={formValues} />
					</div>
					<div className={styles.right_panel}>
						{showForm && (
							<FormLayout
								controls={controls}
								control={control}
								errors={errors}
								showElements={showElements}
							/>
						)}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit(onSubmit)}>
					Add Form
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default GenerateFormModal;
