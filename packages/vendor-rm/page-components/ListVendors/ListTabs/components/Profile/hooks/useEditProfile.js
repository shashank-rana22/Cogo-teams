import { asyncFieldsLocations, useForm, useGetAsyncOptions } from '@cogoport/forms';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import { getControls } from '../../../../../OnBoardVendor/VendorDetails/utils/getControls';

function useEditProfile({ vendor_details = {} }) {
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

	const newFields = [];

	fields.forEach((field) => {
		let newFieldItem = { ...field };

		if (newFieldItem.name === 'registration_proof_url') {
			newFieldItem = {
				...newFieldItem,
				style: {
					flexBasis: '100%',
				},

			};
		}
		if (newFieldItem.name !== 'registration_number') {
			newFields.push(newFieldItem);
		}
	});

	console.log('newFieldsnewFields', newFields);

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
	} = useForm();

	useEffect(() => {
		fields.forEach((field) => {
			setValue(`${field.name}`, vendor_details?.[field.name]);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		newFields,
		control,
		handleSubmit,
		errors,
	};
}

export default useEditProfile;
