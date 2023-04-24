// import useCreateShipmentMapping from '@cogo/business-modules/rpa/hooks/useCreateShipmentMapping';
import { useContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useListDocuments from '../../../../../../hooks/useListDocuments';
// import useScope from '@cogoport/scope-select';

// import { ShipmentDetailContext } from '../../../../../../commons/Context';

const useDraftBLHelper = ({
	isShipmentId,
	isHBL,
	task,
	fcl_or_lcl_service,
	taskListRefetch = () => {},
	shipmentData = {},
	primaryService,
	onCancel = () => {},
}) => {
	// const { scope } = useScope();
	const { user_id } = useSelector((s) => ({ user_id: s?.profile?.id }));

	// const [{ refetch: getShipmentRefetch }] = useContext(ShipmentDetailContext);

	// const { submitShipmentMapping } = useCreateShipmentMapping();

	const tradeDocParams = {
		filters: {
			shipment_id   : task.shipment_id,
			document_type : 'bluetide_hbl',
		},
		page_limit: 1000,
	};

	const shipmentDocsParams = {
		performed_by_org_id : task?.organization_id,
		service_type        : fcl_or_lcl_service?.service_type,
		filters             : {
			shipment_id   : isShipmentId,
			document_type : 'draft_house_bill_of_lading',
		},
	};

	const listDocsAPI = useRequest(
		'get',
		isHBL && isShipmentId !== undefined,
		// scope,
	)('/list_shipment_trade_documents', { params: tradeDocParams });

	const shipmentListDocsAPI = useRequest(
		'get',
		isShipmentId !== undefined && task?.organization_id,
		// scope,
	)('/list_shipment_documents', { params: shipmentDocsParams });

	const createShipmentDocAPI = useRequest(
		'post',
		false,
		// scope,
	)('/create_shipment_document');

	const createHBL = async ({ setHblLoading, hblData }) => {
		setHblLoading(true);
		const promises = hblData.reduce((acc, data) => {
			if (data) {
				const body = {
					name          : 'House BL',
					document_type : 'bluetide_hbl',
					shipment_id   : task?.shipment_id,
					service_id    : task?.service_id,
					service_type  : task?.service_type,
					organization_id:
						shipmentData?.importer_exporter_id
						|| fcl_or_lcl_service?.importer_exporter_id,
					pending_task_id:
						fcl_or_lcl_service?.service_type === 'lcl_freight_service'
							? task?.id
							: undefined,
					data: {
						...data,
						service_id   : task?.service_id,
						service_type : task?.service_type,
					},
					performed_by_id    : user_id,
					uploaded_by_org_id : task?.organization_id,
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
			taskListRefetch();
			if (fcl_or_lcl_service?.service_type === 'lcl_freight_service') {
				onclose();
			}
		} catch {
			setHblLoading(false);
		}
	};

	const submitMBL = async ({ mblRef }) => {
		const values = mblRef.current.submit();
		if (values?.length) {
			const body = {
				shipment_id        : task?.shipment_id,
				uploaded_by_org_id : task?.organization_id,
				document_type      : 'draft_bill_of_lading',
				service_id         : task?.service_id,
				service_type       : task.service_type,
				pending_task_id    : task?.id,
				documents          : values.map((value) => ({
					file_name    : value?.url?.name,
					document_url : value?.url?.url,
					data         : {
						description      : value?.description,
						document_number  : value?.document_number,
						containers_count : value?.containers_count,
						service_id       : primaryService.id,
						service_type     : primaryService.service_type,
					},
				})),
			};

			await createShipmentDocAPI.trigger({ data: body });
			// feedbacks to cogolens starts
			try {
				const rpaMappings = {
					cogo_shipment_id        : task.shipment_id,
					cogo_shipment_serial_no : fcl_or_lcl_service?.shipment_serial_id,
					bill_of_lading          : values?.document_number,
				};
				// await submitShipmentMapping(rpaMappings);
			} catch (err) {
				console.log(err);
			}
			// feedbacks to cogolens ends
			taskListRefetch();
			// getShipmentRefetch();
			onCancel();
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

export default useDraftBLHelper;
