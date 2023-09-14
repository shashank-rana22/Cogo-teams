import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import Form from '../../../../../../common/Form';
import usePublishConfiguration from '../../../../hooks/usePublishConfiguration';

function PublishConfiguration({
	item = {},
	setShow,
	listRefetch,
}) {
	const { t } = useTranslation(['allocation']);

	const {
		onPublish,
		loadingPublish,
		formProps,
		controls,
	} = usePublishConfiguration({ item, listRefetch, setShow, t });

	const { handleSubmit } = formProps;

	return (
		<>
			<Modal.Header title={t('allocation:publish_configuration')} />

			<form onSubmit={handleSubmit(onPublish)}>
				<Modal.Body>
					<Form formProps={formProps} controls={controls} />
				</Modal.Body>

				<Modal.Footer>
					<Button
						type="submit"
						size="md"
						themeType="primary"
						disabled={loadingPublish}
					>
						{t('allocation:publish_button')}
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default PublishConfiguration;
