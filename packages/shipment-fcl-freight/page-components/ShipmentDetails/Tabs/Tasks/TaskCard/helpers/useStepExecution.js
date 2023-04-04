import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

function useStepExecution({
	task = {},
	// stepConfig = {},
	// primaryService = {},
	// getApisData = {},
	// // selectedMail,
}) {
	const { servicesList } = useContext(ShipmentDetailContext);
	console.log('service get ', servicesList);
	console.log('task', task);
	// import service list from context
	return {
		ada: 'asda',
	};
}
export default useStepExecution;
