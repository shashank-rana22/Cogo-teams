import { Avatar, Tooltip } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import hideDetails from '../../utils/hideDetails';

import styles from './styles.module.css';

const MAX_PREVIEW_LIMIT = 1;
const MIN_PREVIEW_LIMIT = 0;

function UserCard({ userData = {}, showDirection = false, showWorkScope = false }) {
	const {
		name = '',
		email = '',
		country_code = '',
		user_number = '',
		business_name = '',
		work_scopes = [],
	} = userData || {};

	const lessList = (work_scopes || []).slice(MIN_PREVIEW_LIMIT, MAX_PREVIEW_LIMIT);
	const moreList = (work_scopes || []).slice(MAX_PREVIEW_LIMIT);
	const showMoreList = !isEmpty(moreList);

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<Avatar personName={name} size="40px" className={styles.styled_avatar} />
				<div className={styles.user_info}>
					<div className={styles.name}>
						{startCase(name) || '-'}
					</div>
					{business_name && !showWorkScope ? (
						<div className={styles.business_name}>
							{startCase(business_name) || '-'}
						</div>
					) : null}
					<div className={styles.user_contact_details}>
						{email ? (
							<div className={styles.email_info}>
								{hideDetails({ data: email, type: 'mail' }) }
							</div>
						) : null}

						<div className={styles.contact_info}>
							{user_number ? hideDetails({
								data        : user_number,
								type        : 'number',
								countryCode : country_code,
							}) : null}
						</div>
					</div>

					{showWorkScope ? (
						<div className={styles.user_work_scope}>
							{(lessList || []).map((item) => (
								<div className={styles.scope_name} key={item}>
									{startCase(item)}
								</div>
							))}
							{showMoreList && (
								<Tooltip
									content={(
										<div>
											{(moreList || []).map((item) => (
												<div className={styles.scope_name} key={item}>{startCase(item)}</div>
											))}
										</div>
									)}
									theme="light"
									placement="right"
								>
									<div className={styles.more_tags}>
										+
										{moreList?.length}
									</div>
								</Tooltip>
							)}
						</div>
					) : null }

				</div>
			</div>
			{showDirection ? <IcMArrowRight className={styles.arrow_icon} /> : null}

		</div>
	);
}

export default UserCard;
