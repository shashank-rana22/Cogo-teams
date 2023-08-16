import { Modal, Input, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useListAgentStatus from '../../../../../hooks/useListAgentStatus';
import getCommonAgentType from '../../../../../utils/getCommonAgentType';

import styles from './styles.module.css';

const UNAVAIABLE_STATUS = ['on_leave', 'inactive'];

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
	} = useListAgentStatus({ agentType: getCommonAgentType({ viewType }) });

	const { list = [], page = 0, page_limit = 0, total_count = 0 } = listAgentStatus || {};

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
						const { id = '', name = '', status = '' } = itm;

						return (
							<div
								key={id}
								className={styles.list_item_styles}
							>
								<div className={styles.agent_name}>
									{name}
								</div>
								<div className={styles.agent_status}>
									<div
										className={styles.status_color}
										style={{
											backgroundColor: UNAVAIABLE_STATUS.includes(status)
												? '#ee3425' : '#00a884',
										}}
									/>

									{startCase(status)}
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
