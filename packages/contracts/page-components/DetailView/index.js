import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import useGetContract from '../../hooks/useGetContract';
import useGetContractStats from '../../hooks/useGetContractStats';
import useUpdateContract from '../../hooks/useUpdateContract';
import formatPortPair from '../../utils/formatPortPair';

import Body from './Body';
import Header from './Header';
import Loader from './Loader';
import styles from './styles.module.css';

function DetailView() {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));
	const { data, loading, getContract } = useGetContract({ id: query?.id });
	const formattedData = formatPortPair({ item: data });
	const [state, setState] = useState(formattedData);
	const [serviceType, setServiceType] = useState('');

	useEffect(() => {
		if ((formattedData || []).length) { setState(formattedData); }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(formattedData)]);

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
		serviceType,
	});

	let content = <Loader />;

	if (state[0]?.id && !loading) {
		content = (
			<div className={styles.container}>
				<Header
					data={data}
					handleUpdateContract={handleUpdateContract}
					statsData={statsData}
					loadingUpdate={loadingUpdate}
					setState={setState}
					state={state}
					setServiceType={setServiceType}
				/>
				<Body
					data={data}
					statsData={statsData}
					getContract={getContract}
					getContractStats={getContractStats}
					formattedData={state}
				/>
			</div>
		);
	}

	return <div>{content}</div>;
}

export default DetailView;
