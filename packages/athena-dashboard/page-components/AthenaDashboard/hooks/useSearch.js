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
		const {
			hs_code,
			shipment_type_values,
			shipment_mode_values,
			incoterm_values,
			origin_country,
			destination_country,
			origin_port,
			destination_port,
		} = formValues;

		await trigger({
			data: {
				page       : 1,
				page_limit : 100,
				sort_type  : 'desc',
				sort_by    : 'shipment_date',
				filters    : {
					hs_code        : hs_code || undefined,
					shipment_type  : shipment_type_values || undefined,
					shipment_mode  : shipment_mode_values || undefined,
					incoterm       : incoterm_values || undefined,
					origin_country : origin_country.map((
						country,
					) => country.toUpperCase()) || undefined,
					destination_country: destination_country.map((
						country,
					) => country.toUpperCase()) || undefined,
					origin_port: origin_port.map((
						country,
					) => country.toUpperCase()) || undefined,
					destination_port: destination_port.map((
						country,
					) => country.toUpperCase()) || undefined,
				},
				start_date               : start_date || undefined,
				end_date                 : end_date || undefined,
				pagination_data_required : false,
			},
		});
	};

	return {
		loading,
		date,
		setDate,
		response: (responseData || []).list,
		control,
		handleClick,
		handleSubmit,
	};
};

export default useSearch;
