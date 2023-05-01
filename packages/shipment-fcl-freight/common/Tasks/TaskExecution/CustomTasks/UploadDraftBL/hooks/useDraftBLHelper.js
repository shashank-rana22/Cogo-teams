import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

import useUpdateShipmentCogoid from '../../../../../../hooks/useUpdateShipmentCogoid';

const useDraftBLHelper = ({
	pendingTask = {},
	refetch = () => {},
	closeTask = () => {},
}) => {
	const {
		refetch: getShipmentRefetch,
		shipment_data,
		primary_service,
	} = useContext(ShipmentDetailContext);

	const { submitShipmentMapping } = useUpdateShipmentCogoid();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const createHBL = async ({ setHblLoading, hblData }) => {
		setHblLoading(true);
		const promises = hblData.reduce((acc, data) => {
			if (data) {
				const body = {
					name            : 'House BL',
					document_type   : 'bluetide_hbl',
					shipment_id     : pendingTask?.shipment_id,
					service_id      : pendingTask?.service_id,
					service_type    : pendingTask?.service_type,
					organization_id : shipment_data?.importer_exporter_id,
					data            : {
						...data,
						service_id   : pendingTask?.service_id,
						service_type : pendingTask?.service_type,
					},
					uploaded_by_org_id: pendingTask?.organization_id,
				};

				// eslint-disable-next-line react-hooks/rules-of-hooks
				const promise = useRequest({
					method : 'POST',
					url    : '/create_shipment_trade_document',
					data   : body,
				});

				acc.push(promise);
			}
			return acc;
		}, []);

		try {
			await Promise.all(promises);
			setHblLoading(false);
			refetch();
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
						service_id       : primary_service?.id,
						service_type     : 'fcl_freight_service',
					},
				})),
			};

			await trigger({ data: body });
			// feedbacks to cogolens starts
			try {
				const rpaMappings = {
					cogo_shipment_id        : pendingTask.shipment_id,
					cogo_shipment_serial_no : shipment_data?.serial_id,
					bill_of_lading          : values?.document_number,
				};
				await submitShipmentMapping(rpaMappings);
			} catch (err) {
				console.log(err);
			}
			// feedbacks to cogolens ends
			refetch();
			getShipmentRefetch();
			closeTask();
		}
	};

	return {
		createHBL,
		submitMBL,
		loading,
	};
};

export default useDraftBLHelper;
