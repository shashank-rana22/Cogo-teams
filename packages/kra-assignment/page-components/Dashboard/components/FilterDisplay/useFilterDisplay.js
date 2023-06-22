import { useForm } from '@cogoport/forms';
import { useState } from 'react';

const CHECK_LENGTH = 0;

const useFilterDisplay = ({
	setFilters,
	setSelectArrayAccordian,
	setSelectArrayLowWeightEmployee,
	setSelectArrayUnassignedEmployee,
}) => {
	const [showFilter, setShowFilter] = useState(false);

	const { control, handleSubmit, reset, watch } = useForm();

	const onSubmit = (values) => {
		let filterApplied = false;

		Object.keys(values).forEach((key) => {
			if (values[key]?.length > CHECK_LENGTH) filterApplied = true;
		});

		if (!filterApplied) {
			setShowFilter(false);
			return;
		}

		setFilters({ ...values });
		setSelectArrayAccordian([]);
		setSelectArrayLowWeightEmployee([]);
		setSelectArrayUnassignedEmployee([]);
		setShowFilter(true);
	};

	const onClickReset = () => {
		setFilters({});
		setShowFilter(false);
		reset();
		setSelectArrayAccordian([]);
		setSelectArrayLowWeightEmployee([]);
		setSelectArrayUnassignedEmployee([]);
	};

	return {
		showFilter,
		setShowFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
		watch,
	};
};

export default useFilterDisplay;
