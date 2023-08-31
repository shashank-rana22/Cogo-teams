import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import Form from '../../../../../common/Form';
import useCreateAllocationRequest from '../../../hooks/useCreateAllocationRequest';

function CreateUpdateModal(props) {
	const { t } = useTranslation(['allocation']);

	const { refetch, onCloseModal, params } = props;

	const {
		onSave,
		loading: loadingOnSave,
		formProps,
		controls,
	} = useCreateAllocationRequest({ onCloseModal, refetch, params, t });

	const { handleSubmit } = formProps;

	return (
		<>
			<Modal.Header title={t('allocation:create_request_label')} />

			<form onSubmit={handleSubmit(onSave)}>
				<Modal.Body>
					<Form
						formProps={formProps}
						controls={controls}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						type="button"
						themeType="tertiary"
						disabled={loadingOnSave}
						id="cancel_request_btn"
						onClick={onCloseModal}
						style={{ marginRight: '10px' }}
					>
						{t('allocation:cancel_button')}
					</Button>

					<Button
						size="md"
						type="submit"
						themeType="primary"
						loading={loadingOnSave}
						id="save_request_btn"
					>
						{t('allocation:save_button')}
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default CreateUpdateModal;
