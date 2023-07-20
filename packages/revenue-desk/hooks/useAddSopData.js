import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getSopPayload from '../page-components/DetailPage/PocSopModal/SopOld/helpers/format-sop-payload';

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

	const SOP_INSTRUCTIONS = [];
	if (api === 'update') {
		(formValues || []).forEach((row, index) => {
			const ELEMENT = {};

			const instruction = row.mainData || {};

			const originalInstruction = originalData[index]?.mainData || {};

			let isadded = false;

			if (originalData?.length >= index) {
				if (instruction?.instruction !== originalInstruction?.instruction) {
					ELEMENT.instruction = instruction.instruction;
					isadded = true;
				}
				if (instruction?.url_links !== originalInstruction?.url_links) {
					ELEMENT.url_links = instruction?.url_links;
					isadded = true;
				}
				if (instruction.status !== originalInstruction?.status) {
					ELEMENT.status = instruction?.status;
					isadded = true;
				}
				if (isadded) {
					ELEMENT.id = instruction?.id;
					SOP_INSTRUCTIONS.push(ELEMENT);
				}
			} else {
				if (instruction?.instruction) {
					ELEMENT.instruction = instruction.instruction;
				}
				if (instruction?.url_links) {
					ELEMENT.url_links = instruction?.url_links;
				}
				if (instruction?.status) {
					ELEMENT.status = instruction?.status;
				}
				SOP_INSTRUCTIONS.push(ELEMENT);
			}
		});
	}

	const payload =	api === 'create'
		? create_payload
		: { sop_instructions: SOP_INSTRUCTIONS, procedure_id: sopID };

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
