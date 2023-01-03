import { useSelector } from '@cogoport/store';

import useGetContract from '../../hooks/useGetContract';

import Body from './Body';
import Header from './Header';
import Loader from './Loader';

function DetailView() {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));
	const { data, loading } = useGetContract({ id: query?.id });

	let content = (
		<Loader />
	);

	if (data?.id && !loading) {
		content = (
			<>
				{' '}
				<Header data={data} status={query?.status} />
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
