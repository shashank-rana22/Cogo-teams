import { useSelector } from '@cogoport/store';

import useGetContract from '../../hooks/useGetContract';
import useUpdateContract from '../../hooks/useUpdateContract';

import Body from './Body';
import Header from './Header';
import Loader from './Loader';
import useGetContractStats from '../../hooks/useGetContractStats';


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

	const { data: statsData } = useGetContractStats({ id: query?.id });

	console.log(statsData, 'valuedata')
	let content = (
		<Loader />
	);

	if (data?.id && !loading) {
		content = (
			<>
				{' '}
				<Header data={data} status={query?.status} handleUpdateContract={handleUpdateContract} statsData={statsData} />
				<Body data={data}  statsData={statsData}/>
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
