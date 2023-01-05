import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

import getControls from '../configurations/create-form';

const useCreateUpdate = () => {
	const {
		handleSubmit, getValues, control, formState: { errors },
		watch,
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_location',
		method : 'post',
	}, { manual: true });

	const onCreate = async () => {
		const formattedValues = getValues();
		formattedValues.is_icd = formattedValues.is_icd === 'Yes';

		const payload = { ...formattedValues };

		try {
			const res = await trigger({ data: { ...payload } });
			if (res?.data) {
				Toast.success('Location created successfully');
			}
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};

	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));

	const zoneOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['zone'] } },
	}));

	const regionOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['region'] } },
	}));

	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['city'] } },
	}));

	const clusterOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['cluster'] } },
	}));

	const pincodeOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['pincode'] } },
	}));

	const cfsOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['cfs'] } },
	}));

	const fields = getControls({
		countryOptions,
		zoneOptions,
		regionOptions,
		cityOptions,
		clusterOptions,
		pincodeOptions,
		cfsOptions,
	});

	return {
		handleSubmit,
		errors,
		watch,
		control,
		loading,
		onCreate,
		fields,
	};
};

export default useCreateUpdate;
