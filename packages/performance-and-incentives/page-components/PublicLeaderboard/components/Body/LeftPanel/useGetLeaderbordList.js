function useGetLeaderbordList() {
	const data = {
		list: [
			{
				id         : 1,
				name       : 'Khushal Paliwal',
				// eslint-disable-next-line max-len
				picture    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/e989562eb201867430b86c550e0c1137/1673881661052.jpeg',
				rank       : 1,
				score      : 1000,
				percentile : 100,
			},
			{
				id         : 2,
				name       : 'Parth Samnani',
				picture    : null,
				rank       : 2,
				score      : 995,
				percentile : 97.7,
			},
			{
				id         : 3,
				name       : 'Sagar Paliwal',
				picture    : null,
				rank       : 3,
				score      : 980,
				percentile : 95.33,
			},
			{
				id         : 4,
				name       : 'Sahil Kala',
				picture    : null,
				rank       : 4,
				score      : 950,
				percentile : 93.02,
			},
			{
				id         : 5,
				name       : 'Bhargav Priyadarshi',
				picture    : null,
				rank       : 5,
				score      : 930,
				percentile : 91.98,
			},
			{
				id         : 6,
				name       : 'Mohit Nagar',
				picture    : null,
				rank       : 6,
				score      : 900,
				percentile : 89.2,
			},
			{
				id         : 7,
				name       : 'Vimal Sardhara',
				picture    : null,
				rank       : 7,
				score      : 889,
				percentile : 86.0,
			},
			{
				id         : 8,
				name       : 'Madhesh Medasani',
				picture    : null,
				rank       : 8,
				score      : 870,
				percentile : 85.98,
			},
		],
		page        : 1,
		page_limit  : 10,
		total       : 8,
		total_count : 8,
	};

	const { list, ...paginationData } = data;

	return { list, paginationData };
}

export default useGetLeaderbordList;
