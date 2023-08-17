import { Modal, Input, Pagination, Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React from 'react';

import useListAgentStatus from '../../../../../hooks/useListAgentStatus';
import useUpdateAgentPreference from '../../../../../hooks/useUpdateAgentPreference';
import getCommonAgentType from '../../../../../utils/getCommonAgentType';

import styles from './styles.module.css';

function LeaveAgentModal({
	setShowLeaveAgentModal = () => {},
	viewType = '',
}) {
	const {
		isLoading = false,
		listAgentStatus = {},
		setPagination = () => {},
		setSearch = () => {},
		paramsState = {},
		getAgentsStatus,
	} = useListAgentStatus({ agentType: getCommonAgentType({ viewType }) });

	const { createLoading, updateAgentPreference } = useUpdateAgentPreference({ getListChatAgents: getAgentsStatus });

	const { list = [], page = 0, page_limit = 0, total_count = 0 } = listAgentStatus || {};

	const onToggle = ({ status, agent_id }) => {
		const updated_status = status === 'on_leave'
			? 'active' : 'on_leave';

		updateAgentPreference(agent_id, updated_status);
	};

	return (
		<Modal
			show
			size="md"
			placement="top"
			className={styles.styled_modal}
			onClose={() => setShowLeaveAgentModal(false)}
		>
			<Modal.Header title="Agents Leave Status" />
			<Modal.Body>
				<div className={styles.header}>
					<Input
						size="sm"
						placeholder="Search Agent Name..."
						value={paramsState?.query}
						onChange={setSearch}
						disabled={!!isLoading}
						prefix={(
							<IcMSearchlight
								height={20}
								width={20}
								fill="#9f9f9f"
							/>
						)}
					/>
				</div>

				<div className={styles.list_container}>
					{isLoading ? (
						<Image
							src={GLOBAL_CONSTANTS.image_url.cargo_insurance_loader}
							height={210}
							width={210}
						/>
					) : list.map((itm) => {
						const { id = '', name = '', status = '', agent_id = '' } = itm;

						return (
							<div
								key={id}
								className={styles.list_item_styles}
							>
								<div className={styles.agent_name}>
									{name}
								</div>

								<div className={styles.agent_status}>
									<Toggle
										size="md"
										checked={status !== 'on_leave'}
										value={status}
										onChange={() => onToggle({ agent_id, status })}
										disabled={createLoading}
										className={styles.toggle}
									/>
								</div>
							</div>
						);
					})}
				</div>

				<div className={styles.pagination_styles}>
					<Pagination
						type="number"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setPagination}
					/>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default LeaveAgentModal;
