import { isEmpty } from '@cogoport/utils';

const REQUIRED_TOTAL_WEIGHTAGE = 100;
const INITAL_SUM = 0;

const validateTotalWeightage = ({ objective_weightages }) => {
	if (isEmpty(objective_weightages)) return true;

	const isValidWeightages = objective_weightages.every((item) => {
		const { user_objective_weightages = [] } = item;

		const totalWeightage = user_objective_weightages.reduce((sum, value) => {
			const { weightage } = value;

			return sum + weightage;
		}, INITAL_SUM);

		return totalWeightage === REQUIRED_TOTAL_WEIGHTAGE;
	});

	return isValidWeightages;
};

export default validateTotalWeightage;
