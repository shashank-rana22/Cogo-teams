import { useForm } from '@cogoport/forms';
import { useAthenaRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useSearch = () => {
	const [date, setDate] = useState('');
	const [answer, setAnswer] = useState([]);

	const formProps = useForm();

	const { control, handleSubmit } = formProps;

	const start_date = date.startDate;
	const end_date = date.endDate;

	const [{ loading = true, data: responseData = {} }, trigger] = useAthenaRequest({
		url    : 'shipments_by_hscode',
		method : 'post',
	}, { manual: true });

	const handleClick = async (formValues) => {
		setAnswer([]);
		await trigger({
			data: {
				// page       : x,
				page_limit : 100,
				sort_type  : 'desc',
				sort_by    : 'shipment_date',
				filters    : {
					hs_code        : formValues.hs_code || undefined,
					shipment_type  : formValues.shipment_type_values || undefined,
					shipment_mode  : formValues.shipment_mode_values || undefined,
					incoterm       : formValues.incoterm_values || undefined,
					origin_country : formValues.origin_country.map((
						country,
					) => country.toString().toUpperCase()) || undefined,
					destination_country: formValues.destination_country.map((
						country,
					) => country.toString().toUpperCase()) || undefined,
					origin_port: formValues.origin_port.map((
						country,
					) => country.toString().toUpperCase()) || undefined,
					destination_port: formValues.destination_port.map((
						country,
					) => country.toString().toUpperCase()) || undefined,
				},
				start_date               : start_date || 'NaN-NaN-NaN',
				end_date                 : end_date || 'NaN-NaN-NaN',
				pagination_data_required : false,
			},
		});
	};

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setAnswer(responseData.list);
			// if (!localStorage.getItem('total')) localStorage.setItem('total', responseData.total);
		}
	}, [responseData]);

	return {
		loading,
		date,
		setDate,
		answer,
		control,
		handleClick,
		handleSubmit,
	};
};

export default useSearch;
