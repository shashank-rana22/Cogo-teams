import { useState } from 'react';
import useEditQuote from './useEditQuote';

const useUpdateRate = (props) => {
	const [errors, setErrors] = useState({});

	const { shipment_data } = props;

	const useEditQuoteData = useEditQuote({
		shipmentData: shipment_data,
		...props,
	});

	const onError = (err) => {
		setErrors(err);
	};

	return {
		errors,
		setErrors,
		useEditQuoteData,
		onError,
	};
};

export default useUpdateRate;
