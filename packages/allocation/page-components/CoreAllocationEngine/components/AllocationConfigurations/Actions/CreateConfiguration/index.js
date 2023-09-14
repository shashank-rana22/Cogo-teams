import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import Form from '../../../../../../common/Form';
import useCreateConfigurations from '../../../../hooks/useCreateConfigurations';

import styles from './styles.module.css';

function CreateConfiguration({
	viewType = '',
	item = {},
	setShow,
	listRefetch,
}) {
	const { t } = useTranslation(['allocation']);

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
		t,
	});

	const { handleSubmit } = formProps;

	return (
		<>
			<Modal.Header title={`${viewType === 'create' ? t('allocation:create_button_label')
				: t('allocation:edit_button')} ${t('allocation:configuration_label')}`}
			/>

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
							{t('allocation:cancel_button')}
						</Button>

						<Button
							type="submit"
							size="md"
							themeType="primary"
							disabled={loading}
						>
							{t('allocation:save_button')}
						</Button>
					</div>
				</Modal.Footer>
			</form>
		</>
	);
}

export default CreateConfiguration;
