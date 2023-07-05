export const basicFreightLowToHigh = ({ list }) => {
	const sorted_list = (list || []).sort((a, b) => {
		const a_total_price_discounted = a.freight_price_discounted;

		const b_total_price_discounted = b.freight_price_discounted;

		return a_total_price_discounted - b_total_price_discounted;
	});

	return sorted_list;
};

export const basicFreightHighToLow = ({ list }) => {
	const sorted_list = (list || []).sort((a, b) => {
		const a_total_price_discounted = a.freight_price_discounted;

		const b_total_price_discounted = b.freight_price_discounted;

		return b_total_price_discounted - a_total_price_discounted;
	});
	return sorted_list;
};
export const transitTimeLowToHigh = ({ list }) => {
	const sorted_list = (list || []).sort(
		(a, b) => a.transit_time - b.transit_time,
	);
	return sorted_list;
};

export const transitTimeHighToLow = ({ list }) => {
	const sorted_list = (list || []).sort(
		(a, b) => b.transit_time - a.transit_time,
	);
	return sorted_list;
};

export const detentionFreeLimitLowToHigh = ({ list }) => {
	const sorted_list = (list || []).sort(
		(a, b) => a.destination_detention?.free_limit - b.destination_detention?.free_limit,
	);
	return sorted_list;
};

export const detentionFreeLimitHighToLow = ({ list }) => {
	const sorted_list = (list || []).sort(
		(a, b) => b.destination_detention?.free_limit - a.destination_detention?.free_limit,
	);
	return sorted_list;
};

export const totalFreightLowToHigh = ({ list }) => {
	const sorted_list = (list || []).sort((a, b) => a.total_price_discounted - b.total_price_discounted);

	return sorted_list;
};

export const totalFreightHighToLow = ({ list }) => {
	const sorted_list = (list || []).sort((a, b) => b.total_price_discounted - a.total_price_discounted);

	return sorted_list;
};
