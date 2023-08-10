import { useEffect } from 'react';

const useResetErrors = ({ errors, currentStateErrors, setErrors }) => {
	const newErrors = errors;
	useEffect(() => {
		Object.keys(newErrors).forEach((key) => {
			if (!currentStateErrors[key]) {
				delete newErrors[key];
			}
		});
		setErrors({ ...newErrors });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(currentStateErrors)]);
};

export default useResetErrors;
