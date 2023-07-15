import { Modal, Input, Pagination, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { formatAgentList } from '../../../helpers/groupAgentsHelpers';
import useGetOmnichannelAgentTypes from '../../../hooks/useGetOmnichannelAgentTypes';
import useListChatAgents from '../../../hooks/useListChatAgents';
import useUpdateAgentPreference from '../../../hooks/useUpdateAgentPreference';

import GroupedAgents from './GroupedAgents';
import styles from './styles.module.css';

const LOADER_COUNT = 8;

function AgentModal({
	showAgentDetails = false,
	setShowAgentDetails = () => {},
}) {
	const {
		getListChatAgents = () => {},
		loading = false,
		listAgentStatus = {},
		setPagination = () => {},
		setSearch = () => {},
		paramsState = {},
		setAgentType = () => {},
	} = useListChatAgents();

	const {
		updateAgentPreference,
		createLoading = false,
	} = useUpdateAgentPreference({ getListChatAgents });

	const { options = [] } = useGetOmnichannelAgentTypes();

	const {
		list = [],
		page_limit = 10,
		total_count = 0,
		page = 0,
	} = listAgentStatus;

	const modifiedGroupedAgents = loading
		? { load: [...Array(LOADER_COUNT).fill({})] } : formatAgentList({ list }) || {};

	return (
		<Modal
			size="md"
			show={showAgentDetails}
			onClose={() => setShowAgentDetails(false)}
			placement="center"
		>
			<Modal.Header title="Agent Status" />
			<Modal.Body className={styles.modal_body}>
				<div className={styles.header_filters}>
					<Input
						size="sm"
						placeholder="Search here"
						className={styles.search}
						prefix={<IcMSearchlight />}
						onChange={setSearch}
					/>
					<Select
						size="sm"
						placeholder="Select agent type"
						className={styles.select_styles}
						prefix={<IcMSearchlight />}
						onChange={setAgentType}
						options={options}
						value={paramsState?.agentType}
						isClearable
					/>
				</div>
				{!isEmpty(modifiedGroupedAgents)
					? Object.keys(modifiedGroupedAgents).map((eachType) => (
						<GroupedAgents
							key={eachType}
							groupedList={modifiedGroupedAgents[eachType]}
							groupName={eachType}
							createLoading={createLoading}
							updateAgentPreference={updateAgentPreference}
							loading={loading}
						/>
					))
					: <div className={styles.empty_state}>No data found</div>}
			</Modal.Body>
			<Modal.Footer className={styles.footer_styles}>
				{!loading && (
					<Pagination
						className={styles.pagination}
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setPagination}
					/>
				)}
			</Modal.Footer>
		</Modal>
	);
}

export default AgentModal;
