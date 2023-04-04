import { useForm } from '@cogoport/forms';
import { useAthenaRequest } from '@cogoport/request';
import { useState } from 'react';

const useSearch = () => {
	const [date, setDate] = useState('');

	const formProps = useForm();

	const { control, handleSubmit } = formProps;

	const start_date = date.startDate;
	const end_date = date.endDate;

	const [{ loading = false, data: responseData = {} }, trigger] = useAthenaRequest({
		url    : 'shipments_by_hscode',
		method : 'post',
	}, { manual: true });

	const handleClick = async (formValues) => {
		await trigger({
			data: {
				page       : 1,
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
				start_date               : start_date || '2022-04-01',
				end_date                 : end_date || '2023-03-31',
				pagination_data_required : false,
			},
		});
	};

	return {
		loading,
		date,
		setDate,
		response: responseData.list,
		control,
		handleClick,
		handleSubmit,
	};
};

export default useSearch;
