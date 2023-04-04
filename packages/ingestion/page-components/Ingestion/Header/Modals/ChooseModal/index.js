import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ChooseModal({ setShow = () => {}, show = '', setUploadData = () => {}, uploadData = {} }) {
	const onClose = () => {
		setShow('');
	};

	const NEXT_PAGE_MAPPING = {
		organization : 'orgDetails',
		partner      : 'providerSelect',
		lead         : 'providerSelect',
	};

	const IS_CP_MAPPING = {
		organization : false,
		partner      : true,
		lead         : null,
	};

	const onChoose = (type) => {
		setShow(NEXT_PAGE_MAPPING[type]);

		setUploadData({
			...uploadData,
			ingestion_type     : type,
			is_channel_partner : IS_CP_MAPPING[type],
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
			<div>
				<div className={styles.choose_heading}>What do you wish to upload CSV for?</div>
				<div className={styles.choose_container}>
					<Button
						themeType="secondary"
						onClick={() => onChoose('lead')}
						style={{ height: '60px', width: '50%' }}
					>
						Lead

					</Button>
					<Button
						themeType="secondary"
						onClick={() => onChoose('partner')}
						style={{ height: '60px', width: '50%' }}
					>
						Channel Partner

					</Button>
					<Button
						themeType="secondary"
						onClick={() => onChoose('organization')}
						style={{ height: '60px', width: '50%' }}

					>
						Importer Exporter
					</Button>
				</div>
				<div className={styles.close_button}>
					<Button themeType="secondary" onClick={onClose}>Close</Button>

				</div>
			</div>

		</Modal>
	);
}

export default ChooseModal;
