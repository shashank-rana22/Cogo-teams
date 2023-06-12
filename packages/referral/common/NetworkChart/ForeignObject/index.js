import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import Image from 'next/image';
import { useState } from 'react';

import DirectNode from './DirectNode';
import styles from './styles.module.css';

const SUBSTRING_MIN_VALUE = 0;
const ORG_COUNT_LENGTH_VALUE = 1;
const USERID_SLICE_VALUE = -6;
const SUBSTRING_MAX_VALUE = 2;
const COGOPOINT_DEFAULT_VALUE = 0;

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

	const orgCount = organization.length - ORG_COUNT_LENGTH_VALUE;

	const checkActiveNode = nodeData?.referee_id === nodeDatum?.referee_id;

	const { total = 0 } = cogopoints || {};

	const {
		total_child_count: totalChildCount = 0,
		referee_id = '',
		status = '',
	} = referralData || {};

	const firstTwoLetters = userData?.name.substring(SUBSTRING_MIN_VALUE, SUBSTRING_MAX_VALUE);

	const avatarContent = firstTwoLetters?.toUpperCase();

	const lastUserId = referee_id?.slice(USERID_SLICE_VALUE).toUpperCase();

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
						<div className={styles.cogopoints_count}>{userCogopoints || COGOPOINT_DEFAULT_VALUE}</div>
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
