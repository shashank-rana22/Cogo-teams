import { useEffect } from 'react';

const useResetErrors = ({ errors, currentStateErrors, setErrors }) => {
	useEffect(() => {
		Object.keys(errors).forEach((key) => {
			if (!currentStateErrors[key]) {
				// eslint-disable-next-line no-param-reassign
				delete errors[key];
			}
		});
		setErrors({ ...errors });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(currentStateErrors)]);
};

export default useResetErrors;
