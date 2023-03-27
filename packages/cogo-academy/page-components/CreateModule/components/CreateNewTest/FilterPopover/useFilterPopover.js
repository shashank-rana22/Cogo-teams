import { useForm } from '@cogoport/forms';
import { useState } from 'react';

const useFilterPopover = ({ setFilters }) => {
	const [showFilter, setShowFilter] = useState(false);

	const { control, handleSubmit } = useForm();

	const onSubmit = (values) => {
		setFilters({
			cogo_entity_id: values?.cogo_entity_id,
		});

		setShowFilter(false);
	};

	const onClickReset = () => {
		setFilters({});
		setShowFilter(false);
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
