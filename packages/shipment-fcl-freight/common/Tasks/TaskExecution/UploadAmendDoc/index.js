import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/ocean-modules';
import React, { useContext, useMemo } from 'react';

import useListDocuments from '../../../../hooks/useListDocuments';
import useUpdateShipmentDocuments from '../../../../hooks/useUpdateShipmentDocuments';
import getDefaultValues from '../utils/get-default-values';

import controls from './controls';
import styles from './styles.module.css';

const REQUIRED_OBJ = {};

function UploadAmendDoc({
	task = {},
	onClose = () => {},
	refetch = () => {},
}) {
	const { list = {}, loading = true } = useListDocuments({
		defaultFilters: {
			shipment_id: task.shipment_id, id: task.task_field_id,
		},
		defaultParams: {
			performed_by_org_id: task.organization_id,
		},
	});

	const { primary_service } = useContext(ShipmentDetailContext);
	const movementDetails = primary_service?.movement_details || [];

	const keysForMovementDetails = useMemo(() => Array(movementDetails.length)
		.fill(null).map(() => Math.random()), [movementDetails.length]);

	const newRefetch = () => {
		onClose();
		refetch();
	};

	const { updateDocument } = useUpdateShipmentDocuments({ refetch: newRefetch });

	const allControls = controls(task) || [];
	const details = list.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const payloadData = details?.data;
	(allControls[GLOBAL_CONSTANTS.zeroth_index].controls || []).forEach((controlObj) => {
		REQUIRED_OBJ[controlObj.name] = '';
	});
	allControls[GLOBAL_CONSTANTS.zeroth_index].value = [REQUIRED_OBJ];
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
			id                  : details?.id,
			pending_task_id     : task.id,
			data                : { ...documentPayloadData, status: 'uploaded' },
			document_url:
				values?.documents?.[GLOBAL_CONSTANTS.zeroth_index]?.url?.url?.finalUrl
				|| values?.documents?.[GLOBAL_CONSTANTS.zeroth_index]?.url?.finalUrl
				|| values?.documents?.[GLOBAL_CONSTANTS.zeroth_index]?.url,
			documents: (values.documents || []).map((documentData) => ({
				file_name    : documentData?.url?.fileName || documentData?.name,
				document_url : documentData?.url?.url?.finalUrl || documentData?.url?.finalUrl
					|| values?.documents?.[GLOBAL_CONSTANTS.zeroth_index]?.url,
				data: {
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
			<div className={styles.movement_details}>
				<p className={styles.remark}>
					<b>Remarks: </b>
					<span>{details?.remarks}</span>
				</p>
				{movementDetails.map((movement_detail, index) => (
					<React.Fragment key={keysForMovementDetails[index]}>
						<p>
							<b>Vessel: </b>
							{movement_detail?.vessel}
						</p>
						<p>
							<b>Voyage: </b>
							{movement_detail?.voyage}
						</p>
					</React.Fragment>
				))}
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
