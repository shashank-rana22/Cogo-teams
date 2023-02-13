import { Button, ToolTip, cl } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import UserAvatar from '../../../common/UserAvatar';
import { TAGS_COLORS } from '../../../constants';

import styles from './styles.module.css';

function Header() {
	const tagslist = ['!! Priority', 'Pre Shipment'];
	const showContent = (list = [], showMorePlacement = 'right') => {
		const showMoreList = (list || []).length > 2;

		const lessList = (list || []).slice(0, 2);

		const moreList = (list || []).slice(2);

		const toolTipContent = (
			<div>
				{(moreList || []).map((item) => (<div className={cl`${styles.tags} ${styles.margin}`}>{item}</div>))}
			</div>
		);

		function toolTipFunc() {
			return (
				<ToolTip content={toolTipContent} theme="light" placement="right">
					<div className={styles.more_tags}>
						+
						{moreList?.length}
					</div>
				</ToolTip>
			);
		}

		return (
			<div className={styles.flex}>
				{ showMoreList && showMorePlacement !== 'right' && toolTipFunc()}
				{(lessList || []).map((item, index) => (<div className={styles.tags} style={{ background: TAGS_COLORS[index] }}>{item}</div>))}
				{showMoreList && showMorePlacement === 'right' && toolTipFunc()}
			</div>
		);
	};
	return (
		<div className={styles.container}>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<IcMPlusInCircle />
					{showContent(tagslist, 'right')}
				</div>
			</div>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<UserAvatar type="whatsapp" />
					<div>
						<div className={styles.name}>John Wick</div>
						<div className={styles.phone_number}>+91XXXXXX0980</div>
					</div>
				</div>
				<Button className="primary md">Mark as Closed</Button>
			</div>
		</div>
	);
}
export default Header;
