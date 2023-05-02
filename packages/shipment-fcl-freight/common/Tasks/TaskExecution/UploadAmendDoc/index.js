import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useListDocuments from '../../../../hooks/useListDocuments';
import useUpdateShipmentDocuments from '../../../../hooks/useUpdateShipmentDocuments';
import FormLayout from '../helpers/Layout';
import getDefaultValues from '../utils/get-default-values';

import controls from './controls';
import styles from './styles.module.css';

function UploadAmendDoc({
	task = {},
	onClose = () => {},
	refetch = () => {},
}) {
	const { list, loading } = useListDocuments({
		defaultFilters: {
			shipment_id: task.shipment_id, id: task.task_field_id,
		},
		defaultParams: {
			performed_by_org_id: task.organization_id,
		},
	});

	const newRefetch = () => {
		onClose();
		refetch();
	};

	const { updateDocument } = useUpdateShipmentDocuments({ refetch: newRefetch });

	const allControls = controls(task) || [];
	const details = list?.list?.[0] || {};

	const payloadData = details?.data;
	const requiredObj = {};
	(allControls[0].controls || []).forEach((controlObj) => {
		requiredObj[controlObj.name] = '';
	});
	allControls[0].value = [requiredObj];
	const defaultValues = getDefaultValues(allControls);

	const formProps = useForm({ defaultValues });
	const { control, formState: { errors }, handleSubmit } = formProps;

	const handleSubmitFinal = async (values) => {
		const documentPayloadData = payloadData;
		const finalPayload = {
			shipment_id         : task.shipment_id,
			service_id          : task.service_id,
			service_type        : task.service_type,
			document_type       : task.document_type,
			performed_by_org_id : task.organization_id,
			id                  : list?.list?.[0]?.id,
			pending_task_id     : task.id,
			data                : { ...documentPayloadData, status: 'uploaded' },
			document_url:
				values?.documents?.[0]?.url?.url?.finalUrl || values?.documents?.[0]?.url?.finalUrl,
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
					<div className={styles.remark_head}>{list?.[0]?.remarks}</div>
				</div>
			</div>

			<FormLayout control={control} fields={allControls} errors={errors} />
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
