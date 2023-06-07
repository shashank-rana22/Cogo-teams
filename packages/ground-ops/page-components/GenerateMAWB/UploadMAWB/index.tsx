import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../Air/commons/Layout';
import useCreateShipmentDocument from '../GenerateMawbDoc/useCreateShipmentDocument';
import styles from '../styles.module.css';

import uploadControls from './controls';

function UploadMAWB({
	item, edit, setEdit, setGenerate, activeCategory, activeHawb,
	hawbDetails, setHawbDetails, setActiveHawb, taskItem, category,
}) {
	const { control, handleSubmit, setValue, formState: { errors } } = useForm();
	const fields = uploadControls();
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
			id                  : category === 'mawb' ? taskItem?.documentId : taskItem?.id,
			service_id          : item?.serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : item?.id,
			state               : 'document_accepted',
			document_url        : finalUrl,
			data                : {

				status          : 'uploaded',
				document_number : activeCategory === 'mawb' ? item?.awbNumber : formValues?.document_number,
				service_id      : item?.serviceId,
				service_type    : 'air_freight_service',
				document_url    : finalUrl,
			},
			documents: [
				{
					data: {

						status          : 'uploaded',
						document_number : activeCategory === 'mawb' ? item?.awbNumber : formValues?.document_number,
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

	useEffect(() => {
		setValue('document_number', taskItem?.document_number);
		setValue('document', taskItem.documentUrl);
	}, [setValue, taskItem]);

	return (
		<div>
			{activeCategory === 'hawb' &&	<Layout fields={fields.hawb_controls} errors={errors} control={control} />}
			<Layout fields={fields.all_controls} errors={errors} control={control} />
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
