// const PASSWORD_PATTERN =	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/gm;

const updatePasswordControls = () => [
	{
		name        : 'password',
		label       : 'Password',
		type        : 'text',
		size        : 'lg',
		span        : 12,
		placeholder : 'Enter password',
		rules       : {
			required: true,
			// pattern  : {
			// 	value   : PASSWORD_PATTERN,
			// 	message : 'Password is invalid',
			// },
		},
	},
];

export default updatePasswordControls;
