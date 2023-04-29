import { Button, Modal } from '@cogoport/components';

import useUpdateConfiguration from '../../../../hooks/useUpdateConfiguration';

function DeleteConfiguration({
	item = {},
	setShow,
	listRefetch,
}) {
	const {
		onDelete, loadingUpdate,
	} = useUpdateConfiguration({ item, listRefetch, setShow });

	return (
		<>
			<Modal.Header title="Delete Configuration" />

			<Modal.Body>Do you want to delete this configuration?</Modal.Body>

			<Modal.Footer>
				<Button
					type="submit"
					size="md"
					themeType="primary"
					disabled={loadingUpdate}
					onClick={onDelete}
				>
					Yes
				</Button>
			</Modal.Footer>
		</>
	);
}

export default DeleteConfiguration;
