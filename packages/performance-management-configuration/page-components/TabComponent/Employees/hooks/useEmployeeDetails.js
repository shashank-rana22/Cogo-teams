import { useState } from 'react';

const useEmployeeDetails = () => {
	const [search, setSearch] = useState();

	return {
		search,
		setSearch,
	};
};

export default useEmployeeDetails;
