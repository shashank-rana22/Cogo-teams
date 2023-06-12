const SUFFIX_STYLES = {
	borderLeft : '1px solid #dedede',
	width      : '42px',
	height     : '32px',
	textAlign  : 'center',
	paddingTop : '4px',
};

const getControls = () => {
	const controls = [{
		name        : 'minimum_profitability',
		type        : 'number',
		placeholder : 'Type Here',
		style       : {
			width     : '50%',
			marginTop : '20px',
		},

		suffix : <div style={SUFFIX_STYLES}>%</div>,
		rules  : {
			required: {
				value   : true,
				message : 'This is required before submitting',
			},

		},
		arrow : false,
		size  : 'sm',
	}];
	return controls;
};

export default getControls;
