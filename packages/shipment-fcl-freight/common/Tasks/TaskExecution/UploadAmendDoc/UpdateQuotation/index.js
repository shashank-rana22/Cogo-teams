import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetStepThreeData from '../../CustomTasks/UploadBookingNote/helpers/useGetStep3Data';

import EditQuotation from './EditQuotation';
import styles from './styles.module.css';

function UpdateQuotation({
	task = {},
	setIsQuotation = () => {},
	updateDocument = () => {},
	documentPayload = {},
	documentUpdateLoading = false,
	onClose = () => { },
	refetch = () => {},
}) {
	const { shipment_data = {}, servicesList = [] } = useContext(ShipmentDetailContext);

	const quotationData = useGetStepThreeData({
		servicesList,
		shipment_data,
		task,
		onCancel        : onClose,
		taskListRefetch : refetch,
	});

	const { serviceQuotationLoading = true, loading: quotationLoading = false } = quotationData || {};

	if (serviceQuotationLoading) {
		return (
			<div className={styles.loading_container}>
				<Loader className={styles.loading} />
				Loading Quotation Data
			</div>
		);
	}

	return (
		<EditQuotation
			data={quotationData}
			shipment_id={task?.shipment_id}
			loading={quotationLoading || documentUpdateLoading}
			setIsQuotation={setIsQuotation}
			updateDocument={updateDocument}
			documentPayload={documentPayload}
		/>
	);
}

export default UpdateQuotation;
