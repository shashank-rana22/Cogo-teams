import { useSelector } from '@cogoport/store';

import HRBPView from './HRBPView';
import HROPSView from './HROPSView';

function EmployeeDetails({ employeeDetails = {}, onClose = () => {}, show = false, refetch = () => {} }) {
	const profile = useSelector((state) => state.profile || {});
	const { auth_role_data } = profile;
	const { name } = auth_role_data || {};

	if (name === 'Superadmin') {
		return <HROPSView show={show} onClose={onClose} employeeDetails={employeeDetails} refetch={refetch} />;
	}

	return <HRBPView show={show} onClose={onClose} employeeDetails={employeeDetails} />;
}

export default EmployeeDetails;
