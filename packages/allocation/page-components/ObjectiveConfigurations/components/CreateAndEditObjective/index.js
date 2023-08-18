import { forwardRef } from 'react';

import CreateAndEditForm from './CreateAndEditForm';
import Header from './Header';
import useGetDefaultFormValues from './useGetDefaultFormValues';

const CreateAndEditObjective = forwardRef((props, ref) => {
	const { activeMode, setActiveMode } = props;

	const flushRefCallback = () => {
		const tempRef = ref;
		tempRef.current.container = {};
	};

	const { defaultFormValues, loading } = useGetDefaultFormValues({ ref });

	return (
		<>
			<Header
				activeMode={activeMode}
				setActiveMode={setActiveMode}
				flushRefCallback={flushRefCallback}
			/>

			<CreateAndEditForm
				key={loading}
				activeMode={activeMode}
				setActiveMode={setActiveMode}
				defaultFormValues={defaultFormValues}
				flushRefCallback={flushRefCallback}
			/>
		</>
	);
});

export default CreateAndEditObjective;
