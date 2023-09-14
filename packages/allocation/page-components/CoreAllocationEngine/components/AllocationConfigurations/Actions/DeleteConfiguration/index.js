import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useUpdateConfiguration from '../../../../hooks/useUpdateConfiguration';

function DeleteConfiguration({
	item = {},
	setShow,
	listRefetch,
}) {
	const { t } = useTranslation(['allocation']);

	const {
		onDelete, loadingUpdate,
	} = useUpdateConfiguration({ item, listRefetch, setShow, t });

	return (
		<>
			<Modal.Header title={t('allocation:delete_configuration')} />

			<Modal.Body>{t('allocation:delete_configuration_phrase')}</Modal.Body>

			<Modal.Footer>
				<Button
					type="submit"
					size="md"
					themeType="primary"
					disabled={loadingUpdate}
					onClick={onDelete}
				>
					{t('allocation:yes_label')}
				</Button>
			</Modal.Footer>
		</>
	);
}

export default DeleteConfiguration;
