import { useFormCogo } from '@cogoport/front/hooks';
import { useRequest } from '@cogo/commons/hooks';
import { Button } from '@cogoport/front/components/admin';
import { useEffect, useState } from 'react';
import FormLayout from '../../../../../../commons/Layout';
import styles from './styles.module.css';

const controls = [
	{
		name: 'url',
		showLabel: false,
		span: 12,
		type: 'file',
		themeType: 'secondary',
		drag: true,
		uploadIcon: 'ic-upload',
		label: '',
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
		rules: { required: { value: true, message: 'Document is required' } },
		multiple: true,
	},
];

const UploadDocument = ({
	setCurrentStep,
	setFileUrl,
	shipment_data,
	task,
}) => {
	const { watch, fields, setValues } = useFormCogo(controls);

	const [errors] = useState({});

	const { trigger, data, loading } = useRequest(
		'get',
		true,
		'partner',
	)('/list_shipment_documents', { params: { document_type: 'booking_note' } });

	useEffect(() => {
		if (data) {
			setValues({ url: data?.document_url });
		}
	}, [data]);

	const formValues = watch();

	useEffect(() => {
		(async () => {
			await trigger({
				params: {
					filters: { shipment_id: task.shipment_id, id: task.task_field_id },
					performed_by_org_id: task.user_id,
					service_type: shipment_data.service_type,
				},
			});
		})();
	}, []);

	useEffect(() => {
		if (formValues.url) {
			setFileUrl(formValues.url);
		}
	}, [JSON.stringify(formValues)]);

	return (
		<div className={styles.container}>
			{loading ? (
				<div className={styles.skeleton_div}>
					<CustomSkeleton width="100%" height="20px" />
					<CustomSkeleton width="100%" height="20px" />
				</div>
			) : (
				<div className={styles.custom_div}>
					<div className={styles.remarks}>{`Remarks: ${
						data?.list?.[0]?.remarks?.[0] || 'ggjdfgdfgdfj'
					}`}</div>
					<FormLayout controls={controls} fields={fields} errors={errors} />
					<Button
						onClick={() => {
							setCurrentStep('update_details');
						}}
						style={{ marginTop: '10px' }}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};

export default UploadDocument;
