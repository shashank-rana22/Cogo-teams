import { Button, Modal } from '@cogoport/components';

import useCheckConfigurationPublishability from '../../../../hooks/useCheckConfigurationPublishability';

function CheckConfigurationPublishablity({
	item = {},
	setShow,
	listRefetch,
}) {
	const {
		onCheckPublish, loadingCheckPublishability,
	} = useCheckConfigurationPublishability({ item, listRefetch, setShow });

	return (
		<>
			<Modal.Header title="Check Publishability" />

			<Modal.Body>Do you want to check publishability of the configuration?</Modal.Body>

			<Modal.Footer>
				<Button
					type="submit"
					size="md"
					themeType="primary"
					disabled={loadingCheckPublishability}
					onClick={onCheckPublish}
				>
					Check
				</Button>
			</Modal.Footer>
		</>
	);
}

export default CheckConfigurationPublishablity;
