import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import React from 'react';

import useBulkUpdateShipmentService from '../../../hooks/useBulkUpdateShipmentService';
import useCreateShipmentDocument from '../../../hooks/useCreateShipmentDocument';

import { documentType, invoiceDocumentControls, ewayBillControls } from './documentConfig';
import styles from './styles.module.css';

function EditDocument({
	showEdit,
	setShowEdit = () => {},
	shipment_data,
	refetch,
}) {
	const obj = [];
	(shipment_data?.all_services || []).forEach((item) => {
		if (item?.service_type === 'ftl_freight_service') {
			obj.push({
				id           : item?.id,
				truck_number : item?.truck_number,
			});
		}
	}, []);

	const { updateShipmentService } = useBulkUpdateShipmentService();
	const { loading, createDocument } = useCreateShipmentDocument({
		setShowEdit,
	});
	const invoiceControls = invoiceDocumentControls(obj);
	const ewayControls = ewayBillControls(obj);

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		defaultValues: {
			upload_ftl_commercial_invoice : [{}],
			upload_ftl_eway_bill_copy     : [{}],
		},
	});

	const watchDocumentType = watch('document_type');

	const onSubmit = async (values) => {
		const serviceData =	watchDocumentType === 'ftl_eway_bill_copy'
			? values?.upload_ftl_eway_bill_copy || []
			: values?.upload_ftl_commercial_invoice || [];

		const payload = {
			service: 'ftl_freight',
			service_data:
				serviceData.map((item) => ({
					service_id : item?.service_id,
					data       : {
						commercial_invoice_number : item?.invoice_number || undefined,
						commercial_invoice_date   : item?.invoice_date || undefined,
					},
				})) || [],
		};

		const createPayload = {
			shipment_id        : shipment_data?.id,
			document_type      : watchDocumentType,
			uploaded_by_org_id : shipment_data?.importer_exporter_id,
			service_type       : 'ftl_freight_service',
			documents:
				serviceData.map((item) => ({
					file_name    : item?.url?.name,
					document_url : item?.url?.url,
					data         : {
						url         : item?.url?.url,
						service_id  : item?.service_id,
						description : item?.description,
					},
					document_type      : watchDocumentType,
					shipment_id        : shipment_data?.id,
					uploaded_by_org_id : shipment_data?.importer_exporter_id,
					service_id         : item?.service_id,
					service_type       : 'ftl_freight_service',
				})) || [],
		};

		if (watchDocumentType === 'ftl_commercial_invoice') {
			const res = await updateShipmentService(payload);
			if (res?.status === 200) {
				createDocument(createPayload, refetch);
			}
		} else if (watchDocumentType === 'ftl_eway_bill_copy') {
			createDocument(createPayload, refetch);
		}
	};

	return (

		<Modal
			show={showEdit}
			size="lg"
			onClose={() => setShowEdit(false)}
		>
			<Modal.Header title="Edit Document" />
			<Modal.Body>
				<div>
					<Layout
						control={control}
						fields={documentType}
						errors={errors}
					/>
					{watchDocumentType === 'ftl_eway_bill_copy' ? (
						<Layout
							control={control}
							fields={ewayControls}
							errors={errors}
						/>
					) : (
						<Layout
							control={control}
							fields={invoiceControls}
							errors={errors}
						/>
					)}

				</div>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_wrap}>
					<Button
						onClick={handleSubmit(onSubmit)}
						style={{ textTransform: 'capitalize' }}
						disabled={loading}
					>
						Confirm
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default EditDocument;
