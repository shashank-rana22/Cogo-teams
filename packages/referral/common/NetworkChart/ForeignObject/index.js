import { cl, Tooltip } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import { useState } from 'react';

import { USER_STATUS_MAPPING, USER_STATUS_COLOUR } from '../../../constants';
import TooltipContent from '../../TooltipContent';
import styles from '../styles.module.css';

function RenderForeignObjectNode({
	nodeDatum,
	toggleNode,
	userCogopoints = 0,
	nodeData,
	handleLinkClick = () => {},
	handleConnections = () => {},
	topPerformerId = '',
	type = '',
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
				onClick={type === 'full-network' ? toggleNode : () => {}}
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
				<div id={nodeDatum?.referee_id === '96f7087a-9a67-4f6f-a58d-f50a8962e73e' && 'referral-network'}>
					<div id={nodeDatum?.referee_id === '8b1a3d18-b6e0-4006-ac41-71038db96b13' && 'referral-commission'}>
						<div
							role="presentation"
							className={styles.user_container_child}
							onClick={type === 'full-network' ? () => handleLinkClick(nodeDatum) : () => {}}
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
							onClick={type === 'full-network'
								? () => handleConnections(nodeDatum, toggleNode) : () => {}}
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
					</div>
				</div>
			</foreignObject>
		);
	}

	return (
		<foreignObject
			className={cl`
                ${styles.container}
                ${checkActiveNode && styles.active_container}
            `}
			x="-120"
			y="-100"
			width="250px"
			height="170px"
		>
			<div
				role="presentation"
				className={cl`${styles.user_container} ${status === 'inactive' ? styles.inactive_card : ''}`}
				onClick={type === 'full-network' ? () => handleLinkClick(nodeDatum) : () => {}}
			>
				<div className={styles.node_header}>
					<div className={styles.profile_container}>
						<div className={cl` ${styles.profile_short_name} ${topPerformer
							? styles.active_status : styles.inactive_status} `}
						>
							<div className={styles.profile_short_name_inner_div}>
								<div className={cl` ${styles.profile_short_name_text} ${topPerformer
									? styles.active_color : styles.inactive_color} `}
								>
									{avatarContent || 'NO'}
								</div>
							</div>
						</div>
						<div className={styles.user_status}>
							<div className={styles.active} style={{ color: USER_STATUS_COLOUR[referral_data?.status] }}>
								{USER_STATUS_MAPPING[referral_data?.status]}
							</div>
							<div className={styles.id}>{lastUserId}</div>
						</div>
					</div>
				</div>
				<div className={styles.user_data}>
					<div className={styles.user_name}>
						{startCase(user_data?.name) || '\u00A0'}
					</div>
					<div className={styles.tooltip}>
						<Tooltip
							content={<TooltipContent organization={organization} />}
							placement="bottom"
							caret={false}
						>
							<div className={styles.user_company_name}>
								<div className={`${styles.company_name} ${organization?.length > 1
									? styles.width_100 : styles.full_width}`}
								>
									{startCase(organization?.[0] || '\u00A0')}
								</div>
								{organization.length > 1 && (
									<div className={styles.more}>
										+
										{orgCount}
										<span className={styles.span_more}>More</span>
									</div>
								)}
							</div>
						</Tooltip>
					</div>
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
				className={`${styles.child_container} ${status === 'inactive' ? styles.inactive_card : ''}`}
				role="presentation"
				onClick={type === 'full-network' ? () => handleFunc() : () => {}}
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
								${styles.down_icon} ${collapse || collapseState
									? styles.collapsed : styles.not_collapsed}`}
							/>
						) : ('')}
				</div>
			</div>
		</foreignObject>
	);
}

export default RenderForeignObjectNode;
