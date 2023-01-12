import { useSelector } from '@cogoport/store';

import useGetContract from '../../hooks/useGetContract';
import useUpdateContract from '../../hooks/useUpdateContract';

import Body from './Body';
import Header from './Header';
import Loader from './Loader';

function DetailView() {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));
	const { data, loading } = useGetContract({ id: query?.id });
	const { updateContract } = useUpdateContract();

	const handleUpdateContract = async (val) => {
		await updateContract({
			payload: {
				id     : query?.id,
				status : val,
			},
		});
	};

	let content = (
		<Loader />
	);

	if (data?.id && !loading) {
		content = (
			<>
				{' '}
				<Header data={data} status={query?.status} handleUpdateContract={handleUpdateContract} />
				<Body data={data} />
			</>
		);
	}

	return (
		<div>
			{content}
		</div>
	);
}

export default DetailView;
