import { Button, Modal } from '@cogoport/components';

import FormLayout from '../../../../../../../common/FormLayout/FormLayout';

import useAddPocDetails from './hooks/useAddPocDetails';
import styles from './styles.module.css';

function ShowPocForm({
	showForm = '',
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
	} = useAddPocDetails({ setShowForm, refetchResponses });

	return (

		<Modal
			size="lg"
			show={showForm}
			onClose={() => setShowForm('')}
			placement="center"
		>
			<Modal.Header title="POC Details" />

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
						Save
					</Button>
				</div>
			</Modal.Footer>
		</Modal>

	);
}

export default ShowPocForm;
