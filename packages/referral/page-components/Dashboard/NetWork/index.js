import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter, Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import NetworkChart from '../../../common/NetworkChart';
import useGetNetwork from '../../../hooks/useGetNetwork';

import styles from './styles.module.css';
import UserNetworkModal from './UserNetworkModal';

function NetWork() {
	const [userModal, setUserModal] = useState(false);

	const [nodeData, setNodeData] = useState({});

	const router = useRouter();
	const { query = {} } = useRouter();
	const { referrer_id = '', user_name = '' } = query;
	const { data = {}, referrerNetwork = () => {}, netWorkLoader = true } = useGetNetwork({ referrer_id });

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left_div}>
					<IcMArrowBack
						className={styles.icon}
						onClick={() => router.back()}
					/>
					<div className={styles.title}>
						{startCase(user_name)}
						{' '}
						Network
					</div>
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
						userName={user_name}
					/>
				</div>
			) : (
				<div className={styles.loading_state}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.network_loader}
						alt="cogoport-loading"
						width={120}
						height={120}
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
