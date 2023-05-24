import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

const useHandleSearchFilter = ({ setFilters }) => {
	const router = useRouter();

	const [showFilter, setShowFilter] = useState(false);

	const { control, handleSubmit, reset } = useForm();

	const onSubmit = (values) => {
		let filterApplied = false;

		Object.keys(values).forEach((key) => {
			if (values[key]?.length > 0) filterApplied = true;
		});

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

	const onClickCreate = () => {
		router.push(
			'/learning/course/create',
			'/learning/course/create',
		);
	};

	const onClickCreateQuestion = () => {
		router.push(
			'/learning/course/create-question',
			'/learning/course/create-question',
		);
	};

	return {
		showFilter,
		setShowFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
		reset,
		onClickCreate,
		onClickCreateQuestion,
	};
};

export default useHandleSearchFilter;
