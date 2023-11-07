import { Placeholder, Tooltip } from '@cogoport/components';

import Back from '../Header/common/Back';

import styles from './styles.module.css';

function SelectedOrgInfo({
	orgName = '',
	userName = '',
	loading = false,
	activePage = '',
	currentScreen = '',
	setCurrentScreen = () => {},
}) {
	if (loading) {
		return (
			<div className={styles.container}>
				<Placeholder height="25px" width="150px" margin="0px 0px 6px 0px" />
				<Placeholder height="25px" width="100px" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{activePage !== 'checkout' ? (
				<Back
					currentScreen={currentScreen}
					setCurrentScreen={setCurrentScreen}
				/>
			) : null}

			<div>
				<Tooltip
					placement="top"
					className={styles.tooltip}
					content={<span className={styles.tooltip_content}>{orgName || ''}</span>}
				>
					<div className={styles.org_name}>{orgName || ''}</div>
				</Tooltip>

				<Tooltip
					placement="top"
					className={styles.tooltip}
					content={<span className={styles.tooltip_content}>{userName || ''}</span>}
				>
					<div className={styles.user_name}>{userName || ''}</div>
				</Tooltip>
			</div>
		</div>
	);
}

export default SelectedOrgInfo;
