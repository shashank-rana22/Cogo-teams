import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useUpdateQuotationOnBnAmend from '../../../../../hooks/useUpdateQuotationOnBnAmend';

import EditQuotation from './EditQuotation';
import styles from './styles.module.css';

function UpdateQuotation({
	task = {},
	setIsQuotation = () => {},
	newRefetch = () => {},
	updateDocument = () => {},
	documentPayload = {},
	documentUpdateLoading = false,
}) {
	const { shipment_data, servicesList } = useContext(ShipmentDetailContext);

	const quotationData = useUpdateQuotationOnBnAmend({
		servicesList,
		shipment_data,
		task,
		newRefetch,
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
