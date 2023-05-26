import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import React from 'react';

import useBulkUpdate from '../../../../../hooks/useBulkUpdate';
import useUpdateTask from '../../../../../hooks/useUpdateTask';
import getDefaultValues from '../../utils/get-default-values';

import customTaskControls from './controls';
import styles from './styles.module.css';
import getImporterExporter from './utils/getImporterExporter';

function CustomerInvoiceDetails(props) {
	const { shipment_data, onCancel, task, refetch, servicesList = [], getShipmentTimeline = () => {} } = props;

	console.log('shipment data', shipment_data, servicesList);
	const importerExporterName = shipment_data?.importer_exporter?.business_name;

	const importExporterNameMapped = getImporterExporter[importerExporterName] || '';

	const fields = customTaskControls[importExporterNameMapped] || [];

	const defaultValues = getDefaultValues(fields);
	console.log('values', fields, defaultValues);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });

	const taskRefetch = () => {
		onCancel();
		refetch();
		getShipmentTimeline();
	};
	const { taskLoading, apiTrigger } = useUpdateTask({
		refetch: taskRefetch,
	});

	const { loading, handleBulkUpdate } = useBulkUpdate({});

	const service_id = servicesList.find(
		(service) => service?.service_type === 'ftl_freight_service'
			&& service?.main_service_id === null,
	)?.id;

	const onSubmit = async (values) => {
		const finalValues = {
			service      : 'ftl_freight',
			service_data : [{ service_id, data: values }],
		};
		const taskData = {
			id     : task?.id,
			status : 'completed',
		};
		if(importExporterNameMapped.length){
			await handleBulkUpdate(finalValues);
		}
		await apiTrigger(taskData);
	};

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={fields}
				errors={errors}
			/>
			<div className={styles.button_div}>
				<Button
					onClick={() => onCancel()}
					className="secondary lg"
					style={{ marginRight: 10 }}
					disabled={loading || taskLoading}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					className="primary lg"
					disabled={loading || taskLoading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default CustomerInvoiceDetails;
