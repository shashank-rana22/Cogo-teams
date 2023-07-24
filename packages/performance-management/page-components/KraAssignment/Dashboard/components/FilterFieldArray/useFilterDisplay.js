import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

const useFilterDisplay = ({ setFilters, setShowKRACalculationTable }) => {
	const [showFilter, setShowFilter] = useState(false);

	const { control, handleSubmit, reset, watch, formState: { errors } } = useForm();

	const onSubmit = (values) => {
		let filterApplied = false;

		Object.keys(values).forEach((key) => {
			if (!isEmpty(values[key])) filterApplied = true;
		});

		if (!filterApplied) {
			setShowFilter(false);
			return;
		}

		setFilters({ ...values });
		setShowKRACalculationTable(true);
		setShowFilter(true);
	};

	const onClickReset = () => {
		setFilters({});
		setShowFilter(false);
		reset();
	};

	return {
		watch,
		showFilter,
		setShowFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
		errors,
	};
};

export default useFilterDisplay;
