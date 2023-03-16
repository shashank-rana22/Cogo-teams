import { Modal, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import CreateModal from './CreateModal';
import styles from './styles.module.css';

function Header() {
	const [mode, setMode] = useState('');
	const [showModal, setShowModal] = useState(false);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>
					Live Configuration&nbsp;:&nbsp;
					<strong>Version 3</strong>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.left_text}>
						Published On&nbsp;:&nbsp;
						<strong>{format(new Date(), 'dd MMM yyyy')}</strong>
					</div>

					<div>
						Published by&nbsp;:&nbsp;
						<strong>Cogoparth</strong>
					</div>
				</div>
			</div>

			<div>
				<Button onClick={() => { setShowModal(true); }}>
					Create
				</Button>

				<Modal
					size="md"
					show={showModal}
					onClose={() => {
						setShowModal(false);
						setMode('');
					}}
					placement="top"
				>
					<Modal.Header title="Create" />
					<Modal.Body className={styles.modal_body}>

						<CreateModal
							mode={mode}
							setMode={setMode}
						/>

					</Modal.Body>

				</Modal>
			</div>

		</div>
	);
}

export default Header;
