import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import FormLayout from '../../../../../../../common/FormLayout/FormLayout';
import useCreateResponse from '../../../../../hooks/useCreateResponse';

import styles from './styles.module.css';

function DetailsForm({
	detailsForm = {},
	setDetailsForm = () => {},
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
	} = useCreateResponse({ detailsForm, setDetailsForm, refetchResponses, activeTab });

	return (
		<>

			<Modal.Header title={`${startCase(activeTab)} Details`} />
			<form onSubmit={handleSubmit(onSubmit)}>
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
							onClick={() => setDetailsForm({})}
						>
							Cancel
						</Button>

						<Button
							size="md"
							type="submit"
							themeType="primary"
							disabled={loading}
						>
							Save
						</Button>
					</div>
				</Modal.Footer>

			</form>

		</>

	);
}

export default DetailsForm;
