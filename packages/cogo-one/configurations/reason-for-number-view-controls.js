import { VIEW_NUMBER_REASONS } from '../constants';

const controls = [
	{
		name        : 'reason',
		controlType : 'radio',
		options     : VIEW_NUMBER_REASONS,
	},
	{
		name        : 'custome_reason',
		controlType : 'textArea',
		placeholder : 'Enter your reason',
	},

];

export default controls;
