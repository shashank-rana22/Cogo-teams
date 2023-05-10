import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useState } from 'react';

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
		user_data = null,
		referral_data = {},
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
		total_child_count = 0,
		referee_id = '',
		status = '',
	} = referral_data || {};

	const firstTwoLetters = user_data?.name.substring(0, 2);

	const avatarContent = firstTwoLetters?.toUpperCase();

	const lastUserId = referee_id?.slice(-6).toUpperCase();

	const handleFunc = () => {
		handleConnections(nodeDatum, toggleNode);
		if (collapseState) {
			setCollapseState(false);
		}
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
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogopoints.svg"
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
			<foreignObject
				className={cl`
                    ${styles.direct_child_container}
                    ${checkActiveNode && styles.active_container}
                `}
				x="-120"
				y="-100"
				width="250px"
				height="155px"
			>

				<div
					role="presentation"
					className={styles.user_container_child}
					onClick={() => handleLinkClick(nodeDatum)}
				>
					<div className={styles.card_id}>
						ID:
						{' '}
						{lastUserId}
					</div>
					<div className={styles.total}>
						Joining  Date:
						{' '}
						{format(referral_data?.created_at, 'dd LLL yyyy')}
					</div>
					<div className={styles.user_cogopoints}>
						<div className={styles.total}>
							Total:
						</div>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogopoints.svg"
							alt="cogopoint"
							className={styles.cogopoints_img}
						/>
						<div className={styles.cogopoints_count}>
							{total}
						</div>
					</div>
				</div>
				<div
					className={styles.child_container}
					role="presentation"
					onClick={() => handleConnections(nodeDatum, toggleNode)}
				>
					<div className={styles.child_network}>
						<div className={styles.user_company_name}>
							{total_child_count !== 0 && '+'}
							{total_child_count}
							{' '}
							connections
						</div>
						{total_child_count > 0
							? (
								<IcMArrowDown
									className={cl`
										${styles.down_icon} ${collapse ? styles.collapsed : styles.not_collapsed}`}
								/>
							) : ('')}
					</div>
				</div>

			</foreignObject>
		);
	}

	return (
		<DirectNode
			checkActiveNode={checkActiveNode}
			status={status}
			handleLinkClick={handleLinkClick}
			nodeDatum={nodeDatum}
			topPerformer={topPerformer}
			avatarContent={avatarContent}
			referral_data={referral_data}
			lastUserId={lastUserId}
			user_data={user_data}
			organization={organization}
			orgCount={orgCount}
			handleFunc={handleFunc}
			total={total}
			collapse={collapse}
			collapseState={collapseState}
			total_child_count={total_child_count}
		/>
	);
}

export default RenderForeignObjectNode;
