import { Modal, Input, Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useListChatAgents from '../../../hooks/useListChatAgents';
import useUpdateAgentPreference from '../../../hooks/useUpdateAgentPreference';

import AgentDetail from './AgentDetail';
import styles from './styles.module.css';

function AgentModal({
	agentDetails,
	setAgentDetails = () => {},
}) {
	const [search, setSearch] = useState('');
	const {
		getListChatAgents = () => {},
		loading = false,
		listAgentStatus = {},
		setPagination = () => {},
	} = useListChatAgents(search);

	const {
		updateAgentPreference,
		createLoading = false,
	} = useUpdateAgentPreference({ getListChatAgents });

	const {
		list = [],
		page_limit,
		total_count,
		page,
	} = listAgentStatus;

	const modifiedList = loading ? [{}, {}, {}, {}, {}, {}, {}, {}] : list || [];

	return (
		<Modal
			size="md"
			show={agentDetails}
			onClose={() => setAgentDetails(false)}
			placement="center"
		>
			<Modal.Header title="Agent Status" />
			<Modal.Body className={styles.modal_body}>
				<Input
					size="sm"
					placeholder="Search here"
					className={styles.search}
					prefix={<IcMSearchlight />}
					onChange={setSearch}
				/>
				<div>
					{!isEmpty(modifiedList) ? modifiedList.map(({ name = '', status = '', agent_id = '' }) => (
						<AgentDetail
							createLoading={createLoading}
							updateAgentPreference={updateAgentPreference}
							loading={loading}
							agent={name}
							status={status}
							agent_id={agent_id}
						/>

					)) : <div className={styles.empty_state}>No data found</div>}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Pagination
					className={styles.pagination}
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPagination}
				/>
			</Modal.Footer>
		</Modal>
	);
}

export default AgentModal;
