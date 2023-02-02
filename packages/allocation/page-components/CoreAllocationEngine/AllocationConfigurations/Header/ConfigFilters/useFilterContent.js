import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import controls from '../../../../../utils/get-configurations-filter-controls';

const useFilterContent = () => {
	const [showFilters, setShowFilters] = useState(false);

	const formProps = useForm();

	return { controls, formProps, showFilters, setShowFilters };
};

export default useFilterContent;
