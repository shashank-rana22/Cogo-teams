import { Select, MultiSelect } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
// import MultiSelectController from '@cogoport/forms/page-components/Controlled/MultiSelectController';
// import SelectController from '@cogoport/forms/page-components/Controlled/SelectController';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import React from 'react';

function Home() {
	// const { control, handleSubmit } = useForm();
	const [value, setValue] = React.useState('0018f54f-cadb-4418-82a3-16a1e747f9fd');
	const [multiVal, setMultiVal] = React.useState([
		'0018f54f-cadb-4418-82a3-16a1e747f9fd',
		'000095e6-998f-4ebf-aa07-0a6df216dba7',
		'2055caca-bffa-4575-97bc-371ca40088a9']);

	const selectOptions = useGetAsyncOptions({
		...asyncFieldsLocations(),
	});

	return (
		<div>
			<h1>Home</h1>

			Async Select with prefilled values
			 <Select
				value={value}
				name="name"
				placeholder="Select"
				onChange={setValue}
				isClearable
				{...selectOptions}
			 />
			<MultiSelect
				value={multiVal}
				name="name"
				placeholder="Select"
				onChange={setMultiVal}
				{...selectOptions}
			/>
		</div>
	);
}

export default Home;
