import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getSopPayload from '../components/Sop/helpers/format-sop-payload';

const useAddSopData = ({
	formValues,
	api,
	sopID,
	originalData,
	reload,
	setReload = () => {},
	setSopAddForm = () => {},
	trade_partners_details,
	primary_service,
	shipment_data,
}) => {
	let create_payload = {};
	const apiToCall = api === 'create'
		? '/create_shipment_operating_procedure'
		: '/update_shipment_operating_instruction';

	const [{ loading }, trigger] = useRequest({
		url    : apiToCall,
		method : 'POST',
	}, { manual: true });

	const { shipment_payload, booking_party_payload, status } = getSopPayload(
		formValues,
		trade_partners_details,
		shipment_data,
		primary_service,
	);

	if (api === 'create') {
		create_payload = formValues.soptype === 'for_booking_party'
			? booking_party_payload
			: shipment_payload;
	}

	const update_payload = [];
	if (api === 'update') {
		(formValues || []).forEach((row, index) => {
			const elememt = {};
			const instruction = row.mainData;
			const originalInstruction = originalData[index]?.mainData;
			let isadded = false;
			if (originalData?.length >= index) {
				if (instruction?.instruction !== originalInstruction?.instruction) {
					elememt.instruction = instruction.instruction;
					isadded = true;
				}
				if (instruction?.url_links !== originalInstruction?.url_links) {
					elememt.url_links = instruction?.url_links;
					isadded = true;
				}
				if (instruction.status !== originalInstruction?.status) {
					elememt.status = instruction?.status;
					isadded = true;
				}
				if (isadded) {
					elememt.id = instruction?.id;
					update_payload.push(elememt);
				}
			} else {
				if (instruction?.instruction) {
					elememt.instruction = instruction.instruction;
				}
				if (instruction?.url_links) {
					elememt.url_links = instruction?.url_links;
				}
				if (instruction?.status) {
					elememt.status = instruction?.status;
				}
				update_payload.push(elememt);
			}
		});
	}

	const payload =	api === 'create'
		? create_payload
		: { sop_instructions: update_payload, procedure_id: sopID };

	const handleAddSop = async () => {
		try {
			if (status) {
				const res = await trigger({
					params: payload,
				});
				if (!res.hasError) {
					Toast.success(' Added Succesfully');
					setReload(!reload);
					setSopAddForm(false);
				} else {
					Toast.error('Something went wrong');
				}
			} else {
				Toast.info('Instruction or Attachment, atleast one is required!');
			}
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};

	return {
		loading,
		sopID,
		trigger,
		handleAddSop,
		payload,
	};
};

export default useAddSopData;
