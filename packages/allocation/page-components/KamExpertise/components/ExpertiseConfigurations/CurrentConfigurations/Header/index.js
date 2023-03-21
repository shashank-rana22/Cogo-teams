import { Modal, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import CreateModal from './CreateModal';
import Draft from './CreateModal/Draft';
import NewVersion from './CreateModal/NewVersion';
import Published from './CreateModal/Published';
import ModalFooter from './ModalFooter';
import styles from './styles.module.css';

function Header({ setSelectedVersion, selectedVersion, audit_data, version_details }) {
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
						{audit_data?.version || '--'}
					</strong>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.left_text}>
						Published On
						{' '}
						:
						{' '}
						<strong>{format(audit_data.published_date, 'dd MMM yyyy')}</strong>
					</div>

					<div>
						Published by
						{' '}
						:
						{' '}
						<strong>{audit_data?.published_by || '--'}</strong>
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
						setSelectedVersion('');
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
											version_details={version_details}
										/>

									);
								case 'saved-draft':
									return (
										<Draft
											setMode={setMode}
											setShowModal={setShowModal}
											setSelectedVersion={setSelectedVersion}
										/>
									);
								case 'new-version':
									return (
										<NewVersion
											setMode={setMode}
											setShowModal={setShowModal}
											setSelectedVersion={setSelectedVersion}
										/>
									);
								default:
									return (
										<CreateModal
											setMode={setMode}
											setSelectedVersion={setSelectedVersion}
										/>
									);
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
