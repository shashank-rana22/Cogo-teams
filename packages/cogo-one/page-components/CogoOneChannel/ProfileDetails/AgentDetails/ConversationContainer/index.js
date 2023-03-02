import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import OtherChannelsConfig from '../../../../../configurations/other-channels-config';
import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

function ConversationContainer({ userData, loading, noData = false }) {
	if (isEmpty(userData) || noData) {
		return (
			<div className={styles.empty}>No data Found...</div>
		);
	}
	return (
		loading ? (
			[...Array(2)].map(() => (
				<div className={styles.container}>
					<div className={styles.icon_type}>
						<Placeholder type="circle" radius="30px" />
					</div>
					<div className={styles.details}>
						<div className={styles.header}>
							<div className={styles.name}>
								<Placeholder height="10px" width="160px" margin="0px 0px 0px 0px" />
							</div>
						</div>
						<div className={styles.organization}>
							<Placeholder height="10px" width="80px" margin="10px 0px 0px 0px" />
						</div>
					</div>
				</div>
			))
		) : (
			<div className={styles.wrapper}>
				{OtherChannelsConfig.map(({ name, icon, value_type }) => !isEmpty(userData?.[name]) && (
					<div className={styles.contacts_container}>
						<div className={styles.container}>
							<div className={styles.icon_type}>{icon}</div>
							<div className={styles.details}>
								<div className={styles.header}>
									<div className={styles.name}>{userData?.name || ''}</div>
								</div>
								<div className={styles.organization}>
									{hideDetails({
										data : userData?.[name],
										type : value_type,
									})}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		)
	);
}

export default ConversationContainer;
