// import useCreateShipmentMapping from '@cogo/business-modules/rpa/hooks/useCreateShipmentMapping';
import { useContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import useScope from '@cogoport/scope-select';
import { useSelector } from '@cogoport/store';

// import { ShipmentDetailContext } from '../../../../../../commons/Context';

const useDraftBLApis = ({
	isShipmentId,
	isHBL,
	pendingTask,
	fcl_or_lcl_service,
	refetch,
	clearTask,
	summary,
}) => {
	const { scope } = useScope();
	const { user_id } = useSelector((s) => ({ user_id: s?.profile?.id }));

	// const [{ refetch: getShipmentRefetch }] = useContext(ShipmentDetailContext);

	// const { submitShipmentMapping } = useCreateShipmentMapping();

	const docsParams = {
		filters: {
			shipment_id   : isShipmentId,
			document_type : 'bluetide_hbl',
		},
		page_limit: 1000,
	};

	const shipmentDocsParams = {
		performed_by_org_id : pendingTask?.organization_id,
		service_type        : fcl_or_lcl_service?.service_type,
		filters             : {
			shipment_id   : isShipmentId,
			document_type : 'draft_house_bill_of_lading',
		},
	};

	const listDocsAPI = useRequest(
		'get',
		isHBL && isShipmentId !== undefined,
		scope,
	)('/list_shipment_trade_documents', { params: docsParams });

	const shipmentListDocsAPI = useRequest(
		'get',
		isShipmentId !== undefined && pendingTask?.organization_id,
		scope,
	)('/list_shipment_documents', { params: shipmentDocsParams });

	const createShipmentDocAPI = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_document');

	const createHBL = async ({ setHblLoading, hblData }) => {
		setHblLoading(true);
		const promises = hblData.reduce((acc, data) => {
			if (data) {
				const body = {
					name          : 'House BL',
					document_type : 'bluetide_hbl',
					shipment_id   : pendingTask?.shipment_id,
					service_id    : pendingTask?.service_id,
					service_type  : pendingTask?.service_type,
					organization_id:
						summary?.importer_exporter_id
						|| fcl_or_lcl_service?.importer_exporter_id,
					pending_task_id:
						fcl_or_lcl_service?.service_type === 'lcl_freight_service'
							? pendingTask?.id
							: undefined,
					data: {
						...data,
						service_id   : pendingTask?.service_id,
						service_type : pendingTask?.service_type,
					},
					performed_by_id    : user_id,
					uploaded_by_org_id : pendingTask?.organization_id,
				};

				// const promise = request({
				// 	scope,
				// 	method : 'POST',
				// 	url    : '/create_shipment_trade_document',
				// 	data   : body,
				// });

				// acc.push(promise);
			}
			return acc;
		}, []);

		try {
			await Promise.all(promises);
			setHblLoading(false);
			refetch();
			if (fcl_or_lcl_service?.service_type === 'lcl_freight_service') {
				clearTask();
			}
		} catch {
			setHblLoading(false);
		}
	};

	const submitMBL = async ({ mblRef }) => {
		const values = mblRef.current.submit();
		if (values?.length) {
			const body = {
				shipment_id        : pendingTask?.shipment_id,
				uploaded_by_org_id : pendingTask?.organization_id,
				document_type      : 'draft_bill_of_lading',
				service_id         : pendingTask?.service_id,
				service_type       : pendingTask.service_type,
				pending_task_id    : pendingTask?.id,
				documents          : values.map((value) => ({
					file_name    : value?.url?.name,
					document_url : value?.url?.url,
					data         : {
						description      : value?.description,
						document_number  : value?.document_number,
						containers_count : value?.containers_count,
						service_id       : summary?.service_id,
						service_type     : summary?.service_type,
					},
				})),
			};

			await createShipmentDocAPI.trigger({ data: body });
			// feedbacks to cogolens starts
			try {
				const rpaMappings = {
					cogo_shipment_id        : pendingTask.shipment_id,
					cogo_shipment_serial_no : fcl_or_lcl_service?.shipment_serial_id,
					bill_of_lading          : values?.document_number,
				};
				// await submitShipmentMapping(rpaMappings);
			} catch (err) {
				console.log(err);
			}
			// feedbacks to cogolens ends
			refetch();
			// getShipmentRefetch();
			clearTask();
		}
	};

	return {
		listDocsAPI,
		shipmentListDocsAPI,
		createShipmentDocAPI,
		createHBL,
		submitMBL,
	};
};

export default useDraftBLApis;
