import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMLocation } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function SingleMemberView({
	userData = {},
}) {
	const {
		name = '',
		email = '',
		location = '',
		designation = '',
	} = userData || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Profile
			</div>
			<div className={styles.profile_user_details}>
				<Avatar
					className={styles.styled_avatar}
					personName={name}
				/>
				<div className={styles.details_wrapper}>
					<div className={styles.user_name}>{name}</div>
					<div className={styles.email_styles}>{email || '-'}</div>
					<div className={styles.email_styles}>{designation || '-'}</div>
				</div>
			</div>
			<div className={styles.contact_information}>
				<div className={styles.flex_contacts}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.organization}
						alt="organization"
						width={20}
						height={20}
					/>
					<div className={styles.data_wrapper}>
						<div className={styles.contact_heading}>
							Company
						</div>
						<div className={styles.contact_value}>
							Cogoport
						</div>
					</div>
					<div className={styles.data_wrapper}>
						<div className={styles.contact_heading}>
							Designation
						</div>
						<div className={styles.contact_value}>
							{designation || '-'}
						</div>
					</div>
				</div>
				<div className={styles.location}>
					<IcMLocation
						width={20}
						height={20}
					/>
					<div className={styles.data_wrapper}>
						<div className={styles.contact_heading}>
							Location
						</div>
						<div className={styles.contact_value}>
							{location || '-'}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleMemberView;
