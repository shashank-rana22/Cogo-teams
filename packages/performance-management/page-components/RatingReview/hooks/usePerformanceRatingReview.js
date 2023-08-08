const usePerformanceRatingReview = ({
	setSelectedEmployees, data, setToggleVal = () => {}, toggleVal,
}) => {
	const onClickCheckbox = ({ event, item, identifier_key }) => {
		setSelectedEmployees((previousValue) => {
			let newCheckedValues = {};

			const previousIds = previousValue?.[identifier_key] || [];

			if (event.target?.checked) {
				newCheckedValues = {
					...previousValue,
					[identifier_key]: [...previousIds, item?.employee_id],
				};
			} else {
				newCheckedValues = {
					...previousValue,
					[identifier_key]: previousIds.filter((selectedId) => selectedId !== item?.employee_id),
				};
			}

			return newCheckedValues;
		});
	};

	const onClickHeaderCheckbox = ({ event, identifier_key }) => {
		const { details } = (data || []).find((item) => (item?.label === identifier_key));
		const employeeIds = (details || []).map((employee) => (employee?.employee_id));

		setSelectedEmployees((previousValue) => {
			let newCheckedValues = {};

			if (event.target?.checked) {
				newCheckedValues = { ...previousValue, [identifier_key]: employeeIds };
			} else {
				newCheckedValues = {
					...previousValue,
					[identifier_key]: [],
				};
			}

			return newCheckedValues;
		});
	};

	const selectedEmployeeList = ({ item, event }) => {
		const id = item?.employee_id;

		setToggleVal({ ...toggleVal, [id]: event?.target?.checked });
	};
	return { onClickCheckbox, onClickHeaderCheckbox, selectedEmployeeList };
};

export default usePerformanceRatingReview;
