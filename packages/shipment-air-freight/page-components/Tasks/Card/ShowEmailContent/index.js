import { Modal } from '@cogoport/components';

import useListCommunication from '../../../../hooks/useListCommunication';

import MailContent from './MailContent';
import styles from './styles.module.css';

function ShowEmailContent({
	taskId = '',
	setTaskId = () => {},
	openView = false,
	setOpenView = () => {},
}) {
	const { list = [], loading = false } = useListCommunication({ taskId });

	const handleClose = () => {
		setOpenView(false);
		setTaskId('');
	};

	return (
		<Modal
			className={styles.modal_container}
			show={openView}
			onClose={handleClose}
			closeOnOuterClick
		>
			<Modal.Header />
			<Modal.Body>
				<MailContent loading={loading} list={list} />
			</Modal.Body>
		</Modal>
	);
}

export default ShowEmailContent;
