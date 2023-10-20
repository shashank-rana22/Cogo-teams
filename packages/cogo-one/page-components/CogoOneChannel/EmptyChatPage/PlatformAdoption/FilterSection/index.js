import { Button, cl } from '@cogoport/components';
import { IcMArrowNext, IcMFilter } from '@cogoport/icons-react';

import { ACTIVITY_MAPPING } from '../../../../../constants/PLATFORM_ADOPTION_CONSTANTS';

import styles from './styles.module.css';

function FilterSection({
	unReadChatsCount = 0, setActiveTab = () => {},
	unReadMailsCount = 0, platformTab = '', setPlatformTab = () => {},
}) {
	const COUNT_MAPPING = {
		chat_pending: {
			count : unReadChatsCount,
			tab   : 'message',
		},
		mail_pending: {
			count : unReadMailsCount,
			tab   : 'firebase_emails',
		},
	};

	return (
		<div className={styles.stats_section}>
			<div className={styles.tabs}>
				{(ACTIVITY_MAPPING || []).map((itm) => {
					const { label = '', name = '', isDot = false } = itm || {};

					return (
						<div
							role="presentation"
							key={name}
							className={cl`${styles.each_tab} ${platformTab === name ? styles.active_tab : ''}`}
							onClick={() => {
								setPlatformTab(name);
								setActiveTab((prev) => ({
									...prev,
									hasNoFireBaseRoom : true,
									subTab            : 'all',
									// data              : chatData,
									tab               : COUNT_MAPPING?.[name]?.tab,
								}));
							}}
						>
							{isDot ? <div className={styles.red_dot} /> : null}
							<div className={styles.label}>
								{label}
								{' '}
								<span>{`(${COUNT_MAPPING?.[name]?.count})`}</span>
							</div>
							<div className={styles.arrow_button}>
								<IcMArrowNext />
							</div>
						</div>
					);
				})}
			</div>
			<Button themeType="secondary">
				Filter By
				{' '}
				<IcMFilter width={15} height={15} />
			</Button>
		</div>
	);
}

export default FilterSection;
