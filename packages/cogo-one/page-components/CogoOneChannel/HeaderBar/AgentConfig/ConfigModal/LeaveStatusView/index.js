import { Input, Placeholder } from '@cogoport/components';
import { IcMSearchlight, IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import LeaveModal from '../../../../../../common/LeaveModal';
import useCreateUserInactiveStatus from '../../../../../../hooks/useCreateUserInactiveStatus';

import AgentStatusConfig from './AgentStatusConfig';
import styles from './styles.module.css';

const DEFAULT_PAGE_LIMIT = 10;

function LeaveAgentModal({
	firestore = {},
	isLoading = false,
	listAgentStatus = {},
	setSearch = () => {},
	paramsState = {},
	getListChatAgents = () => {},
	setActiveCard = () => {},
	shiftList = [],
}) {
	const [openLeaveModal, setOpenLeaveModal] = useState(false);
	const [shiftData, setShiftData] = useState({});

	const { list = [] } = listAgentStatus || {};

	const {
		loading: statusLoading = false,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce : getListChatAgents,
		setOpenModal       : setOpenLeaveModal,
		firestore,
	});

	const onChangeToggle = ({ status, agentId }) => {
		let updated_status = 'inactive';
		if (status === 'inactive') {
			updated_status = 'active';
		}
		updateUserStatus({ status: updated_status, userId: agentId });
	};

	const handleToggle = ({ status, agentId }) => {
		const isAgentOnLeave = status === 'on_leave';
		if (!isAgentOnLeave) {
			setOpenLeaveModal(agentId);
		} else {
			updateUserStatus({ status: 'active', userId: agentId });
		}
	};

	return (
		<div className={styles.padding_inner}>
			<div className={styles.header_bar}>
				<div className={styles.back_section}>
					<IcMArrowBack
						className={styles.arrow_back}
						onClick={() => setActiveCard('')}
					/>
					Back
				</div>
				<div className={styles.header}>
					<Input
						size="sm"
						placeholder="Search Agent Name..."
						value={paramsState?.query}
						onChange={setSearch}
						disabled={isLoading}
						prefix={(
							<IcMSearchlight
								height={20}
								width={20}
								fill="#9f9f9f"
							/>
						)}
					/>
				</div>
			</div>

			<div className={styles.list_container}>
				{(isLoading ? [...Array(DEFAULT_PAGE_LIMIT).keys()] : list).map((itm) => {
					const { id = '', name = '', status = '', agent_id = '' } = itm || {};

					return (
						<div
							key={isLoading ? itm : id}
							className={styles.list_item_styles}
						>
							<div className={styles.agent_name}>
								{isLoading
									? <Placeholder height={25} width={200} />
									: name}
							</div>

							<div className={styles.agent_status}>
								{isLoading ? (
									<Placeholder
										height={25}
										width={60}
									/>
								) : (
									<AgentStatusConfig
										status={status}
										onChangeToggle={onChangeToggle}
										agentId={agent_id}
										statusLoading={statusLoading}
										handleToggle={handleToggle}
										shiftList={shiftList}
										setShiftData={setShiftData}
										shiftData={shiftData}
										rowId={id}
										updateUserStatus={updateUserStatus}
										list={list}
									/>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{openLeaveModal && (
				<LeaveModal
					setOpenLeaveModal={setOpenLeaveModal}
					loading={statusLoading}
					userId={openLeaveModal}
					updateUserStatus={updateUserStatus}
				/>
			)}
		</div>
	);
}

export default LeaveAgentModal;
