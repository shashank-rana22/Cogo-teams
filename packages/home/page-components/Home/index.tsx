import { Select } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import MultiSelectController from '@cogoport/forms/page-components/Controlled/MultiSelectController';
import SelectController from '@cogoport/forms/page-components/Controlled/SelectController';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import React from 'react';

function Home() {
	const [value, setValue] = React.useState('00009cf1-3803-45fd-9897-619152276a6a');
	const { control, handleSubmit } = useForm();

	const selectOptions = useGetAsyncOptions({
		...asyncFieldsLocations(),
	});

	const onSubmit = (data:any) => {
		console.log(data);
	};

	console.log('value', value);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>Home</h1>
			<Select
				value={value}
				onChange={setValue}
				name="name"
				placeholder="Select test"
				{...selectOptions}
			/>
			<MultiSelectController name="name2" control={control} placeholder="Select" {...selectOptions} />
		</form>
	);
}

export default Home;
