import { Modal } from '@cogoport/components';
import React from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filters({ data, show, setShow }) {
	return (
		<div className={styles.container}>
			<Modal
				animate
				size="md"
				show={show}
				onClose={() => setShow(false)}
				placement="right"
				className={styles.modal}
			>
				<Modal.Body>
					<FilterContent data={data} setShow={setShow} />
				</Modal.Body>

			</Modal>
		</div>
	);
}

export default Filters;
