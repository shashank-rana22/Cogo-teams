import { useForm } from '@cogoport/forms';
import { useState } from 'react';

const useFilterPopover = ({ setFilters }) => {
	const [showFilter, setShowFilter] = useState(false);

	const { control, handleSubmit, reset } = useForm();

	const onSubmit = (values) => {
		let filterApplied = false;

		if (values?.roles) {
			filterApplied = true;
		}

		if (values?.joining_date?.startDate || values?.joining_date?.endDate) {
			filterApplied = true;
		}

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
