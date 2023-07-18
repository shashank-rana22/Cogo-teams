const SHIPMENT_MODE_OPTIONS = [
	{
		label                  : 'Ocean',
		value                  : 'ocean',
		allowedLifecycleStages : ['transacting', 'organic_leads'],
	},
	{
		label                  : 'Air',
		value                  : 'air',
		allowedLifecycleStages : ['transacting', 'organic_leads'],
	},
	{
		label                  : 'Surface',
		value                  : 'surface',
		allowedLifecycleStages : ['organic_leads'],
	},
	{
		label                  : 'Haulage',
		value                  : 'haulage',
		allowedLifecycleStages : ['organic_leads'],
	},
	{
		label                  : 'Rail Domestic',
		value                  : 'rail_domestic_freight',
		allowedLifecycleStages : ['organic_leads'],
	},
];

const getShipmentModeOptions = ({ lifecycleStage }) => {
	if (!lifecycleStage) return SHIPMENT_MODE_OPTIONS;

	return SHIPMENT_MODE_OPTIONS.filter((option) => option.allowedLifecycleStages.includes(lifecycleStage));
};

export default getShipmentModeOptions;
