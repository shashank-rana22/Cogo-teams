import { Button, Modal } from '@cogoport/components';

import Form from '../../../../common/Form';

import styles from './styles.module.css';
import useCreateConfigurations from './useCreateConfigurations';

function CreateConfiguration({
	viewType = '',
	value = {},
	setShowCreateConfig,
	listRefetch,
}) {
	const {
		controls,
		onCreate,
		loadingCreate = false,
		formProps,
	} = useCreateConfigurations({
		viewType,
		value,
		setShowCreateConfig,
		listRefetch,
	});

	const { handleSubmit } = formProps;

	return (
		<>
			<Modal.Header title={`${viewType === 'create' ? 'Create' : 'Edit'} Configuration`} />

			<Modal.Body>
				<Form controls={controls} formProps={formProps} />
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						type="button"
						size="md"
						themeType="secondary"
						onClick={() => setShowCreateConfig(false)}
						disabled={loadingCreate}
						style={{ marginRight: '10px' }}
					>
						CANCEL
					</Button>

					<Button type="submit" size="md" themeType="primary" onClick={handleSubmit(onCreate)}>
						{`${viewType === 'create' ? 'Create' : 'Update'}`}
					</Button>
				</div>
			</Modal.Footer>
		</>
	);
}

export default CreateConfiguration;
