import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import React from 'react';

import useUpdateBulkServices from '../../../../../hooks/useUpdateBulkServices';
import useUpdateTask from '../../../../../hooks/useUpdateTask';
import getDefaultValues from '../../utils/get-default-values';

import customTaskControls from './controls';
import styles from './styles.module.css';
import getImporterExporter from './utils/getImporterExporter';

function CustomerInvoiceDetails(props) {
	const { shipment_data, onCancel, task, refetch, servicesList = [], getShipmentTimeline = () => {} } = props;

	const importerExporterName = shipment_data?.importer_exporter?.business_name;

	const importExporterNameMapped = getImporterExporter[importerExporterName] || '';

	const fields = customTaskControls[importExporterNameMapped] || [];

	const defaultValues = getDefaultValues(fields);

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

	const { loading, bulkUpdate } = useUpdateBulkServices({});

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
		if (importExporterNameMapped.length) {
			await bulkUpdate(finalValues);
		}
		await apiTrigger(taskData);
	};

	return (
		<div>
			<div className={styles.form}>
				<Layout
					control={control}
					fields={fields}
					errors={errors}
				/>
			</div>
			<div className={styles.button_container}>
				<Button
					onClick={() => onCancel()}
					themeType="secondary"
					disabled={loading || taskLoading}
					className={styles.button}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					themeType="primary"
					disabled={loading || taskLoading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default CustomerInvoiceDetails;
