import { Modal, Input, Pagination, Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import LeaveModal from '../../../../../common/LeaveModal';
import useCreateUserInactiveStatus from '../../../../../hooks/useCreateUserInactiveStatus';
import useListAgentStatus from '../../../../../hooks/useListAgentStatus';
import getCommonAgentType from '../../../../../utils/getCommonAgentType';

import styles from './styles.module.css';

function LeaveAgentModal({
	setShowLeaveAgentModal = () => {},
	viewType = '',
	firestore = {},
}) {
	const [openLeaveModal, setOpenLeaveModal] = useState(false);

	const {
		isLoading = false,
		listAgentStatus = {},
		setPagination = () => {},
		setSearch = () => {},
		paramsState = {},
		getAgentsStatus,
	} = useListAgentStatus({ agentType: getCommonAgentType({ viewType }) });

	const { list = [], page = 0, page_limit = 0, total_count = 0 } = listAgentStatus || {};

	const {
		loading: statusLoading = false,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce : getAgentsStatus,
		setOpenModal       : setOpenLeaveModal,
		firestore,
	});

	const onChangeToggle = ({ status, agent_id }) => {
		const isAgentOnLeave = status === 'on_leave';
		if (!isAgentOnLeave) {
			setOpenLeaveModal(agent_id);
		} else {
			updateUserStatus({ status: 'active', userId: agent_id, agentId: agent_id });
		}
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
							alt="loader"
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
										onChange={() => onChangeToggle({ agent_id, status })}
										disabled={statusLoading}
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

			{openLeaveModal && (
				<LeaveModal
					setOpenLeaveModal={setOpenLeaveModal}
					loading={statusLoading}
					userId={openLeaveModal}
					updateUserStatus={updateUserStatus}
				/>
			)}
		</Modal>
	);
}

export default LeaveAgentModal;
