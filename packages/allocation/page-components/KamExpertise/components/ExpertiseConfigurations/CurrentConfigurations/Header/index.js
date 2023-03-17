import { Modal, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import CreateModal from './CreateModal';
import styles from './styles.module.css';

const HEADER_DATA = {
	version        : '3',
	published_date : new Date(),
	published_by   : 'Cogoparth',
};

function Header() {
	const [mode, setMode] = useState('');
	const [showModal, setShowModal] = useState(false);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>
					Live Configuration
					{' '}
					:
					{' '}
					<strong>
						Version
						{' '}
						{HEADER_DATA.version}
					</strong>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.left_text}>
						Published On
						{' '}
						:
						{' '}
						<strong>{format(HEADER_DATA.published_date, 'dd MMM yyyy')}</strong>
					</div>

					<div>
						Published by
						{' '}
						:
						{' '}
						<strong>{HEADER_DATA.published_by}</strong>
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
