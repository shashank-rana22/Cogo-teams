import useGetContract from '../../hooks/useGetContract';

import Body from './Body';
import Header from './Header';
import Loader from './Loader';

function DetailView({ showDetail, setShowDetail }) {
	const { data, loading } = useGetContract({ showDetail });

	let content = (
		<Loader />
	);

	if (data?.id && !loading) {
		content = (
			<>
				{' '}
				<Header setShowDetail={setShowDetail} data={data} />
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
