import { forwardRef } from 'react';

import CreateAndEditForm from './CreateAndEditForm';
import Header from './Header';
import useGetDefaultFormValues from './useGetDefaultFormValues';

const CreateAndEditObjective = forwardRef((props, ref) => {
	const { activeMode, setActiveMode } = props;

	const { defaultFormValues } = useGetDefaultFormValues({ ref });

	return (
		<>
			<Header
				activeMode={activeMode}
				setActiveMode={setActiveMode}
			/>

			<CreateAndEditForm
				activeMode={activeMode}
				setActiveMode={setActiveMode}
				defaultFormValues={defaultFormValues}
			/>
		</>
	);
});

export default CreateAndEditObjective;
