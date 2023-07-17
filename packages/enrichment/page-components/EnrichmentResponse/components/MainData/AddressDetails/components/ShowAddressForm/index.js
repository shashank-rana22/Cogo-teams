import { Button, Modal } from '@cogoport/components';

import FormLayout from '../../../../../../../common/FormLayout/FormLayout';

import useAddAddressDetails from './hooks/useAddAddressDetails';
import styles from './styles.module.css';

function ShowAddressForm({
	showForm = false,
	setShowForm = () => {},
	refetchResponses = () => {},
}) {
	const {
		loading,
		controls,
		errors,
		control,
		handleSubmit,
		onSubmit,
	} = useAddAddressDetails({ setShowForm, refetchResponses });

	return (

		<Modal
			size="md"
			show={showForm}
			onClose={() => setShowForm(false)}
			placement="center"
		>
			<Modal.Header title="Add Address Details" />

			<Modal.Body>
				<FormLayout
					fields={controls}
					errors={errors}
					control={control}
				/>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						size="md"
						type="button"
						themeType="tertiary"
						disabled={loading}
						style={{ marginRight: 12 }}
						onClick={() => setShowForm(false)}
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						themeType="primary"
						disabled={loading}
						onClick={handleSubmit(onSubmit)}
					>
						Save
					</Button>
				</div>
			</Modal.Footer>
		</Modal>

	);
}

export default ShowAddressForm;
