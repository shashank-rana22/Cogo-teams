import { Modal, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import CreateModal from './CreateModal';
import Draft from './CreateModal/Draft';
import NewVersion from './CreateModal/NewVersion';
import Published from './CreateModal/Published';
import ModalFooter from './ModalFooter';
import styles from './styles.module.css';

function Header() {
	const [mode, setMode] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [selectedVersion, setSelectedVersion] = useState(0);
	console.log('selected version::', selectedVersion);

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
						setSelectedVersion(0);
					}}
					placement="top"
				>
					<Modal.Header title="Create" />
					<Modal.Body>
						{(() => {
							switch (mode) {
								case 'published-version':
									return (
										<Published
											selectedVersion={selectedVersion}
											setSelectedVersion={setSelectedVersion}
										/>

									);
								case 'saved-draft':
									return (
										<Draft setMode={setMode} setShowModal={setShowModal} />
									);
								case 'new-version':
									return (
										<NewVersion setMode={setMode} setShowModal={setShowModal} />
									);
								default:
									return <CreateModal setMode={setMode} />;
							}
						})()}
					</Modal.Body>

					{mode === 'published-version' ? (
						<Modal.Footer className={styles.test}>
							<ModalFooter
								setMode={setMode}
								setSelectedVersion={setSelectedVersion}
								setShowModal={setShowModal}
								selectedVersion={selectedVersion}
							/>
						</Modal.Footer>
					) : (
						null
					)}
				</Modal>
			</div>

		</div>
	);
}

export default Header;
