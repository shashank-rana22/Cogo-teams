import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';

import { getControls } from '../utils/getControls';

function useOnBoardVendor() {
	const countryOptions = useGetAsyncOptions({
		params: { filters: { type: ['country'] } },
		...asyncFieldsLocations(),
	});

	const cityOptions = useGetAsyncOptions({
		params: { filters: { type: ['city'] } },
		...asyncFieldsLocations(),
	});

	const fields = getControls({
		countryOptions,
		cityOptions,
	});

	const {
		control,
		formState: { errors },
	} = useForm();

	return {
		fields,
		control,
		errors,
	};
}

export default useOnBoardVendor;
