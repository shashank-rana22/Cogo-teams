import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useRevertPrice from '../../../../../hooks/useRevertPrice';

import Form from './Form';
import styles from './styles.module.css';

function RevertModal({ modalState, setModalState }) {
	const { data } = modalState || {};

	const {
		control,
		handleSubmit,
		formState:{ errors = {} },
	} = useForm();

	const {
		loading,
		handleRevertPrice,
	} = useRevertPrice({ item: data, setModalState });

	return (
		<Modal
			show
			size="lg"
			placement="center"
			onClose={() => setModalState({ isOpen: false, data: {} })}
		>
			<Modal.Header title="ADD PRICE" />
			<Modal.Body>
				<Form item={data} control={control} errors={errors} />
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_container}>
					<Button size="md" themeType="accent">Cancel</Button>
					<Button
						className={styles.button_spacing}
						loading={loading}
						onClick={handleSubmit(handleRevertPrice)}
					>
						Submit

					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default RevertModal;
