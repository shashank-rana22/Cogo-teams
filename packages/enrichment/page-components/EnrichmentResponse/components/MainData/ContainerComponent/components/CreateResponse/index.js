import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import FormLayout from '../../../../../../../common/FormLayout/FormLayout';
import useCreateResponse from '../../../../../hooks/useCreateResponse';

import styles from './styles.module.css';

function CreateResponse({
	showForm = false,
	setShowForm = () => {},
	refetchResponses = () => {},
	activeTab = '',
}) {
	const {
		loading,
		controls,
		errors,
		control,
		handleSubmit,
		onSubmit,
		onClose,
	} = useCreateResponse({ setShowForm, refetchResponses, activeTab });

	return (

		<Modal
			size="md"
			show={showForm}
			placement="center"
			onClose={onClose}
		>

			<Modal.Header title={`${startCase(activeTab)} Details`} />

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
						onClick={onClose}
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

export default CreateResponse;
