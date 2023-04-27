import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import Layout from '../../Air/commons/Layout';
import useCreateShipmentDocument from '../GenerateMawbDoc/useCreateShipmentDocument';
import styles from '../styles.module.css';

import { controls } from './controls';

function UploadMAWB({
	item, edit, setEdit, setGenerate, activeCategory, activeHawb, hawbDetails, setHawbDetails, setActiveHawb,
}) {
	const { control, handleSubmit, formState: { errors } } = useForm();
	const { upload, loading } = useCreateShipmentDocument({
		edit,
		setEdit,
		setGenerate,
		activeCategory,
		activeHawb,
		hawbDetails,
		setHawbDetails,
		setActiveHawb,
	});
	const onSubmit = (formValues) => {
		const { fileName, finalUrl } = formValues?.document || {};
		const payload = {
			shipment_id         : item?.shipmentId,
			uploaded_by_org_id  : item?.serviceProviderId,
			performed_by_org_id : item?.serviceProviderId,
			document_type       : activeCategory === 'mawb' ? 'draft_airway_bill' : 'draft_house_airway_bill',
			id                  : item?.documentId,
			service_id          : item?.serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : item?.id,
			state               : 'document_accepted',
			document_url        : finalUrl,
			data                : {

				status          : 'uploaded',
				document_number : item?.awbNumber,
				service_id      : item?.serviceId,
				service_type    : 'air_freight_service',
				document_url    : finalUrl,
			},
			documents: [
				{
					data: {

						status          : 'uploaded',
						document_number : item?.awbNumber,
						service_id      : item?.serviceId,
						service_type    : 'air_freight_service',
						document_url    : finalUrl,
					},
					document_type : activeCategory === 'mawb' ? 'draft_airway_bill' : 'draft_house_airway_bill',
					document_url  : finalUrl,
					file_name     : fileName,
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
