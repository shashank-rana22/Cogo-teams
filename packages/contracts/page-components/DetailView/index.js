import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import useGetContract from '../../hooks/useGetContract';

import Body from './Body';
import Header from './Header';
import Loader from './Loader';

function DetailView() {
	const { id } = useSelector(({ general }) => ({
		id: general?.query?.id,
	}));
	const { data, loading } = useGetContract({ id });

	let content = (
		<Loader />
	);

	if (data?.id && !loading) {
		content = (
			<>
				{' '}
				<Header data={data} />
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
