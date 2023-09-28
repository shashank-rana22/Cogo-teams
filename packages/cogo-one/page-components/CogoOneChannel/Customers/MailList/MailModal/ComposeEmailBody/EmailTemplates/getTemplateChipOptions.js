import TemplateSuggestion from './TemplateSuggestion';

function getTemplateChipOptions() {
	return [
		{
			key      : '1',
			children : <TemplateSuggestion />,
			value    : 'cogoport',
		},
		{
			key      : '2',
			children : 'test ',
			value    : 'tets',
		},
	];
}

export default getTemplateChipOptions;
