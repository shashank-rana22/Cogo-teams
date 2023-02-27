import { Button, Modal } from '@cogoport/components';

import Form from '../../../../../../common/Form';
import usePublishConfiguration from '../../../../hooks/usePublishConfiguration';

function PublishConfiguration({
	item = {},
	setShow,
	listRefetch,
}) {
	const { onPublish, loadingPublish, formProps, controls } = usePublishConfiguration({ item, listRefetch, setShow });

	const { handleSubmit } = formProps;

	return (
		<>
			<Modal.Header title="Publish Configuration" />

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
						Publish
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default PublishConfiguration;
