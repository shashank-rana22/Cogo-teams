import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import NetworkChart from '../../common/NetworkChart';
import useGetNetwork from '../../hooks/useGetNetwork';

import styles from './styles.module.css';
import UserNetworkModal from './UserNetworkModal';

function NetWork() {
	const [userModal, setUserModal] = useState(false);

	const [nodeData, setNodeData] = useState({});

	const { query = {} } = useRouter();
	const { referrer_id = '' } = query || {};
	const { data = {}, referrerNetwork = () => {} } = useGetNetwork({ referrer_id });

	const router = useRouter();
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left_div}>
					<IcMArrowBack
						className={styles.icon}
						onClick={() => router.back()}
					/>
					<div className={styles.title}>Your Network</div>
				</div>
			</div>

			<div className={styles.tree_wrapper}>
				<NetworkChart
					data={data}
					type="full_network"
					setUserModal={setUserModal}
					setNodeData={setNodeData}
					nodeData={nodeData}
					referrerNetwork={referrerNetwork}
				/>
			</div>

			{userModal && (
				<UserNetworkModal
					setUserModal={setUserModal}
					userModal={userModal}
					nodeData={nodeData}
					setNodeData={setNodeData}
				/>
			)}
		</>
	);
}

export default NetWork;
