import { Button, Modal, Popover } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMInfo, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useAssignOnboardingAgent from '../../hooks/useAssignOnboardingAgent';

import styles from './styles.module.css';

function PlatFormAdoptionAssign({ data = {} }) {
	const {
		request_type = '', source = '', source_id = '', created_at = '', metadata = {},
		agent_id = '',
	} = data || {};

	const [assignModal, setAssignModal] = useState({
		show       : false,
		assignData : null,
	});

	const { onboardingAgent = () => {}, loading = false } = useAssignOnboardingAgent({ setAssignModal });

	const { show = false, assignData = null } = assignModal || {};

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

	return (
		<>
			<div className={styles.action}>
				<IcMInfo className={styles.info_icon} />
				<Popover
					placement="left"
					render={(
						<Button
							themeType="secondary"
							size="sm"
							onClick={() => setAssignModal((prev) => ({ ...prev, show: true }))}
						>
							Assign to agent
						</Button>
					)}
					interactive
				>
					<div className={styles.dot}>
						<IcMOverflowDot className={styles.dot_icon} />
					</div>
				</Popover>
			</div>

			{show && (
				<Modal
					show={show}
					size="sm"
					scroll={false}
					onClose={() => setAssignModal(() => ({
						assignData : null,
						show       : false,
					}))}
					closeOnOuterClick={() => setAssignModal(() => ({
						assignData : null,
						show       : false,
					}))}
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
							onClick={() => setAssignModal(() => ({
								assignData : null,
								show       : false,
							}))}
						>
							Cancel
						</Button>
						<Button loading={loading} onClick={handleSubmit}>Submit</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}

export default PlatFormAdoptionAssign;
