import { Modal, Button,Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import StyledTable from '../StyledTable';
import useGetTableView from './useGetTableView'
import getColumns from './getColumns';
import styles from './styles.module.css';

function TableView({ search }) {
	const [ctcBreakup, setCtcBreakup] = useState();

	const columns = getColumns(setCtcBreakup);

	const {data = {},onPageChange} = useGetTableView()
	console.log('data',data)

	const{ list = [],page, page_limit, total_count} = data

	const {metadata = {}} = ctcBreakup || {}
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
					et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
					consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut s
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assu
					et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
					Pariatur eaque aut sunt?
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setCtcBreakup('')}>OK</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TableView;
