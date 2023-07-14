import { Button } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';

import useGetDocumentTypeControls from '../../../../../../hooks/useGetDocumentTypeControls';
import useSendShipmentDocumentationNotification from '../../../../../../hooks/useSendShipmentDocumentationNotification';

import styles from './styles.module.css';

function DocumentTypeSID({
	orgId = '',
	id = '',
	formattedMessageData = {},
	documentTagUrl = '',
	setDocumentTagUrl = () => {},
}) {
	const { account_type = '' } = formattedMessageData || {};
	const { control, formState: { errors = {} }, watch, handleSubmit, resetField } = useForm();
	const watchListShipment = watch('list_shipments');
	const watchListShipmentPendingTasks = watch('list_shipment_pending_tasks');

	const controls = useGetDocumentTypeControls({
		orgId,
		account_type,
		watchListShipment,
		watchListShipmentPendingTasks,
		resetField,
	});

	const {
		postDocumentTag = () => {},
	} = useSendShipmentDocumentationNotification();

	const createDocumentTag = (formValues) => {
		const payload = {
			document_id   : id,
			document_type : formValues?.list_shipment_pending_tasks,
			shipment_id   : formValues?.list_shipments,
			document_link : documentTagUrl,
		};
		postDocumentTag({ payload, setDocumentTagUrl });
	};

	if (!documentTagUrl) {
		return null;
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.title}>
				<div>Document Tag</div>
				<IcMCross className={styles.cross} onClick={() => setDocumentTagUrl('')} />
			</div>
			{controls.map((eachControl = {}) => {
				const { label = '', name = '' } = eachControl || {};

				return (
					<div className={styles.styled_element} key={name}>
						<div>{label}</div>
						<AsyncSelectController control={control} {...eachControl} />
						<div className={styles.error_text}>
							{errors?.[name] && (errors?.[name]?.message || 'This is Required')}
						</div>
					</div>
				);
			})}
			<div className={styles.button_styles}>
				<Button size="sm" themeType="primary" onClick={handleSubmit(createDocumentTag)}>
					OK
				</Button>
			</div>
		</div>
	);
}

export default DocumentTypeSID;
