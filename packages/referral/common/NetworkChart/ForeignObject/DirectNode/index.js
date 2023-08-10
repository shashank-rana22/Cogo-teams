import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDown } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { USER_STATUS_MAPPING, USER_STATUS_COLOUR } from '../../../../constants';
import TooltipContent from '../../../TooltipContent';
import styles from '../styles.module.css';

const DEFAULT_CHILD_COUNT = 0;
const DEFAULT_INDEX = 0;
const MIN_ORGNIZATION_LIST_LENGTH = 1;

function DirectNode(
	nodeProps = {},
) {
	const {
		checkActiveNode,
		status,
		handleLinkClick = () => {},
		nodeDatum,
		topPerformer,
		avatarContent,
		referralData = {},
		lastUserId = '',
		userData = {},
		organization,
		orgCount,
		handleFunc = () => {},
		total,
		collapse,
		collapseState,
		totalChildCount,
	} = nodeProps;

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
					<div className={styles.cogopoints}>
						<div className={cl` ${styles.profile_short_name} ${topPerformer
							? styles.active_status : styles.inactive_color} `}
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
							<div className={styles.active} style={{ color: USER_STATUS_COLOUR[referralData?.status] }}>
								{USER_STATUS_MAPPING[referralData?.status]}
							</div>
							<div className={styles.unique_id}>{lastUserId}</div>
						</div>
					</div>
				</div>
				<div className={styles.user_data}>
					<div className={styles.user_name}>
						{startCase(userData?.name) || '\u00A0'}
					</div>
					<div className={styles.tooltip}>
						<Tooltip
							content={<TooltipContent organization={organization} />}
							placement="bottom"
							caret={false}
						>
							<div className={styles.user_company_name}>
								<div className={`${styles.company_name}
								${organization?.length > MIN_ORGNIZATION_LIST_LENGTH
									? styles.user_org_name : styles.full_width}`}
								>
									{startCase(organization?.[DEFAULT_INDEX] || '\u00A0')}
								</div>
								{organization?.length > MIN_ORGNIZATION_LIST_LENGTH && (
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
					<Image
						src={GLOBAL_CONSTANTS.image_url.cogopoint_image}
						alt="cogopoint"
						width={18}
						height={18}
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
				onClick={handleFunc}
			>
				<div className={styles.child_network}>
					<div className={styles.user_company_name}>
						{totalChildCount !== DEFAULT_CHILD_COUNT && '+'}
						{totalChildCount}
						{' '}
						connections
					</div>
					{totalChildCount > DEFAULT_CHILD_COUNT
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
