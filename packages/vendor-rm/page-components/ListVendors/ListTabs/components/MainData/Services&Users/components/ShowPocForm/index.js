import { Button, Modal } from '@cogoport/components';

import FormLayout from '../../../../../../../../commons/components/FormLayout/FormLayout';

import useAddServicePoc from './hooks/useAddServicePoc';
import styles from './styles.module.css';

function ShowPocForm({
	showForm,
	setShowForm = () => {},
	getVendorData,
	refetchServicesPocs = () => {},
}) {
	const {
		loading,
		updatedControls,
		errors,
		control,
		handleSubmit,
		onSubmit,
	} = useAddServicePoc({ setShowForm, getVendorData, refetchServicesPocs });

	return (

		<Modal
			size="lg"
			show={showForm}
			onClose={() => setShowForm('')}
			placement="center"
		>
			<Modal.Header title="Add POC" />

			<Modal.Body>
				<FormLayout
					fields={updatedControls}
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
						onClick={() => setShowForm('')}
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
						Add POC
					</Button>
				</div>
			</Modal.Footer>
		</Modal>

	);
}

export default ShowPocForm;
