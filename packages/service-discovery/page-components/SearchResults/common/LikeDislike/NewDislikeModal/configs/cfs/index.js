import hasAdditionalLineItemsControls from './has-additional-line-items-controls';
import missingLineItemsControls from './missing-line-items-controls';
import rateNotSatisfactoryControls from './rate-not-satisfactory-controls';

export const getCfsControls = () => ({
	unsatisfactory_rate       : rateNotSatisfactoryControls(),
	has_additional_line_items : hasAdditionalLineItemsControls(),
	has_missing_line_items    : missingLineItemsControls(),
});

export const cfsReasonOptions = [
	{
		label : 'Rate Not Satisfactory',
		value : 'unsatisfactory_rate',
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
