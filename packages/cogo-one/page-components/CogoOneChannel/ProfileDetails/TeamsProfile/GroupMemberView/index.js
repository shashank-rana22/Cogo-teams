import { Avatar } from '@cogoport/components';

import styles from './styles.module.css';

const SELF_COUNT = 1;
const FALLBACK = 0;

function GroupMemberView({ restData = [] }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Group Members (
				{(restData?.length || FALLBACK) + SELF_COUNT}
				)
			</div>
			<div className={styles.list}>
				{(restData || []).map((item) => {
					const { name = '', id = '', email = '', is_admin } = item || {};

					return (
						<div key={id} className={styles.row_direction}>
							<Avatar
								personName={name}
								alt="name"
								size="40px"
								className={styles.styled_avatar}
							/>
							<div className={styles.wrapper}>
								<div className={styles.group_member_name}>
									{name || '-'}
									{is_admin ? <span>(Admin)</span> : true}
								</div>
								<div className={styles.group_member_designation}>{email || '-'}</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default GroupMemberView;
