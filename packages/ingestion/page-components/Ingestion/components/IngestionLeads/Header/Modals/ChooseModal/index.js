import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ChooseModal({ setShow = () => {}, show = '', setIngestionData = () => {}, ingestionData = {} }) {
	const onClose = () => {
		setShow('');
	};

	// const onIE = () => {

	// 	setIngestionData({
	// 		...ingestionData,
	// 		finalModalHeading: 'Upload for Import Export',
	// 	});
	// };

	const NEXT_PAGE_MAPPING = {
		ie   : 'orgDetails',
		cp   : 'providerSelect',
		lead : 'providerSelect',
	};

	const onChoose = (type) => {
		setShow(NEXT_PAGE_MAPPING[type]);

		setIngestionData({
			...ingestionData,
			option1: type,
		});
	};

	return (
		<Modal size="md" show={show === 'chooseModal'} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					{' '}
					Upload CSV
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.choose_heading}>What do you wish to upload CSV for?</div>
				<div className={styles.choose_container}>
					<Button
						themeType="secondary"
						onClick={() => onChoose('lead')}
						style={{ height: '60px' }}
					>
						Lead

					</Button>
					<Button
						themeType="secondary"
						onClick={() => onChoose('cp')}
						style={{ height: '60px' }}
					>
						Channel Partner

					</Button>
					<Button
						themeType="secondary"
						onClick={() => onChoose('ie')}
						style={{ height: '60px' }}

					>
						Importer Exporter
					</Button>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" onClick={onClose}>Close</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default ChooseModal;
