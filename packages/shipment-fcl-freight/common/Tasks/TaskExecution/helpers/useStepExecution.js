import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useContext, useState, useEffect } from 'react';

import getBlUploadRestrictMessage from '../utils/get-bl-upload-restrict-message';
import getDefaultValues from '../utils/get-default-values';
import injectForm from '../utils/inject-form';
import injectValues from '../utils/inject-Values';
import populateControls from '../utils/populate-controls';

function useStepExecution({
	task = {},
	stepConfig = {},
	getApisData = {},
	selectedMail = {},
	allCommodity,

	options,
}) {
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);
	const [restrictTask, setRestrictTask] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [commodityUnit, setCommodityUnit] = useState({});
	const populatedControls = populateControls(stepConfig.controls);

	const valueInjectedControls = injectValues({
		selectedMail,
		populatedControls,
		task,
		getApisData,
		shipment_data,
		stepConfig,
		setCommodityUnit,
		primary_service,
	});

	const defaultValues = getDefaultValues(valueInjectedControls);

	const formProps = useForm({ defaultValues });

	const formValues = formProps?.watch();

	const { controls, showElements } = injectForm({
		stepConfig,
		formProps,
		formValues,
		task,
		shipment_data,
		getApisData,
		options,
		allCommodity,
		commodityUnit,
	});

	let isUploadAllowed = true;

	if (task?.task === 'upload_bill_of_lading') {
		isUploadAllowed = (getApisData?.list_shipment_documents || [])
			.filter((item) => item?.state !== 'document_rejected')
			?.every((doc) => doc.state === 'document_accepted');
	}

	useEffect(() => {
		if (!isUploadAllowed) {
			const blState = getApisData?.list_shipment_documents?.map(
				(item) => item?.state,
			);

			setToastMessage(getBlUploadRestrictMessage({ blState }));

			setRestrictTask(true);
		}
	}, [isUploadAllowed, getApisData?.list_shipment_documents]);

	return {
		fields: controls,
		formProps,
		showElements,
		restrictTask,
		toastMessage,
		setRestrictTask,
	};
}
export default useStepExecution;
