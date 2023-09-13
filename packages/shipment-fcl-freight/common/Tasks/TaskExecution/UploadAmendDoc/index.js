import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext, useMemo } from 'react';

import useListDocuments from '../../../../hooks/useListDocuments';
import useUpdateShipmentDocuments from '../../../../hooks/useUpdateShipmentDocuments';
import getDefaultValues from '../utils/get-default-values';
import isFileUploaded from '../utils/isFileUploaded';

import controls from './controls';
import styles from './styles.module.css';
import UpdateQuotation from './UpdateQuotation';

const REQUIRED_OBJ = {};

function UploadAmendDoc({
	task = {},
	onClose = () => {},
	refetch = () => {},
}) {
	const { primary_service = {} } = useContext(ShipmentDetailContext);

	const isAmendBookingNote = task?.task === 'amend_booking_note';

	const [isQuotation, setIsQuotation] = useState(false);
	const [documentPayload, setDocumentPayload] = useState({});

	const { list = {}, loading = true } = useListDocuments({
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

	const { taskUpdateLoading, updateDocument } = useUpdateShipmentDocuments({
		refetch: newRefetch,
	});

	const movementDetails = primary_service?.movement_details || [];
	const keysForMovementDetails = useMemo(() => Array(movementDetails.length)
		.fill(null).map(() => Math.random()), [movementDetails.length]);

	const allControls = controls(task) || [];
	const details = list.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const payloadData = details?.data;
	(allControls[GLOBAL_CONSTANTS.zeroth_index].controls || []).forEach((controlObj) => {
		REQUIRED_OBJ[controlObj.name] = '';
	});
	allControls[GLOBAL_CONSTANTS.zeroth_index].value = [REQUIRED_OBJ];
	const defaultValues = getDefaultValues(allControls);

	const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });

	const handleSubmitFinal = async (values) => {
		if (!isFileUploaded(values)) return null;

		const payload = {
			shipment_id         : task?.shipment_id,
			service_id          : task?.service_id,
			service_type        : task?.service_type,
			document_type       : task?.document_type,
			performed_by_org_id : task?.organization_id,
			id                  : details?.id,
			pending_task_id     : task?.id,
			data                : { ...payloadData, status: 'uploaded' },
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

		if (isAmendBookingNote) {
			setDocumentPayload(payload);
			setIsQuotation(true);
		} else {
			updateDocument(payload);
		}

		return null;
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

			{isQuotation && !isEmpty(documentPayload) ? (
				<UpdateQuotation
					task={task}
					setIsQuotation={setIsQuotation}
					updateDocument={updateDocument}
					documentPayload={documentPayload}
					documentUpdateLoading={taskUpdateLoading}
					onClose={onClose}
					refetch={refetch}
				/>
			) : (
				<>
					<Layout control={control} fields={allControls} errors={errors} />
					<div className={styles.button_wrap}>
						<Button themeType="secondary" onClick={() => onClose()}>Close</Button>
						<Button
							onClick={handleSubmit(handleSubmitFinal)}
							disabled={loading}
						>
							{isAmendBookingNote ? 'Next' : 'Submit'}
						</Button>
					</div>
				</>
			)}

		</div>
	);
}

export default UploadAmendDoc;
