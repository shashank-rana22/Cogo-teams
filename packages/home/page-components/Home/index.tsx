import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import MultiSelectController from '@cogoport/forms/page-components/Controlled/MultiSelectController';
import SelectController from '@cogoport/forms/page-components/Controlled/SelectController';
import React from 'react';

function Home() {
	const { control, handleSubmit } = useForm();

	const selectOptions = useGetAsyncOptions({
		endpoint    : '/list_locations',
		params      : { filters: { q: 'test' } },
		valueKey    : 'id',
		labelKey    : 'name',
		initialCall : true,
	});

	return (
		<div>
			<SelectController name="name" control={control} placeholder="Select" {...selectOptions} />
			<MultiSelectController name="name2" control={control} placeholder="Select" {...selectOptions} />
			<h1>Home</h1>
		</div>
	);
}

export default Home;
