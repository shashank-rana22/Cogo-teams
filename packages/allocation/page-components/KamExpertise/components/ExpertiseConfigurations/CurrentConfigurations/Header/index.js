import { Toast, Modal, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import CreateModal from './CreateModal';
import Draft from './CreateModal/Draft';
import NewVersion from './CreateModal/NewVersion';
import Published from './CreateModal/Published';
import styles from './styles.module.css';

const HEADER_DATA = {
	version        : '3',
	published_date : new Date(),
	published_by   : 'Cogoparth',
};

function Header() {
	const [mode, setMode] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [selectedVersion, setSelectedVersion] = useState();
	console.log('selected version::', selectedVersion);

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
						<Modal.Footer>
							<Button
								themeType="teritiary"
								className={styles.button}
								onClick={() => { setMode(''); }}
							>
								Back

							</Button>
							{selectedVersion ? (
								<Button
									className={styles.button}
									onClick={() => {
										setShowModal(false);
										setMode('');
										Toast.success('Version Selected');
										setSelectedVersion('');
									}}
								>
									Create
								</Button>
							) : (<Button disabled={!selectedVersion}>Create</Button>)}

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
