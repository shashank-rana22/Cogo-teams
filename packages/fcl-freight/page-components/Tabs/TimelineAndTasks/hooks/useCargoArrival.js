import { useState } from 'react';
import checkConditionForTask from '../utils/checkConditionForTask';
import taskCompletionString from '../utils/taskCompletionString';

const useCargoArrival = () => {
	const [shipmentDoc, setShipmentDoc] = useState([]);

	const [toggleTab, setToggleTab] = useState(1);

	const [savedData, setSavedData] = useState(null);
	const [show, setShow] = useState(false);
	const [showDocument, setShowDocument] = useState(true);

	const switchToUpload = () => {
		const toggleTemp = 1 - toggleTab;
		setToggleTab(toggleTemp);
	};

	return {
		savedData,
		switchToUpload,
		toggleTab,
		shipmentDoc,
		setShipmentDoc,
		show,
		setShow,
		setSavedData,
		checkConditionForTask,
		taskCompletionString,
		setShowDocument,
		showDocument,
	};
};

export default useCargoArrival;
