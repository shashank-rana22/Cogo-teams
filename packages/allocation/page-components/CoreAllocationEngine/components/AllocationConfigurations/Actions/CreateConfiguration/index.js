import { Button, Modal } from '@cogoport/components';

import Form from '../../../../../../common/Form';
import useCreateConfigurations from '../../../../hooks/useCreateConfigurations';

import styles from './styles.module.css';

function CreateConfiguration({
	viewType = '',
	item = {},
	setShow,
	listRefetch,
}) {
	const {
		controls,
		onSubmit,
		loading = false,
		formProps,
	} = useCreateConfigurations({
		viewType,
		item,
		setShow,
		listRefetch,
	});

	const { handleSubmit } = formProps;

	return (
		<>
			<Modal.Header title={`${viewType === 'create' ? 'Create' : 'Edit'} Configuration`} />

			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<Form controls={controls} formProps={formProps} />
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.button_container}>
						<Button
							type="button"
							size="md"
							themeType="tertiary"
							onClick={() => setShow(false)}
							disabled={loading}
							style={{ marginRight: '10px' }}
						>
							Cancel
						</Button>

						<Button
							type="submit"
							size="md"
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

export default CreateConfiguration;
