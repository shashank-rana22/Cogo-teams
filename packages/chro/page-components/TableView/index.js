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

const DIVISION_NUMBER = 100000;
const INITIAL_TOTAL_COUNT = 0;
const INITIAL_PAGE = 1;
const PAGE_LIMIT = 10;
const VARIABLE_PAY_THRESHOLD = 0;
const ARRAY_LENGTH = 1;

const getVariablePay = ({
	joining_bonus_yearly,
	retention_bonus_yearly,
	performance_linked_variable_yearly,
}) => (
	Number(joining_bonus_yearly)
	+ Number(retention_bonus_yearly) + Number(performance_linked_variable_yearly)) || VARIABLE_PAY_THRESHOLD;

function TableView({ search, activeTab }) {
	const [ctcBreakup, setCtcBreakup] = useState();
	const [error, setError] = useState(false);

	const { data = {}, onPageChange, loading, refetch } = useGetTableView({ search, activeTab });

	const { list = [], page, page_limit, total_count } = data || {};

	const { metadata = {}, id } = ctcBreakup || {};

	const {
		onFinalSubmit = () => {},
		loading:updateOfferLetterLoading,
	} = useUpdateOfferLetter({ refetch, setCtcBreakup });

	const columns = getColumns({ setCtcBreakup, onFinalSubmit, activeTab, updateOfferLetterLoading });

	const {
		init = 0, joining_bonus_yearly = 0,
		retention_bonus_yearly = 0, performance_linked_variable_yearly = 0,
	} = metadata || {};

	const variable_pay = getVariablePay({
		joining_bonus_yearly,
		retention_bonus_yearly,
		performance_linked_variable_yearly,
	});

	if ((list || []).length < ARRAY_LENGTH && !loading) {
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
						currentPage={page || INITIAL_PAGE}
						totalItems={total_count || INITIAL_TOTAL_COUNT}
						pageSize={page_limit || PAGE_LIMIT}
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
						{init / DIVISION_NUMBER}
						{' '}
						LPA (fixed)
						{variable_pay > VARIABLE_PAY_THRESHOLD
							? ` + Rs. ${variable_pay / DIVISION_NUMBER} LPA (variable)`
							: null}
					</span>
					<CtcBreakup metadata={metadata} />
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.button_container}>
						{ctcBreakup?.status === 'active' ? (
							<>
								<ActionPopover
									error={error}
									setError={setError}
									item={ctcBreakup}
									onFinalSubmit={onFinalSubmit}
									updateOfferLetterLoading={updateOfferLetterLoading}
								/>
								<Button
									onClick={() => onFinalSubmit({ id, status: 'approved' })}
									themeType="primary"
									style={{ marginLeft: 8 }}
									loading={updateOfferLetterLoading}
								>
									Approve
								</Button>
							</>
						) : (
							<Button
								onClick={() => setCtcBreakup('')}
								themeType="secondary"
								style={{ marginLeft: 8 }}
								disable={updateOfferLetterLoading}
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
