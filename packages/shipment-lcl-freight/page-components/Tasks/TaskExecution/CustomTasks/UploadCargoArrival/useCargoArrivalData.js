import { useState } from 'react';

const useCargoArrivalData = () => {
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
		setShowDocument,
		showDocument,
	};
};

export default useCargoArrivalData;
