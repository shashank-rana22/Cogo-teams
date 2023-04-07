import { Modal, Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import useGetTemplate from '../../../../../hooks/useGetTemplate';

import styles from './styles.module.css';

function TemplateModal({ template = '', setTemplate = () => {} }) {
	const { getTemplateCsv = () => {} } = useGetTemplate();

	const onClose = () => {
		setTemplate('');
	};

	return (
		<Modal size="md" show={template === 'template'} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div className={styles.header}>
					<IcMDownload style={{ margin: '0 4px 0 0' }} />
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
						className={styles.template_button}
					>
						Leads Template

					</Button>
					<Button
						themeType="secondary"
						onClick={() => getTemplateCsv('partner')}
						className={styles.template_button}

					>
						Channel Partner Template

					</Button>
					<Button
						themeType="secondary"
						onClick={() => getTemplateCsv('organization')}
						className={styles.template_button}

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
