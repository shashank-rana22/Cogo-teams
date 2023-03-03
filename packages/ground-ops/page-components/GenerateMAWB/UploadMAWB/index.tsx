import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import Layout from '../../Air/commons/Layout';
import useCreateShipmentDocument from '../GenerateMawbDoc/useCreateShipmentDocument';
import styles from '../styles.module.css';

import { controls } from './controls';

function UploadMAWB({ item, setGenerate }) {
	const { control, handleSubmit, formState: { errors } } = useForm();
	const { upload, loading } = useCreateShipmentDocument({ setGenerate });
	const onSubmit = (formValues) => {
		const fileArr = formValues.document.split('/');
		const payload = {
			shipment_id         : item?.shipmentId,
			uploaded_by_org_id  : item?.serviceProviderId,
			performed_by_org_id : item?.serviceProviderId,
			document_type       : 'draft_airway_bill',
			id                  : item?.documentId,
			service_id          : item?.serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : item?.id,
			state               : 'document_accepted',
			document_url        : formValues.document || undefined,
			data                : {

				status          : 'uploaded',
				document_number : item?.awbNumber,
				service_id      : item?.serviceId,
				service_type    : 'air_freight_service',
				document_url    : formValues.document || undefined,
			},
			documents: [
				{
					data: {

						status          : 'uploaded',
						document_number : item?.awbNumber,
						service_id      : item?.serviceId,
						service_type    : 'air_freight_service',
						document_url    : formValues.document || undefined,
					},
					document_type : 'draft_airway_bill',
					document_url  : formValues.document || undefined,
					file_name     : fileArr[fileArr.length - 1],
				},
			],
		};
		upload({ payload });
	};
	return (
		<div>

			<Layout fields={controls} errors={errors} control={control} />
			<div className={styles.button_container}>
				<div className={styles.button_div}>
					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={loading}
						themeType="accent"
					>
						UPLOAD
					</Button>
				</div>
			</div>

		</div>
	);
}

export default UploadMAWB;
