import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import MultiSelectController from '@cogoport/forms/page-components/Controlled/MultiSelectController';
import SelectController from '@cogoport/forms/page-components/Controlled/SelectController';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import React from 'react';

function Home() {
	const { control, handleSubmit } = useForm();

	const selectOptions = useGetAsyncOptions({
		...asyncFieldsLocations(),
		initialCall : false,
		labelKey    : 'display_name',
	});

	return (
		<div>
			<h1>Home</h1>

			<SelectController name="name" control={control} placeholder="Select" {...selectOptions} />
			<MultiSelectController name="name2" control={control} placeholder="Select" {...selectOptions} />
		</div>
	);
}

export default Home;
