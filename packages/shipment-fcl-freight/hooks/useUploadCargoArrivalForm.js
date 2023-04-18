import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useRef } from 'react';

import compareCargoArrivalData from '../utils/compareCargoArrivalData';
import formatCargoArrivalData from '../utils/formatCargoArrivalData';

const cargoArrivalData = {
	notify_party      : '',
	consignee         : '',
	shipper           : '',
	job_ref_no        : '',
	inv_ref_no        : '',
	igm_dt            : '',
	port_of_loading   : '',
	port_of_discharge : '',
	pan               : '',
	tan               : '',
	service_type      : '',
	service_id        : '',
	weight            : '',
	volume            : '',
	packages_count    : '',
	containers        : [
		{
			container_no        : '',
			marks_and_number    : '',
			package_description : '',
			gross_weight        : '',
			measurement         : '',
			seal                : '',
		},
	],
	shipment_details: {
		po_no         : '',
		hbl_no        : '',
		hawb_no       : '',
		vessel        : '',
		voyage        : '',
		flight_number : '',
		obl_number    : '',
		obl_date      : '',
		mawb_no       : '',
		mawb_date     : '',
		service_name  : '',
		booking_no    : '',
		carrier_name  : '',
		origin        : '',
		destination   : '',
		eta           : '',
		etd           : '',
		warehouse     : '',
		item_no       : '',
		sub_item_no   : '',
		all_prepaid   : '',
		airline_name  : '',
	},
};

const useUploadCargoArrivalForm = ({
	summary,
	setShow,
	savedData,
	setSavedData,
	pendingTask,
	refetch,
	clearTask,
}) => {
	const [{ loadng: createDocumentLoading }, createDocumentTrigger] = useRequest({
		url    : '/create_shipment_trade_document',
		method : 'POST',
	});

	const [{ loading: updateTaskLoading }, updateTaskTrigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const movement_details =		summary?.movement_details || summary?.movement_detail || [];

	const hbl_details = summary?.hbl_details || [];
	const mbl_details = summary?.mbl_details || [];

	const notify_party_details = summary?.notify_party_details || [];

	const container_numbers = (summary?.container_details || []).map(
		(obj) => obj?.container_number,
	);

	const templateInitialValues = {
		...cargoArrivalData,
		port_of_loading:
			summary?.origin_port?.display_name
			|| summary?.origin_airport?.display_name
			|| '',
		port_of_discharge:
			summary?.destination_port?.display_name
			|| summary?.destination_airport?.display_name
			|| '',
		volume : summary?.volume ? String(summary?.volume) : '',
		weight : summary?.weight ? String(summary?.weight) : '',
		origin : ['fob', 'fca', 'fas'].includes(summary?.inco_term)
			? summary?.origin_port?.display_name
			|| summary?.origin_airport?.display_name
			|| ''
			: '',
		pan            : summary?.registration_number || '',
		packages_count : summary?.packages_count
			? String(summary?.packages_count)
			: '',
		notify_party: notify_party_details?.[0]?.company_name,
		consignee:
			summary?.consignee_details?.company_name
			|| summary?.consignee_detail?.company_name
			|| '',
		shipper:
			summary?.consignee_details?.company_name
			|| summary?.consignee_detail?.company_name
			|| '',
		containers: [
			{
				...cargoArrivalData?.containers?.[0],
				marks_and_number : 'Nm',
				container_no     : container_numbers.join(', ') || '',
			},
		],
		shipment_details: {
			...cargoArrivalData?.shipment_details,
			vessel     : movement_details?.[0]?.vessel || '',
			voyage     : movement_details?.[0]?.voyage || '',
			obl_number : mbl_details?.[0]?.data?.document_number || '',
			hbl_no     : hbl_details?.[0]?.data?.document_number || '',
			obl_date   : formatDate({
				date       : mbl_details?.[0]?.updated_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
			service_name: startCase(summary?.service_type) || '',
			hawb_no:
				summary?.service_type === 'air_freight_service'
					? hbl_details?.[0]?.data?.document_number || ''
					: '',
			mawb_no:
				summary?.service_type === 'air_freight_service'
					? mbl_details?.[0]?.data?.document_number || ''
					: '',
			eta: formatDate({
				date       : summary?.schedule_arrival,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
			etd: formatDate({
				date       : summary?.schedule_departure,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
			airline_name: summary?.airline?.business_name || '',
		},
		service_type : summary?.service_type,
		service_id   : summary?.id,
	};

	const ref = useRef({});

	const { user_id } = useSelector((s) => ({ user_id: s?.profile?.id }));

	const handleSave = () => {
		ref.current.submit.handleSubmit((values) => {
			const formmatedValues = formatCargoArrivalData(values);

			const check = compareCargoArrivalData(formmatedValues, cargoArrivalData);

			if (check) {
				setSavedData(null);
				setShow(false);
			} else {
				setSavedData(formmatedValues);
				setShow(false);
			}
		})();
	};

	const handleSubmitDocument = async () => {
		const body = {
			data               : savedData,
			document_type      : 'container_arrival_notice',
			name               : 'Container Arrival Notice',
			organization_id    : summary?.importer_exporter_id,
			performed_by_id    : user_id,
			service_id         : pendingTask?.service_id,
			service_type       : pendingTask?.service_type,
			shipment_id        : pendingTask?.shipment_id,
			uploaded_by_org_id : pendingTask?.organization_id,
			pending_task_id    : pendingTask?.id,
		};

		try {
			const res = await createDocumentTrigger({ data: body });

			if (!res?.hasError) {
				await updateTaskTrigger({
					data: { id: pendingTask?.id },
				});
				clearTask();
				refetch();
			} else {
				Toast.error(res?.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		handleSubmitDocument,
		handleSave,
		ref,
		templateInitialValues,
		loading: createDocumentLoading,
		updateTaskLoading,
	};
};

export default useUploadCargoArrivalForm;
