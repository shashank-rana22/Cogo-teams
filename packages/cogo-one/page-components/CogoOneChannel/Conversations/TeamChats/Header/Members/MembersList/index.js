import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function MembersList({
	groupMembersList = [],
	setAddMembers = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{groupMembersList.map((eachPerson) => <div key={eachPerson?.id}>members</div>)}
			</div>
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
		</div>
	);
}
export default MembersList;
