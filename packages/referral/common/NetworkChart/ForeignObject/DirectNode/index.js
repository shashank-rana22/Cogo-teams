import { cl, Tooltip } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { USER_STATUS_MAPPING, USER_STATUS_COLOUR } from '../../../../constants';
import TooltipContent from '../../../TooltipContent';
import styles from '../../styles.module.css';

function DirectNode({
	checkActiveNode,
	status,
	handleLinkClick = () => {},
	nodeDatum,
	topPerformer,
	avatarContent,
	referral_data = {},
	lastUserId = '',
	user_data = {},
	organization,
	orgCount,
	handleFunc = () => {},
	total,
	collapse,
	collapseState,
	total_child_count,
}) {
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
				className={cl`${styles.user_container} ${
					status === 'inactive' ? styles.inactive_card : ''
				}`}
				onClick={() => handleLinkClick(nodeDatum)}
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
				className={`${styles.child_container} ${
					status === 'inactive' ? styles.inactive_card : ''
				}`}
				role="presentation"
				onClick={() => handleFunc()}
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

export default DirectNode;
