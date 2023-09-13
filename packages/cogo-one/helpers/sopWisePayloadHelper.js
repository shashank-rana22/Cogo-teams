const sopFormatter = ({ sopInstructions = [] }) => sopInstructions?.map(
	(eachInstruction) => (
		{
			category : eachInstruction?.category,
			remarks  : eachInstruction?.remarks,
			document : typeof eachInstruction?.document === 'string' ? eachInstruction?.document : undefined,
		}) || [],
);
const getOceanPayload = ({ formValues = {}, procedure_id = '', shipment_id = '', organization_id = '' }) => (
	{
		instruction            : 'additional_preference',
		sop_instructions       : sopFormatter({ sopInstructions: formValues?.additional }) || [],
		operating_procedure_id : procedure_id,
		shipment_id,
		organization_id,
	});

const urlFormatter = (
	{ urls },
) => urls?.map((eachUrl) => (typeof eachUrl === 'object' ? eachUrl?.finalUrl : eachUrl || undefined));

const getAirPayload = ({ formValues = {}, procedure_id = '', shipment_id = '', organization_id = '' }) => (
	{
		instruction            : formValues?.instruction,
		url_links              : urlFormatter({ urls: [formValues?.url_links].flat() }),
		operating_procedure_id : procedure_id,
		shipment_id,
		organization_id,
	}
);

const createProcedurePayload = ({
	formValues = {}, shipment_id = '', organization_id = '',
}) => ({

	sop_instructions: [
		{
			instruction : formValues?.instruction,
			url_links   : urlFormatter({ urls: [formValues?.url_links].flat() }),
		},
	],
	shipment_id,
	organization_id,
	heading: 'CCS Team Notes',
});

const MODE_WISE_PAYLOAD_MAPPING = {
	get_api: {
		endpoint   : '/create_shipment_operating_instruction',
		getPayload : getOceanPayload,
	},
	list_api: {
		endpoint   : '/create_shipment_operating_instruction',
		getPayload : getAirPayload,
	},
};

export {
	MODE_WISE_PAYLOAD_MAPPING,
	createProcedurePayload,
};
