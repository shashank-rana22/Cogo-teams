module.exports = {
	edit_button: {
		buttons: [
			{
				label     : 'Close',
				themeType : 'link',
				type      : 'button',
				name      : 'close',
			},
			{
				label     : 'Next',
				themeType : 'accent',
				type      : 'button',
				name      : 'next',
				size      : 'sm',
			},
		],
		heading : 'Filter your preferences',
		content : `Want to add another container type? Or, 
        want to update the current one?`,
		subText : 'Update it from here.',
		show    : ['all'],
	},
	comparision_button: {
		buttons: [
			{
				label     : 'Close',
				themeType : 'link',
				type      : 'button',
				name      : 'close',
			},
			{
				label     : 'Prev',
				themeType : 'accent',
				type      : 'button',
				name      : 'prev',
				size      : 'sm',
			},
		],
		heading: `Select to compare rates, or create a 
        multiline quotation`,
		content: `Select multiple rate cards to compare the 
        rates between the shipping lines, & 
        create a multi shipping line quotation.`,
		subText : '',
		show    : ['fcl_freight', 'air_freight'],
	},
};
