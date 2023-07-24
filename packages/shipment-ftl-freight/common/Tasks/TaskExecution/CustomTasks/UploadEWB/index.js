import { Button, Toast } from '@cogoport/components';
import { Layout } from '@cogoport/surface-modules';

import useBulkUpdate from './hooks/useBulkUpdate';
import { useFieldArrayData } from './hooks/useFieldArrayData';
import styles from './styles.module.css';

const STATUS_CODE = 200;

function UploadEWB({
	shipment_data = {},
	onCancel = () => {},
	task = {},
	services = [],
	refetch = () => {},
}) {
	const { fields, control, errors, handleSubmit } = useFieldArrayData({
		services,
		shipment_data,
	});

	const { loading, bulkShipmentLoading, handleBulkPayload, handlePendingTask } = useBulkUpdate();

	const submitTask = async (val) => {
		const response = await handleBulkPayload({ val, shipment_data });
		if (response?.status === STATUS_CODE) {
			const taskResponse = await handlePendingTask({ val, task });
			if (taskResponse?.status === STATUS_CODE) {
				Toast.success('Task Completed Successfully');
				refetch();
				onCancel();
			}
		}
	};

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={fields}
				errors={errors}
				themeType="admin"
			/>
			<div className={styles.button_wrap}>
				<Button
					onClick={() => onCancel()}
					className="secondary md"
					style={{ marginRight: '10px' }}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit(submitTask)}
					className="primary md"
					disabled={loading || bulkShipmentLoading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default UploadEWB;
