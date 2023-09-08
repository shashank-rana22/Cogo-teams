import { useForm } from '@cogoport/forms';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';

const useFilterPopover = ({ setFilters }) => {
	const profileData = useSelector(({ profile }) => profile);

	const dispatch = useDispatch();

	const [showFilter, setShowFilter] = useState(false);

	const { control, handleSubmit, setValue } = useForm();

	const onSubmit = (values) => {
		const { roles, joining_date, department } = values;
		const filterApplied = Boolean(roles || department || (joining_date?.startDate || joining_date?.endDate));

		if (!filterApplied) {
			setShowFilter(false);
			return;
		}

		dispatch(
			setProfileState({
				...profileData,
				user: {
					...profileData?.user,
					new_hire_dashboard: {
						...profileData?.user?.new_hire_dashboard,
						filters: { ...values },
					},
				},
			}),
		);

		setFilters({ ...values });

		setShowFilter(false);
	};

	const onClickReset = async () => {
		await dispatch(
			setProfileState({
				...profileData,
				user: {
					...profileData?.user,
					new_hire_dashboard: {
						...profileData?.user?.new_hire_dashboard,
						filters: {},
					},
				},
			}),
		);

		setFilters({});
		setShowFilter(false);
		setValue('roles', null);
		setValue('department', null);
		setValue('joining_date', null);
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
