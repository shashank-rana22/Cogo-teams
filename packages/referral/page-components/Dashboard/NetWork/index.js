import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import NetworkChart from '../../../common/NetworkChart';
import useGetNetwork from '../../../hooks/useGetNetwork';

import styles from './styles.module.css';
import UserNetworkModal from './UserNetworkModal';

function NetWork() {
	const [userModal, setUserModal] = useState(false);

	const [nodeData, setNodeData] = useState({});

	const { query = {} } = useRouter();
	const { referrer_id = '' } = query || {};
	const { data = {}, referrerNetwork = () => {}, netWorkLoader = true } = useGetNetwork({ referrer_id });
	console.log(' netWorkLoader11', netWorkLoader);

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

			{!netWorkLoader && !isEmpty(data) ? (
				<div className={styles.tree_wrapper}>
					<NetworkChart
						data={data}
						setUserModal={setUserModal}
						setNodeData={setNodeData}
						nodeData={nodeData}
						referrerNetwork={referrerNetwork}
					/>
				</div>
			) : (
				<div className={styles.loading_state}>
					<img
						alt="cogoport-loading"
						src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-loading.gif"
						width="120px"
						height="120px"
					/>
				</div>

			)}

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
