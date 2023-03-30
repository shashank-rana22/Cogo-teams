import { Modal, Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function TemplateModal({ showModal, setShowModal = () => {} }) {
	const onClose = () => {
		setShowModal(false);
	};

	const onChoose = () => {

	};
	return (
		<Modal size="md" show={showModal} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMDownload style={{ margin: '0 4px 0 0' }} />
					{' '}
					Download Templates
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.heading}>Download Templates among the following</div>
				<div className={styles.container}>
					<Button
						themeType="secondary"
						onClick={() => onChoose('lead')}
						style={{ height: '60px', width: '50%' }}
					>
						Leads Template

					</Button>
					<Button
						themeType="secondary"
						onClick={() => onChoose('cp')}
						style={{ height: '60px', width: '50%' }}
					>
						Channel Partner Template

					</Button>
					<Button
						themeType="secondary"
						onClick={() => onChoose('ie')}
						style={{ height: '60px', width: '50%' }}
					>
						Importer Exporter Template
					</Button>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" onClick={onClose}>Close</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default TemplateModal;
