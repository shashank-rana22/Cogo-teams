import { Loader, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useListCommunications from '../../../../hooks/useListCommunications';

import MailStatus from './MailStatus';
import TemplateModalContent from './TemplateModalContent';

function ViewEmailContent({ taskId = '', taskName = '', onCancel = () => {}, showEmailModal = false }) {
	const { loading, list } = useListCommunications({ taskId });

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
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Loader />
					</div>
				) : (
					<>
						{!isEmpty(list) && <MailStatus list={list} />}

						<TemplateModalContent list={list} />
					</>
				)}

			</Modal.Body>
		</Modal>
	);
}

export default ViewEmailContent;
