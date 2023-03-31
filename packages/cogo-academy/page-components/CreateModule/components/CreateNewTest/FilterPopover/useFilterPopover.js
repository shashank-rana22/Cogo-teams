import { useForm } from '@cogoport/forms';
import { useState } from 'react';

const useFilterPopover = ({ setFilters }) => {
	const [showFilter, setShowFilter] = useState(false);

	const { control, handleSubmit, reset } = useForm();

	const onSubmit = (values) => {
		setFilters((prev) => ({
			...prev,
			cogo_entity_id: values?.cogo_entity_id,
		}));

		setShowFilter(false);
	};

	const onClickReset = () => {
		setFilters({});
		setShowFilter(false);
		reset();
	};

	return {
		showFilter,
		setShowFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
	};
};

export default useFilterPopover;
