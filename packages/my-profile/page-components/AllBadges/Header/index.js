import { IcMArrowLeft } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Header(props) {
	const { modalDetail, showAllBadges, returnPath, goBack } = props;
	return (
		<div className={styles.greeting_container}>
			<div className={styles.main_heading} role="presentation" onClick={goBack}>
				<div className={styles.icon_container}>
					<IcMArrowLeft width={24} height={24} />
				</div>
				<span className={styles.span}>
					{ returnPath === '/my-profile' ? 'My Profile' : 'Dashboard'}
				</span>
			</div>
			{ !isEmpty(modalDetail)
					&& (
						<div className={styles.main_heading} role="presentation" onClick={showAllBadges}>
							<div className={styles.icon_container}>
								<IcMArrowLeft width={24} height={24} />
							</div>
							<span className={styles.span}>All Badges</span>
						</div>
					)}
		</div>
	);
}

export default Header;
