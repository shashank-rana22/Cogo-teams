import { Modal, Button } from '@cogoport/components';

import useBulkUpdateServetalAgents from '../../../../hooks/useBulkUpdateServetalAgents';

function DeleteAgentsModal({
	deleteAgentsModal = '',
	checkedRowsSerialId = [],
	setDeleteAgentsModal = () => {},
	listServetalAgent = () => {},
}) {
	const getPayload = () => {
		const agents = checkedRowsSerialId.map((item) => ({
			agent_name   : item?.agent_data?.name,
			agent_number : item?.mobile_number,
			id           : item?.id,
			action_type  : 'delete_agent',
		}));

		return { agents };
	};

	const { bulkUpdateAgents = () => {}, deleteLoading = '' } = useBulkUpdateServetalAgents();

	const deleteHandler = () => {
		bulkUpdateAgents({ setDeleteAgentsModal, listServetalAgent, payload: getPayload() });
		setDeleteAgentsModal(false);
	};

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
							disabled={deleteLoading}
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
