import { Button, Modal } from '@cogoport/components';

import Form from '../../../../common/Form';
import useCreateConfigurations from '../../../../hooks/useCreateConfigurations';
import useUpdateConfiguration from '../../../../hooks/useUpdateConfiguration';

import styles from './styles.module.css';

function CreateConfiguration({
	viewType = '',
	value = {},
	setShow,
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
		setShow,
		listRefetch,
	});

	const {
		onEdit = () => {}, loadingUpdate = false,
	} = useUpdateConfiguration({ value, listRefetch, setShow });

	const { handleSubmit } = formProps;

	const onSubmit = viewType === 'create' ? onCreate : onEdit;

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
						onClick={() => setShow(false)}
						disabled={loadingCreate || loadingUpdate}
						style={{ marginRight: '10px' }}
					>
						CANCEL
					</Button>

					<Button type="submit" size="md" themeType="primary" onClick={handleSubmit(onSubmit)}>
						{`${viewType === 'create' ? 'Create' : 'Update'}`}
					</Button>
				</div>
			</Modal.Footer>
		</>
	);
}

export default CreateConfiguration;
