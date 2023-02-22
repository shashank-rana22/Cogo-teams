// const {format} from '@cogoport/utils/';

const useGetTableData = () => {
	// const formatDate = (date) => format(date, 'dd MMM yyyy');
	const columns = [
		{
			Header   : <div>SELECT ALL</div>,
			id       : 'a',
			accessor : ({ billId = '' }) => (
				<section>
					{billId}
				</section>
			),
		},
		{
			Header   : <div>ORGANIZATION</div>,
			id       : 'b',
			accessor : ({ organization = '' }) => (
				<section>
					{organization}
				</section>
			),
		},
		{
			Header   : <div>TYPE</div>,
			id       : 'c',
			accessor : ({ type = '' }) => (
				<section>
					{type}
				</section>
			),
		},
		{
			Header   : <div>SUB-TYPE</div>,
			id       : 'd',
			accessor : ({ sub_type = '' }) => (
				<section>
					{sub_type}
				</section>
			),
		},
		{
			Header   : <div>CREATION DATE</div>,
			id       : 'e',
			accessor : ({ createdDate = '' }) => (
				<section>
					{' '}
					{createdDate}
					{/* {formatDate(createdDate)} */}
				</section>
			),
		},
		{
			Header   : <div>KAM</div>,
			id       : 'f',
			accessor : ({ kam = '' }) => (
				<section>
					{kam}
					{/* {formatDate(createdDate)} */}
				</section>
			),
		},
		{
			Header   : <div>COGO-ENTITY</div>,
			id       : 'g',
			accessor : ({ createdDate = '' }) => (
				<section>
					{' '}
					{createdDate}
				</section>
			),
		},
	];

	return {
		columns,
		// data,
		// loading,
	};
};

export default useGetTableData;
