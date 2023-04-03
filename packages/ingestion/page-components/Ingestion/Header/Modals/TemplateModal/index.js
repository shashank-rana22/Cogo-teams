import { Modal, Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetTemplate from '../../../../../hooks/useGetTemplate';

import styles from './styles.module.css';

function TemplateModal({ showModal, setShowModal = () => {} }) {
	const [template, setTemplate] = useState('');
	const { loading, getTemplateCsv } = useGetTemplate();

	const onClose = () => {
		setShowModal(false);
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
						onClick={() => getTemplateCsv('lead')}
						style={{ height: '60px', width: '50%' }}
						// disabled={loading}
					>
						Leads Template

					</Button>
					<Button
						themeType="secondary"
						onClick={() => setTemplate('partner')}
						style={{ height: '60px', width: '50%' }}
						// disabled={loading}

					>
						Channel Partner Template

					</Button>
					<Button
						themeType="secondary"
						onClick={() => setTemplate('organization')}
						style={{ height: '60px', width: '50%' }}
						// disabled={loading}

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
