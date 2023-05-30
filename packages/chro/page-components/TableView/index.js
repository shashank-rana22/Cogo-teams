import { Modal, Button, Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import StyledTable from '../StyledTable';

import ActionPopover from './ActionPopover';
import CtcBreakup from './CtcBreakup';
import getColumns from './getColumns';
import styles from './styles.module.css';
import useGetTableView from './useGetTableView';
import useUpdateOfferLetter from './useUpdateOfferLetter';

function TableView({ search }) {
	const [ctcBreakup, setCtcBreakup] = useState();

	const { data = {}, onPageChange } = useGetTableView();

	const { list = [], page, page_limit, total_count } = data || {};

	const { metadata = {}, id } = ctcBreakup || {};
	const { onFinalSubmit = () => {} } = useUpdateOfferLetter(id);
	const columns = getColumns({ setCtcBreakup, ctcBreakup, onFinalSubmit });

	const {
		init = 0, joining_bonus_yearly = 0,
		retention_bonus_yearly = 0, performance_linked_variable_yearly = 0,
	} = metadata || {};

	const variable_pay = (joining_bonus_yearly
				+ retention_bonus_yearly
				+ performance_linked_variable_yearly) || 0;

	return (
		<div className={styles.table_container}>
			<StyledTable columns={columns} data={list} />
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
						<ActionPopover ctcBreakup={ctcBreakup} onFinalSubmit={onFinalSubmit} />
						<Button
							onClick={() => { onFinalSubmit('approved'); }}
							themeType="primary"
							style={{ marginLeft: 8 }}
						>
							Approve
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TableView;
