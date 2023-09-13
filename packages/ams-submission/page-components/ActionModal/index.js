import { Modal, Button } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const CONTENT_MAPPING = {
	submit_lms_data : 'submit LMS Data',
	amend           : 'Amend',
	send_email      : 'Send Email',
};

function ActionModal({
	modalData = {},
	setModalData = () => {},
}) {
	return (
		<Modal
			size="sm"
			className={styles.modal_container}
			show={!isEmpty(modalData)}
		>
			<div><IcCError width={40} height={50} /></div>
			<div className={styles.content}>
				Are you sure you want to
				{' '}
				{CONTENT_MAPPING[modalData?.type]}
				?
			</div>
			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					onClick={() => setModalData({})}
				>
					Cancel

				</Button>
				<Button
					onClick={() => setModalData({})}
				>
					Confirm

				</Button>
			</div>
		</Modal>
	);
}

export default ActionModal;
