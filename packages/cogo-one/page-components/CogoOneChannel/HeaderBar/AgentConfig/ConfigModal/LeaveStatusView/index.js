import { Input, Placeholder, Toggle } from '@cogoport/components';
import { IcMSearchlight, IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import LeaveModal from '../../../../../../common/LeaveModal';
import useCreateUserInactiveStatus from '../../../../../../hooks/useCreateUserInactiveStatus';

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
}) {
	const [openLeaveModal, setOpenLeaveModal] = useState(false);

	const { list = [] } = listAgentStatus || {};

	const {
		loading: statusLoading = false,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce : getListChatAgents,
		setOpenModal       : setOpenLeaveModal,
		firestore,
	});

	const onChangeToggle = ({ status, agent_id }) => {
		const isAgentOnLeave = status === 'on_leave';
		if (!isAgentOnLeave) {
			setOpenLeaveModal(agent_id);
		} else {
			updateUserStatus({ status: 'active', userId: agent_id });
		}
	};

	return (
		<div className={styles.padding_inner}>
			<div className={styles.header_bar}>
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

			<div className={styles.list_container}>
				{(isLoading ? [...Array(DEFAULT_PAGE_LIMIT).keys()] : list).map((itm) => {
					const { id = '', name = '', status = '', agent_id = '' } = itm;

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
									<Toggle
										size="md"
										checked={status !== 'on_leave'}
										value={status}
										onChange={() => onChangeToggle({ agent_id, status })}
										disabled={statusLoading}
										className={styles.toggle}
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
