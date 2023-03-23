import { Button, Modal } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import CreateModal from './CreateModal';
import Draft from './CreateModal/Draft';
import NewVersion from './CreateModal/NewVersion';
import Published from './CreateModal/Published';
import ModalFooter from './ModalFooter';
import styles from './styles.module.css';

const CONSTANT_KEYS = {
	PUBLISHED_VERSION : 'published-version',
	SAVED_DRAFT       : 'saved-draft',
	NEW_VERSION       : 'new-version',
	INITIAL_MODE      : 'initial-mode',
};

const { PUBLISHED_VERSION, SAVED_DRAFT, NEW_VERSION, INITIAL_MODE } = CONSTANT_KEYS;

const CREATE_CONFIGURATION_MAPPING = {
	[PUBLISHED_VERSION] : Published,
	[SAVED_DRAFT]       : Draft,
	[NEW_VERSION]       : NewVersion,
	[INITIAL_MODE]      : CreateModal,
};

function Header({ setSelectedVersion, selectedVersion, audit_data = {}, LIVE_VERSION, data = [] }) {
	const [mode, setMode] = useState('initial-mode');
	const [showModal, setShowModal] = useState(false);

	const componentProps = {
		[PUBLISHED_VERSION]: {
			selectedVersion,
			setSelectedVersion,
			data,
		},
		[SAVED_DRAFT]: {
			setMode,
			setShowModal,
			setSelectedVersion,
		},
		[NEW_VERSION]: {
			setMode,
			setShowModal,
			setSelectedVersion,
		},
		[INITIAL_MODE]: {
			setMode,
			setSelectedVersion,
		},
	};

	const Component = CREATE_CONFIGURATION_MAPPING[mode] || null;

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
						{LIVE_VERSION || ''}
					</strong>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.left_text}>
						Published On
						{' '}
						:
						{' '}
						<strong>
							{ audit_data.updated_at
								? format(audit_data.updated_at, 'dd MMM yyyy') : ''}

						</strong>
					</div>

					<div>
						Published by
						{' '}
						:
						{' '}
						<strong>{audit_data?.name || ''}</strong>
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
						setMode('initial-mode');
						setSelectedVersion('');
					}}
					placement="top"
				>
					<Modal.Header title="Create" />
					<Modal.Body>
						{Component && (
							<Component
								key={mode}
								{...(componentProps[mode] || {})}
							/>
						)}
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
					)
						: null}
				</Modal>
			</div>

		</div>
	);
}

export default Header;
