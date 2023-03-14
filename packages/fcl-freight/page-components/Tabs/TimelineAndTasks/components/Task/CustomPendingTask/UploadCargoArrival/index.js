import { Button } from '@cogoport/front/components/admin';
import TaskContainer from '../commons/TaskContainer';
import UploadCargoArrivalDocument from './UploadCargoArrivalDocument';
import UploadCargoArrivalForm from './UploadCargoArrivalForm';
import useCargoArrival from '../../../../hooks/useCargoArrival';

const UploadCargoArrival = ({ pendingTask, summary, refetch, clearTask }) => {
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
	} = useCargoArrival({
		pendingTask,
	});

	return (
		<TaskContainer
			loading={false}
			pendingTask={pendingTask}
			actions={
				<>
					{!savedData ? (
						<Button
							style={{ height: '24px' }}
							id="toggle_button_cargo_arrival"
							onClick={switchToUpload}
						>
							{toggleTab ? 'Switch to Create' : 'Switch to Upload'}
						</Button>
					) : null}
				</>
			}
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
};

export default UploadCargoArrival;
