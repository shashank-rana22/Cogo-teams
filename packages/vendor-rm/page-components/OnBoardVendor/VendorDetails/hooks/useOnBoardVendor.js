import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

// eslint-disable-next-line import/no-cycle
import TABS_MAPPING from '../../../../constants/tabs';
import { getControls } from '../utils/getControls';

function useOnBoardVendor({ setActiveStepper = () => {} }) {
	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));

	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['city'] } },
	}));

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
		const formattedValues = getValues();

		const payload = {
			...formattedValues,
			registration_proof_url: formattedValues?.registration_proof_url?.finalUrl,
		};

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
