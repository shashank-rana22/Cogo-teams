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
				<Modal.Header title="Are you sure?" />
				<Modal.Body>
					{metadata?.init}
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
