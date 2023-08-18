const SHIPMENT_MODE_OPTIONS = [
	{
		label                  : 'Ocean',
		value                  : 'ocean',
		allowedLifecycleStages : ['transacting', 'organic_leads', 'default'],
	},
	{
		label                  : 'Air',
		value                  : 'air',
		allowedLifecycleStages : ['transacting', 'organic_leads', 'default'],
	},
	{
		label                  : 'Surface',
		value                  : 'surface',
		allowedLifecycleStages : ['transacting'],
	},
	{
		label                  : 'Haulage',
		value                  : 'haulage',
		allowedLifecycleStages : ['transacting'],
	},
	{
		label                  : 'Rail Domestic',
		value                  : 'rail_domestic_freight',
		allowedLifecycleStages : ['transacting'],
	},
];

const getShipmentModeOptions = ({ lifecycleStage = 'default' }) => {
	if (!lifecycleStage) return SHIPMENT_MODE_OPTIONS;

	return SHIPMENT_MODE_OPTIONS.filter((option) => option.allowedLifecycleStages.includes(lifecycleStage));
};

export default getShipmentModeOptions;
