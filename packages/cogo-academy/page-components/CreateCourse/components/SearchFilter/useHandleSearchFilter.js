import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

const DEFAULT_LIST_LENGTH = 0;

const useHandleSearchFilter = ({ setFilters }) => {
	const router = useRouter();

	const [showFilter, setShowFilter] = useState(false);
	const [showRecordedSession, setShowRecordedSession] = useState(false);

	const { control, handleSubmit, reset } = useForm();

	const onSubmit = (values) => {
		let filterApplied = false;

		Object.keys(values).forEach((key) => {
			if (values[key]?.length > DEFAULT_LIST_LENGTH) filterApplied = true;
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

	return {
		showFilter,
		setShowFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
		reset,
		onClickCreate,
		showRecordedSession,
		setShowRecordedSession,
	};
};

export default useHandleSearchFilter;
