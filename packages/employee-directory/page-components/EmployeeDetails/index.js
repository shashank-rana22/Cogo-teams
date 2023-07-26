import { useSelector } from '@cogoport/store';

const EmployeeDetails = () => {
	const profile = useSelector((state) => state.profile || {});

	console.log('profile', profile);
};

export default EmployeeDetails;
