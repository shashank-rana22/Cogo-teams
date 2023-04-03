/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import { useEffect } from 'react';

const useResetErrors = ({ errors, currentStateErrors, setErrors }) => {
	useEffect(() => {
		Object.keys(errors).forEach((key) => {
			if (!currentStateErrors[key]) {
				delete errors[key];
			}
		});
		setErrors({ ...errors });
	}, [JSON.stringify(currentStateErrors)]);
};

export default useResetErrors;
