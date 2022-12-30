import { useForm } from '@cogoport/forms';
import { Upload } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import MultiSelectController from '@cogoport/forms/page-components/Controlled/MultiSelectController';
import SelectController from '@cogoport/forms/page-components/Controlled/SelectController';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import React,{useState} from 'react';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader/index';

function Home() {
	const { control, handleSubmit } = useForm();

	const selectOptions = useGetAsyncOptions({
		...asyncFieldsLocations(),
		initialCall: false,
	});
const [value,setValue]=useState()

const onChange=(val)=>{
	setValue(val)
}
	const onSubmit = (data:any) => {
		console.log(data);
	};

	console.log("value", value)

	return (
		<>
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>Home</h1>
			<SelectController name="name" control={control} placeholder="Select" {...selectOptions} />
			<MultiSelectController name="name2" control={control} placeholder="Select" {...selectOptions} />
		</form>
		<Upload value={value} multiple={true}  onChange={onChange} loading={false} />
		</>
	);
}

export default Home;
