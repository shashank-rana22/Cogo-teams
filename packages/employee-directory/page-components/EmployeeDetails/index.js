import HRBPView from './HRBPView';
import HROPSView from './HROPSView';

function EmployeeDetails({
	employeeDetails = {}, onClose = () => {}, show = false, refetch = () => {},
	isHRAdmin = false,
}) {
	if (isHRAdmin) {
		return <HROPSView show={show} onClose={onClose} employeeDetails={employeeDetails} refetch={refetch} />;
	}

	return <HRBPView show={show} onClose={onClose} employeeDetails={employeeDetails} />;
}

export default EmployeeDetails;
