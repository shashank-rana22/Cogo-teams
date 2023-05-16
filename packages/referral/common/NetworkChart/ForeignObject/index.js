import { useState } from 'react';

import { cogopointImg } from '../../../constants';
import styles from '../styles.module.css';

import DirectNode from './DirectNode';

function RenderForeignObjectNode({
	nodeDatum,
	toggleNode,
	userCogopoints = 0,
	nodeData,
	handleLinkClick = () => {},
	handleConnections = () => {},
	topPerformerId = '',
}) {
	const {
		user_data: userData = null,
		referral_data: referralData = {},
		cogopoints = {},
		organization = [],
		referee_id: topuser = '',
		__rd3t: rd3t = {},
	} = nodeDatum || {};

	const { collapsed: collapse = true } = rd3t || {};
	const [collapseState, setCollapseState] = useState(true);

	const topPerformer = topPerformerId === topuser;

	const orgCount = organization.length - 1;

	const checkActiveNode = nodeData?.referee_id === nodeDatum?.referee_id;

	const { total = 0 } = cogopoints || {};

	const {
		total_child_count: totalChildCount = 0,
		referee_id = '',
		status = '',
	} = referralData || {};

	const firstTwoLetters = userData?.name.substring(0, 2);

	const avatarContent = firstTwoLetters?.toUpperCase();

	const lastUserId = referee_id?.slice(-6).toUpperCase();

	const handleFunc = () => {
		handleConnections(nodeDatum, toggleNode);
		if (collapseState) {
			setCollapseState(false);
		}
	};

	const nodeProps = {
		checkActiveNode,
		status,
		handleLinkClick,
		nodeDatum,
		topPerformer,
		avatarContent,
		referralData,
		lastUserId,
		userData,
		organization,
		orgCount,
		handleFunc,
		total,
		collapse,
		collapseState,
		totalChildCount,
	};

	if (nodeDatum.type === 'root') {
		return (
			<foreignObject
				className={styles.root_container}
				onClick={toggleNode}
				x="-55"
				y="0"
				width="100"
				height="60"
			>
				<div className={styles.root_flex}>
					<div className={styles.root_user_text}>You</div>
					<div className={styles.cogopoints}>
						<img
							src={cogopointImg}
							alt="cogopoint"
							className={styles.cogopoints_img}
						/>
						{' '}
						<div className={styles.cogopoints_count}>{userCogopoints || 0}</div>
					</div>
				</div>
			</foreignObject>
		);
	}

	if (!nodeDatum.direct_child) {
		return (
			<DirectNode {...nodeProps} />

		);
	}

	return (
		<DirectNode
			{...nodeProps}
		/>
	);
}

export default RenderForeignObjectNode;
