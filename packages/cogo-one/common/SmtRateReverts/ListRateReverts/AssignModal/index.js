import { Button, Modal } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';

import useUpdateSMTRateJob from '../../../../hooks/useUpdateSMTRateJob';

import styles from './styles.module.css';

function AssignModal({
	assignData = {},
	setAssignData = () => {},
	fetchRateJobs = () => {},
}) {
	const { assignUser = '', revertDetails = {} } = assignData || {};
	const {
		service_type: serviceType = '',
		id = '',
	} = revertDetails || {};

	const {
		updateRateJob = () => {},
		loading = false,
	} = useUpdateSMTRateJob({ serviceType, setAssignData, fetchRateJobs });

	const handleClose = () => {
		setAssignData((prev) => ({
			...prev,
			showModal     : false,
			assignUser    : '',
			revertDetails : {},
		}));
	};

	const handleSubmit = () => {
		updateRateJob({ assignUser, id });
	};

	return (
		<Modal
			size="sm"
			show
			onClose={handleClose}
			className={styles.styled_modal}
			scroll={false}
		>
			<Modal.Header title="Assign" />

			<Modal.Body>
				<div className={styles.label}>
					Select User
				</div>

				<AsyncSelect
					value={assignUser}
					placeholder="Select user"
					asyncKey="list_chat_agents"
					initialCall
					size="sm"
					params={{
						filters: {
							common_agent_type : 'supply',
							status            : 'active',
						},
						sort_by: 'agent_type',
					}}
					onChange={(val) => setAssignData(
						(prev) => ({
							...prev,
							assignUser: val,
						}),
					)}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="tertiary"
					onClick={handleClose}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					themeType="primary"
					onClick={handleSubmit}
					loading={loading}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AssignModal;
