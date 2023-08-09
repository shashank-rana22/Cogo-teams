import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useUpdateConfiguration from '../../../../hooks/useUpdateConfiguration';
import controls from '../AddZone/controls';

import styles from './styles.module.css';

function EditZoneModal({
	editZone = true,
	setEditZone = () => {},
	listAPI = () => {},
}) {
	const {
		control,
		watch,
		formState:{ errors = {} },
		handleSubmit,
	} = useForm();

	const formValues = watch(); // Here we have to prefill the values
	console.log('formValueees', formValues);
	const {
		loading = false,
		onSubmit = () => {},
	} = useUpdateConfiguration({ formValues, listAPI, setEditZone });
	return (
		<Modal
			show={editZone}
			className={styles.modal_styled}
			placement="center"
			onClose={() => setEditZone(false)}
			closeOnOuterClick
		>
			<Modal.Header title="Edit Zone" />
			<Modal.Body>
				<Layout
					fields={controls}
					control={control}
					errors={errors}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className={styles.cancel_button}
					onClick={() => setEditZone(false)}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Apply
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditZoneModal;
