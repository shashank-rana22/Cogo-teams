const controls = {

	title: {
		name        : 'title',
		type        : 'input',
		placeholder : 'Enter name ',
		rules       : {
			required : true,
			validate : (val) => (val?.trim()?.length <= 0 ? 'This cannot be Empty' : true),
		},
	},
	content: {
		name        : 'content',
		type        : 'textarea',
		placeholder : 'Enter content',
		rules       : {
			required : true,
			validate : (val) => (val?.trim()?.length <= 0 ? 'This cannot be Empty' : true),
		},
	},

};
export default controls;
