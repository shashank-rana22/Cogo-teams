import { Select, MultiSelect } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import React from 'react';

function Home() {
	const [value, setValue] = React.useState('0018f54f-cadb-4418-82a3-16a1e747f9fd');
	const [multiVal, setMultiVal] = React.useState([
		'0018f54f-cadb-4418-82a3-16a1e747f9fd',
		'000095e6-998f-4ebf-aa07-0a6df216dba7',
		'2055caca-bffa-4575-97bc-371ca40088a9',
	]);

	const selectOptions = useGetAsyncOptions({
		...asyncFieldsLocations(),
	});

	const multiSelectOptions = useGetAsyncOptions({
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
				isClearable
				onChange={setValue}
				{...selectOptions}
			/>
			<MultiSelect
				value={multiVal}
				name="name"
				placeholder="Select"
				isClearable
				onChange={setMultiVal}
				{...multiSelectOptions}
			/>

			<br/>
		</div>
	);
}

export default Home;
