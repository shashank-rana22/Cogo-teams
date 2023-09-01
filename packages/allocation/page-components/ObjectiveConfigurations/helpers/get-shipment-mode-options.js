const getShipmentModeTranslatedOptions = ({ t = () => {} }) => ([
	{
		label                  : t('allocation:shipment_mode_ocean'),
		value                  : 'ocean',
		allowedLifecycleStages : ['transacting', 'organic_leads', 'default'],
	},
	{
		label                  : t('allocation:shipment_mode_air'),
		value                  : 'air',
		allowedLifecycleStages : ['transacting', 'organic_leads', 'default'],
	},
	{
		label                  : t('allocation:shipment_mode_surface'),
		value                  : 'surface',
		allowedLifecycleStages : ['transacting'],
	},
	{
		label                  : t('allocation:shipment_mode_haulage'),
		value                  : 'haulage',
		allowedLifecycleStages : ['transacting'],
	},
	{
		label                  : t('allocation:shipment_mode_rail_domestic'),
		value                  : 'rail_domestic_freight',
		allowedLifecycleStages : ['transacting'],
	},

]);

const getShipmentModeOptions = ({ lifecycleStage = 'default', t }) => {
	const shipmentModeOptions = getShipmentModeTranslatedOptions({ t });

	if (!lifecycleStage) return shipmentModeOptions;

	return shipmentModeOptions.filter((option) => option.allowedLifecycleStages.includes(lifecycleStage));
};

export default getShipmentModeOptions;
