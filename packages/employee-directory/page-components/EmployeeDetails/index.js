import HRBPView from './HRBPView';
import HROPSView from './HROPSView';

function EmployeeDetails({
	employeeDetails = {}, onClose = () => {}, show = false, refetch = () => {},
	isHRAdmin = false, statsRefetch = () => {},
}) {
	if (isHRAdmin) {
		return (
			<HROPSView
				show={show}
				onClose={onClose}
				employeeDetails={employeeDetails}
				refetch={refetch}
				statsRefetch={statsRefetch}
			/>
		);
	}

	return <HRBPView show={show} onClose={onClose} employeeDetails={employeeDetails} />;
}

export default EmployeeDetails;
