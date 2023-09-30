import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import List from './List';
import styles from './styles.module.css';

function MembersList({
	membersList = [],
	setAddMembers = () => {},
}) {
	return (
		<>
			<List membersList={membersList} />
			<div className={styles.footer_buttons}>
				<Button
					size="md"
					themeType="tertiary"
					className={styles.button_styles}
					onClick={() => setAddMembers(true)}
				>
					<Image
						src={GLOBAL_CONSTANTS.image_url.groups}
						alt="group"
						width={22}
						height={20}
						className={styles.image_styles}
					/>
					<div className={styles.button_text}>Add People</div>
				</Button>
				<Button
					size="md"
					themeType="tertiary"
					className={styles.button_styles}
				>
					<Image
						src={GLOBAL_CONSTANTS.image_url.groups}
						alt="group"
						width={22}
						height={20}
						className={styles.image_styles}
					/>
					<div className={styles.button_text}>Leave</div>
				</Button>
			</div>
		</>
	);
}
export default MembersList;
