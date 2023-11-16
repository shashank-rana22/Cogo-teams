import detentionNotSatisfactoryControls from './detention-not-satisfactory-controls';
import hasAdditionalLineItemsControls from './has-additional-line-items-controls';
import missingLineItemsControls from './missing-line-items-controls';
import rateNotSatisfactoryControls from './rate-not-satisfactory-controls';

export const getFclServiceControls = () => ({
	unsatisfactory_rate                  : rateNotSatisfactoryControls(),
	unsatisfactory_destination_detention : detentionNotSatisfactoryControls(),
	has_additional_line_items            : hasAdditionalLineItemsControls(),
	has_missing_line_items               : missingLineItemsControls(),
});

export const fclReasonOptions = [
	{
		label : 'Rate Not Satisfactory',
		value : 'unsatisfactory_rate',
	},
	{
		label : 'Detention not satisfactory',
		value : 'unsatisfactory_destination_detention',
	},
	{
		label : 'Has Additional Line Items',
		value : 'has_additional_line_items',
	},
	{
		label : 'There are Missing Line Items',
		value : 'has_missing_line_items',
	},
];
