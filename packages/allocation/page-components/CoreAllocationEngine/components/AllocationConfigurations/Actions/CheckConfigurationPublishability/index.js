import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useCheckConfigurationPublishability from '../../../../hooks/useCheckConfigurationPublishability';

function CheckConfigurationPublishablity({
	item = {},
	setShow,
	listRefetch,
}) {
	const { t } = useTranslation(['allocation']);

	const {
		onCheckPublish, loadingCheckPublishability,
	} = useCheckConfigurationPublishability({ item, listRefetch, setShow, t });

	return (
		<>
			<Modal.Header title={t('allocation:check_publishability')} />

			<Modal.Body>{t('allocation:check_publishability_phrase')}</Modal.Body>

			<Modal.Footer>
				<Button
					type="submit"
					size="md"
					themeType="primary"
					disabled={loadingCheckPublishability}
					onClick={onCheckPublish}
				>
					{t('allocation:check_button')}
				</Button>
			</Modal.Footer>
		</>
	);
}

export default CheckConfigurationPublishablity;
