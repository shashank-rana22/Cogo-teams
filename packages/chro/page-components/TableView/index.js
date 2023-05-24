import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import StyledTable from '../StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

function TableView({ search }) {
	const [ctcBreakup, setCtcBreakup] = useState();

	const columns = getColumns(setCtcBreakup);

	return (
		<div className={styles.table_container}>
			<StyledTable columns={columns} data={[{ id: '1' }]} />

			<Modal
				size="lg"
				show={ctcBreakup}
				onClose={() => setCtcBreakup('')}
			>
				<Modal.Header title="Are you sure?" />
				<Modal.Body>
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
