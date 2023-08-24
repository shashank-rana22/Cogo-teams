import { useForm } from '@cogoport/forms';
import { useState } from 'react';

const useFilterPopover = ({ setFilters }) => {
	const [showFilter, setShowFilter] = useState(false);

	const { control, handleSubmit, reset } = useForm();

	const onSubmit = (values) => {
		const { roles, joining_date, department } = values;
		console.log(values, 'valuesvalues');
		const filterApplied = Boolean(roles || department || (joining_date?.startDate || joining_date?.endDate));

		if (!filterApplied) {
			setShowFilter(false);
			return;
		}

		setFilters({ ...values });

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
