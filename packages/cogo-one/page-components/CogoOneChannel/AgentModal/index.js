import { Modal, Input, Pagination, Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { collection, query, limit, getDocs, updateDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';

import { FIRESTORE_PATH } from '../../../configurations/firebase-config';
import useListChatAgents from '../../../hooks/useListChatAgents';
import useUpdateAgentPreference from '../../../hooks/useUpdateAgentPreference';

import AgentDetail from './AgentDetail';
import styles from './styles.module.css';

const LIMIT = 1;
const ARRAY_LENGTH = 8;

const getIsActive = async (firestore) => {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = await query(constantCollection, limit(LIMIT));
	const cogoOneConstants = await getDocs(constantsQuery);
	const cogoOneConstantsDocs = cogoOneConstants?.docs[GLOBAL_CONSTANTS.zeroth_index];
	const { is_locked_screen = false } = cogoOneConstantsDocs?.data() || {};
	return is_locked_screen;
};

const updateRoom = async ({ firestore, value }) => {
	const constantRoom = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const roomsQuery = await query(constantRoom, limit(LIMIT));
	const docs = await getDocs(roomsQuery);
	const roomId = docs?.docs?.[GLOBAL_CONSTANTS.zeroth_index]?.id;

	const docRef = doc(
		firestore,
		`${FIRESTORE_PATH.cogoone_constants}/${roomId}`,
	);

	updateDoc(docRef, { is_locked_screen: value });
};

function AgentModal({
	agentDetails = false,
	setAgentDetails = () => { },
	firestore,
}) {
	const { isLockedBool } = getIsActive(firestore);
	const [search, setSearch] = useState('');
	const [isLockedToggle, setIsLockedToggle] = useState(isLockedBool);
	const {
		getListChatAgents = () => { },
		loading = false,
		listAgentStatus = {},
		setPagination = () => { },
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

	const modifiedList = loading ? [...Array(ARRAY_LENGTH).fill({})] : list || [];

	const onToggle = (e) => {
		setIsLockedToggle(e?.target?.checked);
		updateRoom({ firestore, value: e?.target?.checked });
	};

	return (
		<Modal
			size="md"
			show={agentDetails}
			onClose={() => setAgentDetails(false)}
			placement="center"
		>
			<Modal.Header title="Agent Status" />
			<Modal.Body className={styles.modal_body}>
				<div className={styles.search_switch_toggle_space}>
					<Input
						size="sm"
						placeholder="Search here"
						className={styles.search}
						prefix={<IcMSearchlight />}
						onChange={setSearch}
					/>
					<div className={styles.search_switch_toggle_space}>

						Screen Lock
						<Toggle
							onChange={onToggle}
							checked={isLockedToggle}
						/>
					</div>
				</div>
				{!isEmpty(modifiedList) ? modifiedList?.map(({ name = '', status = '', agent_id = '' }) => (
					<AgentDetail
						key={agent_id}
						createLoading={createLoading}
						updateAgentPreference={updateAgentPreference}
						loading={loading}
						agent={name}
						status={status}
						agent_id={agent_id}
					/>

				)) : <div className={styles.empty_state}>No data found</div>}
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
