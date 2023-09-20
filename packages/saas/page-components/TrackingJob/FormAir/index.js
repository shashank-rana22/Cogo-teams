import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import NestedLayout from '../../../common/NestedLayout';
import controls from '../configurations/controls-air';
import useGetAirData from '../hooks/useGetAirData';

// import LocationFormat from './Locations';

function Form({ refetch, showUpdate, setShowUpdate }) {
	const { control, handleSubmit, formState:{ errors = {} }, watch, setValue } = useForm({

	});

	// const { onSubmit } = useGetAirData({ reset, refetch });
	// const handleData = (data) => {
	// 	const valuesData = data;
	// 	valuesData?.locations?.map((_, i) => {
	// 		valuesData.locations[i].milestones = data.milestones[i];
	// 		return null;
	// 	});
	// 	delete valuesData.milestones;
	// 	const updatedData = {
	// 		...valuesData,
	// 	};
	// 	onSubmit(updatedData, showUpdate, setShowUpdate);
	// };

	return (
		<div>
			<div>
				{/* <Button onClick={handleSubmit(handleData)}>Submit</Button> */}
			</div>
			<Button>Submit</Button>
			<NestedLayout control={control} controls={controls} />
		</div>
	);
}

export default Form;
