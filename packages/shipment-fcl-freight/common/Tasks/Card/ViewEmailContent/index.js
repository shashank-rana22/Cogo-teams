import { Loader, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useListCommunications from '../../../../hooks/useListCommunications';

import MailStatus from './MailStatus';
import styles from './styles.module.css';
import TemplateModalContent from './TemplateModalContent';

function ViewEmailContent({ taskId = '', taskName = '', onCancel = () => {}, showEmailModal = false }) {
	const { loading = false, list = [] } = useListCommunications({ taskId });

	return (
		<Modal
			show={showEmailModal}
			size="md"
			onClose={onCancel}
			onOuterClick={onCancel}
		>
			<Modal.Header title={taskName} />

			<Modal.Body>
				{loading ? (
					<div className={styles.loading_container}>
						<Loader />
					</div>
				) : (
					<>
						{!isEmpty(list) ? <MailStatus list={list} /> : null}

						<TemplateModalContent list={list} />
					</>
				)}

			</Modal.Body>
		</Modal>
	);
}

export default ViewEmailContent;
