const getControls = () => {
	const controls = [{
		name        : 'minimum_profitability',
		type        : 'number',
		placeholder : 'Type Here',
		style       : {
			width     : '50%',
			marginTop : '20px',
		},
		suffix:
	<div style={{
		borderLeft : '1px solid #DEDEDE',
		width      : '41px',
		height     : '32px',
		textAlign  : 'center',
		paddingTop : '4px',
	}}
	>
		%
	</div>,
		rules: {
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
