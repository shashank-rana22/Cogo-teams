import { RatingController, TextAreaController } from '@cogoport/forms';

export const CONTROLS = [
	{
		inputType  : 'rating',
		label      : 'Rating',
		name       : 'self_rating',
		totalStars : 5,
		type       : 'star',
		size       : 'lg',
		rules      : { required: 'Rating is required' },
	},
	{
		label     : 'Comment',
		inputType : 'textArea',
		name      : 'justification',
		rules     : { required: 'Comment is Required' },
		rows      : 3,
	},
	{
		inputType  : 'rating',
		label      : 'My targets were fair',
		name       : 'fair_targets',
		totalStars : 5,
		type       : 'star',
		size       : 'lg',
		rules      : { required: 'Required' },
	},
	{
		inputType  : 'rating',
		label      : 'Complete Process was transparent',
		name       : 'transparent_targets',
		totalStars : 5,
		type       : 'star',
		size       : 'lg',
		rules      : { required: 'Required' },
	},
	{
		inputType  : 'rating',
		label      : 'My KRAs reflect my Day-to-day work',
		name       : 'reflect_day_to_day_work',
		totalStars : 5,
		type       : 'star',
		size       : 'lg',
		rules      : { required: 'Required' },
	},
];

export const CONTROL_MAPPING = {
	textArea : TextAreaController,
	rating   : RatingController,
};
