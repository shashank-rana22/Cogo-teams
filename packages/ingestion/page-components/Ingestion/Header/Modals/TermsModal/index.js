import { Modal, Button } from '@cogoport/components';
import { IcMFtick } from '@cogoport/icons-react';

import { TERMS_MAPPING } from '../../../../../constants/terms-mapping';

import styles from './styles.module.css';

function TermsModal({ template = '', setTemplate = () => {}, setShow = () => {} }) {
	const onAgree = () => {
		setTemplate('');

		setShow({
			open       : true,
			activeMode : 'chooseModal',
		});
	};
	const onClose = () => {
		setTemplate('');
	};
	return (
		<Modal scroll={false} size="xl" show={template === 'terms'} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMFtick style={{ margin: '0 4px 0 0' }} />
					Terms and Conditions
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.template_container}>
					<div className={styles.container}>

						<div>
							<b style={{ padding: '4px 16px' }}>
								{
							TERMS_MAPPING.headers
						}
							</b>
							<ul>
								{TERMS_MAPPING.points.map((item) => <li>{item}</li>)}
							</ul>
						</div>

					</div>

				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button style={{ marginRight: '8px' }} themeType="secondary" onClick={onClose}>Close</Button>
				<Button themeType="primary" onClick={onAgree}>Agree</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TermsModal;
