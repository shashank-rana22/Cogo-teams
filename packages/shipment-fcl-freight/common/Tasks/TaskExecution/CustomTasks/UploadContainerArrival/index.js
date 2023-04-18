import { Button } from '@cogoport/components';
import React from 'react';

import useContainerArrival from '../../../../../hooks/useContainerArrival';
import TaskContainer from '../common/TaskContainer';

import UploadCargoArrivalDocument from './UploadCargoArrivalDocument';
import UploadCargoArrivalForm from './UploadCargoArrivalForm';

function UploadContainerArrival({ pendingTask, summary, refetch, clearTask }) {
	const {
		savedData,
		switchToUpload,
		toggleTab,
		shipmentDoc,
		setShipmentDoc,
		show,
		setShow,
		setSavedData,
		setShowDocument,
		showDocument,
	} = useContainerArrival({
		pendingTask,
	});

	return (
		<TaskContainer
			loading={false}
			pendingTask={pendingTask}
			actions={(
					!savedData ? (
						<Button
							onClick={switchToUpload}
						>
							{toggleTab ? 'Switch to Create' : 'Switch to Upload'}
						</Button>
					) : null
			)}
		>
			{toggleTab && !savedData ? (
				<UploadCargoArrivalDocument
					pendingTask={pendingTask}
					refetch={refetch}
					shipmentDoc={shipmentDoc}
					setShipmentDoc={setShipmentDoc}
					setShowDocument={setShowDocument}
					showDocument={showDocument}
					clearTask={clearTask}
				/>
			) : null}

			{!toggleTab ? (
				<UploadCargoArrivalForm
					savedData={savedData}
					summary={summary}
					show={show}
					setShow={setShow}
					setSavedData={setSavedData}
					pendingTask={pendingTask}
					refetch={refetch}
					clearTask={clearTask}
					shipmentDoc={shipmentDoc}
					setShipmentDoc={setShipmentDoc}
				/>
			) : null}
		</TaskContainer>
	);
}

export default UploadContainerArrival;
