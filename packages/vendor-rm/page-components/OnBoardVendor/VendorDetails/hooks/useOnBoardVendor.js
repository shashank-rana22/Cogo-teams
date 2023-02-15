import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';

// eslint-disable-next-line import/no-cycle
import TABS_MAPPING from '../../../../constants/tabs';
import { getControls } from '../utils/getControls';

function useOnBoardVendor({ setActiveStepper = () => {} }) {
	const countryOptions = useGetAsyncOptions({
		params: { filters: { type: ['country'] } },
		...asyncFieldsLocations(),
	});

	const cityOptions = useGetAsyncOptions({
		params: { filters: { type: ['city'] } },
		...asyncFieldsLocations(),
	});

	// import SERVICABLE_COUNTRY_IDS from '@cogoport/forms/config/servicableCountries';

	// const countrywiseOptions = {
	// 	[SERVICABLE_COUNTRY_IDS.IN]: [
	// 		{
	// 			label : 'PAN',
	// 			value : 'pan',
	// 		},
	// 		{
	// 			label : 'GST',
	// 			value : 'gstin',
	// 		},
	// 	],
	// 	[SERVICABLE_COUNTRY_IDS.VN]: [
	// 		{
	// 			label : 'ECN',
	// 			value : 'ecn',
	// 		},
	// 		{
	// 			label : 'Tax',
	// 			value : 'tax',
	// 		},
	// 	],
	// };

	const fields = getControls({
		countryOptions,
		cityOptions,
	});

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_vendor',
		method : 'post',
	}, { manual: true });

	const createVendor = async (step) => {
		console.log(step);
		const formattedValues = getValues();

		const payload = { ...formattedValues };
		try {
			const res = await trigger({ data: { ...payload } });

			if (res?.data) {
				Toast.success('Vendor created successfully');
				setActiveStepper(TABS_MAPPING[step]);
			}
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};

	return {
		fields,
		control,
		errors,
		handleSubmit,
		createVendor,
		loading,
	};
}

export default useOnBoardVendor;
