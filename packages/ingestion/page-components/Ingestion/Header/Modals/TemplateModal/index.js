import { Modal, Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import { BUTTON_MAPPING } from '../../../../../constants/template-mapping';

import styles from './styles.module.css';

function TemplateModal({ getTemplateCsv = () => {}, template = '', setTemplate = () => {} }) {
	const onClose = () => {
		setTemplate('');
	};

	return (
		<Modal scroll={false} size="md" show={template === 'template'} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div className={styles.header}>
					<IcMDownload style={{ margin: '0 4px 0 0' }} />
					Download Templates
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.template_container}>
					<div className={styles.heading}>Download Template for leads</div>
					<div className={styles.container}>

						{
						BUTTON_MAPPING.map((item) => (
							<Button
								key={item.name}
								themeType="secondary"
								onClick={() => getTemplateCsv(item?.name)}
								style={{ width: '50%', height: '60px' }}
							>
								{item?.name}

							</Button>
						))
					}

					</div>

				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TemplateModal;
