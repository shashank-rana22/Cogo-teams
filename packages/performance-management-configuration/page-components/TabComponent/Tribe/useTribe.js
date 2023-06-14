import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import getColumns from './getColumns';

const useTribe = () => {
	const [search, setSearch] = useState('');
	const [showAddTribeModal, setShowAddTribeModal] = useState(false);

	const { control, formState: { errors }, handleSubmit } = useForm();

	const columns = getColumns();

	return {
		columns,
		search,
		setSearch,
		showAddTribeModal,
		setShowAddTribeModal,
		control,
		errors,
		handleSubmit,
	};
};

export default useTribe;
