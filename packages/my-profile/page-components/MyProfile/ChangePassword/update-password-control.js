// const PASSWORD_PATTERN =	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/gm;

import validatePassword from '../PasswordValidator/utils/validatePassword';

const updatePasswordControls = () => [
	{
		name        : 'password',
		label       : 'Password',
		type        : 'text',
		size        : 'lg',
		span        : 12,
		placeholder : 'Enter password',
		rules       : {
			required : true,
			validate : (value) => validatePassword({
				value,
				errorMessage: 'Password is invalid',
			}),
		},
	},
];

export default updatePasswordControls;
