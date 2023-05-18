import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import Image from 'next/image';
import { useState } from 'react';

import { COGOPOINT_IMG } from '../../../constants';

import DirectNode from './DirectNode';
import styles from './styles.module.css';

function RenderForeignObjectNode({
	nodeDatum,
	toggleNode,
	userCogopoints = 0,
	nodeData,
	handleLinkClick = () => {},
	handleConnections = () => {},
	topPerformerId = '',
	userName = '',
}) {
	const {
		user_data: userData = null,
		referral_data: referralData = {},
		cogopoints = {},
		organization = [],
		referee_id: topUser = '',
		__rd3t: rd3t = {},
	} = nodeDatum || {};

	const { collapsed: collapse = true } = rd3t || {};

	const [collapseState, setCollapseState] = useState(true);

	const topPerformer = topPerformerId === topUser;

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
					<Tooltip content={startCase(userName)} placement="bottom">
						<div className={styles.root_user_text}>
							{startCase(userName)}
							{' '}
						</div>
					</Tooltip>

					<div className={styles.cogopoints}>
						<Image
							src={COGOPOINT_IMG}
							alt="cogopoint"
							width={18}
							height={18}
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
