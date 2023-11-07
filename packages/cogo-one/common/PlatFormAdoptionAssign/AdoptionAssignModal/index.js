import { Button, Modal } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function AdoptionAssignModal({
	show = false, setAssignModal = () => {}, loading = false, assignData = '', onboardingAgent = () => {},
	source_id = '', request_type = '', created_at = '', agent_id = '', source = '', metadata = null,
}) {
	const handleSubmit = () => {
		onboardingAgent({
			source,
			sourceId       : source_id,
			agentId        : assignData,
			requestType    : request_type,
			requestedAt    : created_at,
			previousAgents : agent_id,
			metadata,
		});
	};

	const handleClose = () => {
		setAssignModal(() => ({
			assignData : null,
			show       : false,
		}));
	};

	if (!show) {
		return null;
	}

	return (
		<Modal
			show={show}
			size="sm"
			scroll={false}
			onClose={handleClose}
			closeOnOuterClick={handleClose}
			placement="top"
		>
			<Modal.Header title="Assign To Agent" />
			<Modal.Body>
				<div className={styles.label}>Select agent</div>
				<AsyncSelect
					asyncKey="list_chat_agents"
					isClearable
					initialCall
					value={assignData}
					onChange={(val) => setAssignModal((prev) => ({ ...prev, assignData: val }))}
					params={{
						filters: {
							status     : 'active',
							agent_type : ['support', 'support_supply'],
						},
						sort_by: 'agent_type',
					}}
					renderLabel={(item) => (
						<div>
							<div className={styles.agent_label}>
								{startCase(item.name)}
							</div>
							<div className={styles.lower_label}>
								{startCase(item?.agent_type)}
							</div>
						</div>
					)}
					className={styles.async_select}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					disabled={loading}
					themeType="tertiary"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button loading={loading} onClick={handleSubmit}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AdoptionAssignModal;
