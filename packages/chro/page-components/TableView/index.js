import { Modal, Button, Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import EmptyState from '../../commons/EmptyState';
import StyledTable from '../../commons/StyledTable';

import ActionPopover from './ActionPopover';
import CtcBreakup from './CtcBreakup';
import getColumns from './getColumns';
import styles from './styles.module.css';
import useGetTableView from './useGetTableView';
import useUpdateOfferLetter from './useUpdateOfferLetter';

function TableView({ search, activeTab }) {
	const [ctcBreakup, setCtcBreakup] = useState();

	const { data = {}, onPageChange, loading } = useGetTableView({ search, activeTab });

	const { list = [], page, page_limit, total_count } = data || {};

	const { metadata = {}, id } = ctcBreakup || {};

	const { onFinalSubmit = () => {} } = useUpdateOfferLetter();

	const columns = getColumns({ setCtcBreakup, onFinalSubmit, activeTab });

	const {
		init = 0, joining_bonus_yearly = 0,
		retention_bonus_yearly = 0, performance_linked_variable_yearly = 0,
	} = metadata || {};

	const variable_pay = (Number(joining_bonus_yearly)
				+ Number(retention_bonus_yearly)
				+ Number(performance_linked_variable_yearly)) || 0;

	if ((list || []).length < 1 && !loading) {
		return (
			<EmptyState
				flexDirection="column"
				emptyText="No pending requests to review"
				textSize={20}
			/>
		);
	}

	return (
		<div className={styles.table_container}>
			<StyledTable columns={columns} data={list} loading={loading} />
			{total_count > page_limit && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page || 1}
						totalItems={total_count || 0}
						pageSize={page_limit || 10}
						onPageChange={onPageChange}
					/>
				</div>
			)}

			<Modal
				size="lg"
				show={ctcBreakup}
				onClose={() => setCtcBreakup('')}
			>
				{ctcBreakup?.employee_detail?.name
					? <Modal.Header title={`${ctcBreakup?.employee_detail?.name}`} />
					: null}
				<Modal.Body>
					Final Compensation Offered:
					{' '}
					<span style={{ fontWeight: 600 }}>
						Rs.
						{' '}
						{init}
						{' '}
						LPA (fixed)
						{variable_pay > 0 ? ` + Rs. ${variable_pay} LPA (variable)`
							: null}
					</span>
					<CtcBreakup metadata={metadata} />
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button_container}>
						{ctcBreakup?.status === 'active' ? (
							<>
								<ActionPopover ctcBreakup={ctcBreakup} onFinalSubmit={onFinalSubmit} />
								<Button
									onClick={() => onFinalSubmit({ id, status: 'approved' })}
									themeType="primary"
									style={{ marginLeft: 8 }}
								>
									Approve
								</Button>
							</>
						) : (
							<Button
								onClick={() => setCtcBreakup('')}
								themeType="secondary"
								style={{ marginLeft: 8 }}
							>
								Close
							</Button>
						)}
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TableView;
