import { Button, Popover, Tooltip } from '@cogoport/components';
import { IcMInfo, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../constants/viewTypeMapping';
import useAssignOnboardingAgent from '../../hooks/useAssignOnboardingAgent';
import useUpdateOnboardingRequest from '../../hooks/useUpdateOnboardingRequest';

import AdoptionAssignModal from './AdoptionAssignModal';
import styles from './styles.module.css';

function PlatFormAdoptionAssign({ data = {}, content = null, initialViewType = '' }) {
	const {
		request_type = '', source = '', source_id = '', created_at = '', metadata = {},
		agent_id = '', id = '',
	} = data || {};

	const [assignModal, setAssignModal] = useState({
		show       : false,
		assignData : null,
	});

	const buttonMapping = VIEW_TYPE_GLOBAL_MAPPING[initialViewType]?.adoption_assign_buttons || [];

	const { onboardingAgent = () => {}, loading = false } = useAssignOnboardingAgent({ setAssignModal });
	const { requestLoader = false, updateRequest = () => {} } = useUpdateOnboardingRequest();

	const { show = false, assignData = null } = assignModal || {};

	const loaderMapping = {
		assign_to_agent    : null,
		auto_assign        : loading,
		marks_as_completed : requestLoader,
	};

	const handleAssign = (name) => {
		if (name === 'assign_to_agent') {
			setAssignModal((prev) => ({ ...prev, show: true }));
		}
		if (name === 'auto_assign') {
			onboardingAgent({
				source,
				sourceId       : source_id,
				requestType    : request_type,
				requestedAt    : created_at,
				previousAgents : agent_id,
				metadata,
			});
		}

		if (name === 'marks_as_completed') {
			updateRequest({
				requestId     : id,
				requestStatus : 'completed',
			});
		}
	};

	return (
		<>
			<div className={styles.action}>
				<Tooltip
					content={content}
					placement="left"
					interactive
				>
					<IcMInfo className={styles.info_icon} />
				</Tooltip>
				<Popover
					placement="bottom"
					render={(
						<div className={styles.button_container}>
							{buttonMapping?.map((itm) => (
								<Button
									themeType="secondary"
									key={itm}
									size="sm"
									className={styles.auto_button}
									onClick={() => handleAssign(itm)}
									loading={loaderMapping?.[itm]}
								>
									{startCase(itm)}
								</Button>
							))}
						</div>
					)}
					interactive
				>
					<div className={styles.dot}>
						<IcMOverflowDot className={styles.dot_icon} />
					</div>
				</Popover>
			</div>

			{show ? (
				<AdoptionAssignModal
					show={show}
					setAssignModal={setAssignModal}
					loading={loading}
					source={source}
					source_id={source_id}
					metadata={metadata}
					assignData={assignData}
					request_type={request_type}
					created_at={created_at}
					agent_id={agent_id}
					onboardingAgent={onboardingAgent}
				/>
			) : null}
		</>
	);
}

export default PlatFormAdoptionAssign;
