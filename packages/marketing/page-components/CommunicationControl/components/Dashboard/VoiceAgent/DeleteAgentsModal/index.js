import { Modal, Button } from '@cogoport/components';

function DeleteAgentsModal({
	deleteAgentsModal = '',
	checkedRowsSerialId = [],
	setDeleteAgentsModal = () => {},
	deleteHandler = () => {},
}) {
	return (
		<div>
			{deleteAgentsModal ? (
				<Modal
					show={deleteAgentsModal}
					onClose={() => { setDeleteAgentsModal(false); }}
					placement="top"
				>
					<Modal.Header title="Delete Agents" />
					<Modal.Body>
						{`Are you sure you want to delete ${checkedRowsSerialId.length} Agents from the system?`}
					</Modal.Body>
					<Modal.Footer>
						<Button
							themeType="secondary"
							style={{ marginRight: 5 }}
							onClick={() => { setDeleteAgentsModal(false); }}
						>
							NO
						</Button>
						<Button
							onClick={deleteHandler}
						>
							YES
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}
export default DeleteAgentsModal;
