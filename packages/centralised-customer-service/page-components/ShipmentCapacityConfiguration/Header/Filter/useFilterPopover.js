import { useForm } from '@cogoport/forms';
import { useState } from 'react';

const DEFAULT_PAGE = 1;

const useFilterPopover = ({ setFilters = () => {}, setPage = () => {} }) => {
	const [showFilter, setShowFilter] = useState(false);

	const { control, handleSubmit, reset } = useForm();

	const onSubmit = (values) => {
		setFilters({ ...values });
		setPage(DEFAULT_PAGE);

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
