import { IcMArrowNext } from '@cogoport/icons-react';

import { ACTIVITY_MAPPING } from '../../../../../constants/platformAdoptionConstant';

import styles from './styles.module.css';

function FilterSection({
	unReadChatsCount = 0, setActiveTab = () => {},
	unReadMailsCount = 0,
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

	const getTabStyles = (count) => {
		if (count > 12) {
			return {
				backgroundColor : '#FDEBE9',
				borderColor     : '#F37166',
			};
		} if (count > 8) {
			return {
				backgroundColor : '#FBD1A6',
				borderColor     : '#F9AE64',
			};
		}
		return {
			backgroundColor : '#FEF199',
			borderColor     : '#FCDC00',
		};
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
							className={styles.each_tab}
							onClick={() => {
								setActiveTab((prev) => ({
									...prev,
									hasNoFireBaseRoom : true,
									subTab            : 'all',
									tab               : COUNT_MAPPING?.[name]?.tab,
								}));
							}}
							style={getTabStyles?.(COUNT_MAPPING?.[name]?.count)}
						>
							{isDot ? (
								<div
									className={styles.red_dot}
									style={{
										backgroundColor:
										getTabStyles(COUNT_MAPPING?.[name]?.count)?.borderColor,
									}}
								/>
							) : null}
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
		</div>
	);
}

export default FilterSection;
