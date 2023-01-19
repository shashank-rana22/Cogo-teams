import { useSelector } from '@cogoport/store';

import useGetContract from '../../hooks/useGetContract';
import useGetContractStats from '../../hooks/useGetContractStats';
import useUpdateContract from '../../hooks/useUpdateContract';

import Body from './Body';
import Header from './Header';
import Loader from './Loader';
import styles from './styles.module.css';

function DetailView() {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));
	const { data, loading, getContract } = useGetContract({ id: query?.id });
	const { updateContract, loading: loadingUpdate } = useUpdateContract();

	const handleUpdateContract = async (val) => {
		await updateContract({
			payload: {
				id     : query?.id,
				status : val,
			},
		});
	};

	const { data: statsData, getContractStats } = useGetContractStats({
		id: query?.id,
	});

	let content = <Loader />;

	if (data?.id && !loading) {
		content = (
			<div className={styles.container}>
				<Header
					data={data}
					handleUpdateContract={handleUpdateContract}
					statsData={statsData}
					loadingUpdate={loadingUpdate}
				/>
				<Body
					data={data}
					statsData={statsData}
					getContract={getContract}
					getContractStats={getContractStats}
				/>
			</div>
		);
	}

	return <div>{content}</div>;
}

export default DetailView;
