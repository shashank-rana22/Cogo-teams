import React from 'react';
import { Modal, Skeleton } from '@cogoport/front/components/admin';
import TemplateModalContent from './TemplateModalContent';
import MailStatus from './MailStatus';
import useListCommunication from '../../../../hooks/useListCommunication';

const ShowEmail = ({
	setTaskId = () => {},
	setShowTemp = () => {},
	showTemp = false,
	taskId = '',
}) => {
	const { list, loading } = useListCommunication({ taskId });

	const handleClose = () => {
		setShowTemp(false);
		setTaskId(null);
	};

	const renderContent = () => {
		if (loading) {
			return <Skeleton height="40px" width="400px" margin="20px" />;
		}
		return (
			<>
				{list?.length > 0 && <MailStatus list={list} />}

				<TemplateModalContent list={list} />
			</>
		);
	};

	return (
		<Modal
			show={showTemp}
			className="primary sm"
			onClose={handleClose}
			onOuterClick={handleClose}
		>
			{renderContent()}
		</Modal>
	);
};

export default ShowEmail;
