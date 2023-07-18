import { Modal, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useListCommunication from '../../../../hooks/useListCommunication';

import MailStatus from './MailStatus';
import styles from './styles.module.css';
import TemplateModalContent from './TemplateModalContent';

function ShowEmailContent({
	taskId = '',
	setTaskId = () => {},
	openView = false,
	setOpenView = () => {},
}) {
	const { list, loading } = useListCommunication({ taskId });

	const handleClose = () => {
		setOpenView(false);
		setTaskId(null);
	};

	const renderContent = () => {
		if (loading) {
			return <div className={styles.loading_state}><Placeholder /></div>;
		}
		return (
			<>
				{!isEmpty(list) && <MailStatus list={list} />}
				<TemplateModalContent list={list} />
			</>
		);
	};

	return (
		<Modal
			className={styles.modal_container}
			show={openView}
			onClose={handleClose}
		>
			<Modal.Header />
			<Modal.Body>
				{renderContent()}
			</Modal.Body>
		</Modal>
	);
}

export default ShowEmailContent;
