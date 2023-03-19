const getControls = () => [
	{
		name    : 'difficulty_level',
		type    : 'chips',
		label   : 'Set Difficulty level',
		options : [
			{ value: 'easy', label: 'Easy' },
			{ value: 'medium', label: 'Medium' },
			{ value: 'hard', label: 'Hard' },
		],
		multiple: false,
	},
];

export default getControls;
