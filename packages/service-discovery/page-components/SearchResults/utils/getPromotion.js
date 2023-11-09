const getPromotion = ({ promocodes = [] }) => {
	const promotion = promocodes.find((promocode) => {
		const { is_applicable, is_eligible } = promocode.eligibility_checks || {};
		return is_applicable && is_eligible;
	}) || {};

	return promotion;
};

export default getPromotion;
