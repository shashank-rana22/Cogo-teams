import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest, request } from '@cogoport/request';
import { useState } from 'react';

import useUpdateShipmentCogoid from '../../../../../../hooks/useUpdateShipmentCogoid';

const useDraftBLHelper = ({
	pendingTask = {},
	getShipmentRefetch = () => {},
	shipment_data = {},
	primary_service = {},
}) => {
	const [createTradeDocLoading, setCreateTradeDocLoading] = useState(false);

	const { submitShipmentMapping } = useUpdateShipmentCogoid();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const createHBL = async ({ hblData }) => {
		setCreateTradeDocLoading(true);
		const promises = hblData.reduce((acc, data) => {
			if (data) {
				const body = {
					name            : 'House BL',
					document_type   : 'bluetide_hbl',
					shipment_id     : pendingTask?.shipment_id,
					service_id      : pendingTask?.service_id,
					service_type    : pendingTask?.service_type,
					organization_id : pendingTask?.organization_id,
					data            : {
						...data,
						service_id   : pendingTask?.service_id,
						service_type : pendingTask?.service_type,
						watermark    : 'DRAFT',
					},
					uploaded_by_org_id: pendingTask?.organization_id,
				};

				const promise = request({
					method : 'POST',
					url    : '/generate_bluetide_hbl',
					data   : body,
				});

				acc.push(promise);
			}
			return acc;
		}, []);

		try {
			await Promise.all(promises);
			setCreateTradeDocLoading(false);
		} catch (err) {
			toastApiError(err);
			setCreateTradeDocLoading(false);
		}
	};

	const submitMBL = async ({ mblRef }) => {
		const values = await mblRef.current.submit();
		if (values?.length) {
			const body = {
				shipment_id        : pendingTask?.shipment_id,
				uploaded_by_org_id : pendingTask?.organization_id,
				document_type      : 'draft_bill_of_lading',
				service_id         : pendingTask?.service_id,
				service_type       : pendingTask.service_type,
				pending_task_id    : pendingTask?.id,
				documents          : values.map((value) => ({
					file_name    : value?.url?.fileName,
					document_url : value?.url?.finalUrl,
					data         : {
						description      : value?.description,
						document_number  : value?.document_number,
						containers_count : value?.containers_count,
						service_id       : primary_service?.id,
						service_type     : 'lcl_freight_service',
					},
				})),
			};

			await trigger({ data: body });

			try {
				const rpaMappings = {
					cogo_shipment_id        : pendingTask.shipment_id,
					cogo_shipment_serial_no : shipment_data?.serial_id,
					bill_of_lading          : body.documents[GLOBAL_CONSTANTS.zeroth_index].data.document_number,
				};

				await submitShipmentMapping(rpaMappings);
			} catch (err) {
				toastApiError(err);
			}

			getShipmentRefetch();
		}
	};

	return {
		createHBL,
		submitMBL,
		loading,
		createTradeDocLoading,
	};
};

export default useDraftBLHelper;
