import { forwardRef } from 'react';

import CreateAndEditForm from './CreateAndEditForm';
import Header from './Header';
import useGetDefaultFormValues from './useGetDefaultFormValues';

const CreateAndEditObjective = forwardRef((props, ref) => {
	const { activeMode, setActiveMode } = props;

	const flushRef = () => {
		const tempRef = ref;
		tempRef.current.container = {};
	};

	const { defaultFormValues, loading } = useGetDefaultFormValues({ ref });

	console.log('defaultFormValues :: ', defaultFormValues);

	return (
		<>
			<Header
				activeMode={activeMode}
				setActiveMode={setActiveMode}
				flushRef={flushRef}
			/>

			<CreateAndEditForm
				key={loading}
				activeMode={activeMode}
				setActiveMode={setActiveMode}
				defaultFormValues={defaultFormValues}
			/>
		</>
	);
});

export default CreateAndEditObjective;
