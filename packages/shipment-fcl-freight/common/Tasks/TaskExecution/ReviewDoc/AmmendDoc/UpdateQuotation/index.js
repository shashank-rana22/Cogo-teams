import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetStepThreeData from '../../../CustomTasks/UploadBookingNote/helpers/useGetStep3Data';

import EditQuotation from './EditQuotation';
import styles from './styles.module.css';

function UpdateQuotation({ task = {}, setIsQuotation = () => {}, onClose = () => {} }) {
	const { primary_service, shipment_data, servicesList } = useContext(ShipmentDetailContext);

	const quotationData = useGetStepThreeData({
		primary_service,
		servicesList,
		shipment_data,
		task,
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
			setIsQuotation={setIsQuotation}
			shipment_id={task?.shipment_id}
			loading={quotationLoading}
			onClose={onClose}
		/>
	);
}

export default UpdateQuotation;
