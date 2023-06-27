import { Layout } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useListShipmentDocuments from '../../../../hooks/useListShipmentDocuments';
import useUpdateShipmentDocuments from '../../../../hooks/useUpdateShipmentDocuments';
import getDefaultValues from '../utils/get-default-values';

import controls from './controls';
import styles from './styles.module.css';

function UploadAmendDoc({
	task = {},
	onClose = () => {},
	refetch = () => {},
}) {
	const { data = {}, loading = true } = useListShipmentDocuments({
		defaultFilters: {
			shipment_id: task.shipment_id, id: task.task_field_id,
		},
		defaultParams: {
			service_type: task?.service_type,
		},
	});

	const newRefetch = () => {
		onClose();
		refetch();
	};

	const { updateDocument } = useUpdateShipmentDocuments({ refetch: newRefetch });

	const allControls = controls(task) || [];

	const details = data.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const payloadData = details?.data;

	const REQUIRED_OBJ = {};
	(allControls[GLOBAL_CONSTANTS.zeroth_index].controls || [])
		.forEach((controlObj) => { REQUIRED_OBJ[controlObj.name] = ''; });

	allControls[GLOBAL_CONSTANTS.zeroth_index].value = [REQUIRED_OBJ];

	const defaultValues = getDefaultValues(allControls);

	const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });

	const handleSubmitFinal = (values) => {
		const documentPayloadData = payloadData || {};

		const finalPayload = {
			shipment_id         : task.shipment_id,
			service_id          : task.service_id,
			service_type        : task.service_type,
			document_type       : task.document_type,
			performed_by_org_id : task.organization_id,
			id                  : details?.id,
			pending_task_id     : task.id,
			data                : { ...documentPayloadData, status: 'uploaded' },
			document_url        : values?.documents?.[GLOBAL_CONSTANTS.zeroth_index]
				?.url?.url?.finalUrl || values?.documents?.[GLOBAL_CONSTANTS.zeroth_index]?.url?.finalUrl,
			documents: (values.documents || []).map((documentData) => ({
				file_name    : documentData?.url?.fileName || documentData?.name,
				document_url : documentData?.url?.url?.finalUrl || documentData?.url?.finalUrl,
				data         : {
					...documentData,
					status   : 'uploaded',
					price    : documentData?.amount?.price || undefined,
					currency : documentData?.amount?.currency || undefined,
				},
			})),
		};

		updateDocument(finalPayload);
	};

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div className={styles.remark}>
					<div className={styles.remark_head}>Remarks:</div>
					<div className={styles.remark_head}>{details?.remarks}</div>
				</div>
			</div>

			<Layout control={control} fields={allControls} errors={errors} />

			<div className={styles.button_wrap}>
				<Button
					onClick={handleSubmit(handleSubmitFinal)}
					disabled={loading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default UploadAmendDoc;
