import { useEffect, useRef, useState } from 'react';
import { useRequest, useScope } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';

// const imports = ['fob', 'exw', 'fca', 'fas'];
const exports = ['cif', 'cfr', 'cpt', 'cip', 'dat', 'dap', 'ddp'];

const useManifestCopy = ({
	summary = {},
	pendingTask = {},
	refetch = () => {},
	clearTask = () => {},
	services = [],
}) => {
	const { user_id } = useSelector((s) => ({ user_id: s?.profile?.id }));
	const { scope } = useScope();

	const [loading, setLoading] = useState(false);
	const [canUseSwitch, setcanUseSwitch] = useState(
		!!exports.includes(summary?.inco_term),
	);
	const [mode, setMode] = useState(
		exports.includes(summary?.inco_term) ? 'create' : 'upload',
	);

	const createShipmentTradeDocumentApi = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_trade_document');

	const ref = useRef();

	const air_service =
		(services || []).find(
			(service) => service?.service_type === 'air_freight_service',
		) || {};

	const isShipmentId =
		pendingTask?.shipment_id || summary?.shipment_id || summary?.id;

	const shipmentDocsParams = {
		performed_by_org_id: pendingTask?.organization_id,
		service_type: 'air_freight_service',
		filters: {
			shipment_id: isShipmentId,
			document_type: 'manifest_copy',
		},
	};

	const shipmentListDocsAPI = useRequest(
		'get',
		isShipmentId !== undefined && pendingTask?.organization_id,
		scope,
	)('/list_shipment_documents', { params: shipmentDocsParams });

	const updateShipmentPendingTask = useRequest(
		'post',
		false,
		'partner',
	)('/update_shipment_pending_task');

	const requiredShipmentDocsParams = {
		performed_by_org_id: pendingTask?.organization_id,
		service_type: 'air_freight_service',
		filters: {
			shipment_id: isShipmentId,
			document_type: ['draft_house_airway_bill', 'draft_airway_bill'],
		},
	};

	const requiredShipmentListDocsAPI = useRequest(
		'get',
		isShipmentId !== undefined && pendingTask?.organization_id,
		scope,
	)('/list_shipment_documents', { params: requiredShipmentDocsParams });

	const createShipmentDocAPI = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_document');

	useEffect(() => {
		setcanUseSwitch(
			shipmentListDocsAPI?.data?.list?.length === 0 &&
				exports.includes(summary?.inco_term),
		);
	}, [shipmentListDocsAPI?.data?.list]);

	const saveAll = async (values) => {
		setLoading(true);

		const mawb_details = {
			shipper_detail: values?.shipper,
			shipper_address: values?.shipper_address,
			consignee_detail: values?.consignee,
			consignee_address: values?.consignee_address,
			notify_party: values?.notify,
			origin_airport: values?.origin_airport,
			destination_airport: values?.destination_airport,
			etd: values?.etd,
			airway_bill_no: values?.airway_bill_no,
			bl_category: summary?.bl_category,
			service_id: pendingTask?.service_id,
			service_type: pendingTask?.service_type,
			heading: 'AIR CARGO MANIFEST',
		};

		const hawb_details = {
			hawb_number: values?.hawb_no,
			shipper_detail: values?.hawb_shipper,
			shipper_address: values?.hawb_shipper_address,
			consignee_detail: values?.hawb_consignee,
			consignee_address: values?.hawb_consignee_address,
			packages_count: values?.packages_count?.toString(),
			weight: values?.weight?.toString(),
			collect_fees: values?.collect_fees,
			total_packages_count: values?.packages_count?.toString(),
			total_weight: values?.weight?.toString(),
			total_collect_fees: values?.collect_fees,
			signature: values?.authorized_signatory_image_url,
			description: values?.description,
		};

		const data =
			summary?.bl_category === 'hawb'
				? { ...mawb_details, hawb_details }
				: mawb_details;

		const body = {
			name: 'Air Manifest Copy',
			document_type: 'manifest_copy',
			shipment_id: pendingTask?.shipment_id,
			service_id: pendingTask?.service_id,
			service_type: pendingTask?.service_type,
			organization_id:
				summary?.importer_exporter_id || air_service?.importer_exporter_id,
			data,
			performed_by_id: user_id,
			uploaded_by_org_id: pendingTask?.organization_id,
			status: 'completed',
		};

		try {
			const res = await createShipmentTradeDocumentApi.trigger({ data: body });

			if (!res?.hasError) {
				toast.success('Uploaded successfully!');
				await updateShipmentPendingTask.trigger({
					data: { id: pendingTask.id },
				});
				setLoading(false);
				refetch();
				clearTask();
			} else {
				toast.error('Something went wrong!');
			}
		} catch {
			setLoading(false);
		}
	};

	const submit = async () => {
		const values = ref.current?.submit();

		setLoading(true);
		if (values) {
			const body = {
				document_type: 'manifest_copy',
				shipment_id: pendingTask?.shipment_id,
				uploaded_by_org_id: pendingTask?.organization_id,
				service_id: pendingTask?.service_id,
				service_type: pendingTask?.service_type,
				pending_task_id: pendingTask?.id,
				documents: [
					{
						file_name: values?.url?.name,
						document_url: values?.url?.url,
						data: {
							description: values?.description,
						},
					},
				],
			};
			const res = await createShipmentDocAPI.trigger({ data: body });
			if (!res?.hasError) {
				toast.success('Uploaded successfully!');
				setLoading(false);
				refetch();
				clearTask();
			} else {
				toast.error('Something went wrong!');
			}
		}
		setLoading(false);
	};

	return {
		submit,
		saveAll,
		loading,
		canUseSwitch,
		mode,
		setMode,
		shipmentListDocsAPI,
		requiredShipmentListDocsAPI,
		ref,
	};
};

export default useManifestCopy;
