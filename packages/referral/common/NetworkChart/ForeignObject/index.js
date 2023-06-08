import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import Image from 'next/image';
import { useState } from 'react';

import DirectNode from './DirectNode';
import styles from './styles.module.css';

const DEFAULT_COUNT = 0;
const DEFAULT_LENGTH = 1;
const DEFAULT_SLICE_VALUE = -6;
const DEFAULT_SUBSTRING_VALUE = 2;

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

	const orgCount = organization.length - DEFAULT_LENGTH;

	const checkActiveNode = nodeData?.referee_id === nodeDatum?.referee_id;

	const { total = DEFAULT_COUNT } = cogopoints || {};

	const {
		total_child_count: totalChildCount = DEFAULT_COUNT,
		referee_id = '',
		status = '',
	} = referralData || {};

	const firstTwoLetters = userData?.name.substring(DEFAULT_COUNT, DEFAULT_SUBSTRING_VALUE);

	const avatarContent = firstTwoLetters?.toUpperCase();

	const lastUserId = referee_id?.slice(DEFAULT_SLICE_VALUE).toUpperCase();

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
							src={GLOBAL_CONSTANTS.image_url.cogopoint_image}
							alt="cogopoint"
							width={18}
							height={18}
							className={styles.cogopoints_img}
						/>
						{' '}
						<div className={styles.cogopoints_count}>{userCogopoints || DEFAULT_COUNT}</div>
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
