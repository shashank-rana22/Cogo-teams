import { Button, Tooltip, cl } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import AssigneeAvatar from '../../../../common/AssigneeAvatar';
import UserAvatar from '../../../../common/UserAvatar';
import { TAGS_COLORS } from '../../../../constants';

import styles from './styles.module.css';

function Header({ setOpenModal = () => {} }) {
	const tagslist = ['!! Priority', 'Pre Shipment', 'Pre Shipment'];
	const assignes = [
		{ name: 'rahul danampally', email: 's', isAllowed: true, isActive: false },
		{ name: 'rahul danampally', email: 's', isAllowed: true, isActive: false },
		{ name: 'rahul danampally', email: 's', isAllowed: true, isActive: true },
	];
	const showContent = (list = [], showMorePlacement = 'right') => {
		const MAX_SHOW_LENGTH = 3;
		const showMoreList = (list || []).length > MAX_SHOW_LENGTH;

		const lessList = (list || []).slice(0, MAX_SHOW_LENGTH);

		const moreList = (list || []).slice(MAX_SHOW_LENGTH);

		const toolTipContent = (
			<div>
				{(moreList || []).map((item) => (<div className={cl`${styles.tags} ${styles.margin}`}>{item}</div>))}
			</div>
		);

		const toolTipComp = (
			<Tooltip content={toolTipContent} theme="light" placement="bottom">
				<div className={styles.more_tags}>
					+
					{moreList?.length}
				</div>
			</Tooltip>
		);

		return (
			<div className={styles.flex}>
				{ showMoreList && showMorePlacement !== 'right' && toolTipComp}
				{(lessList || []).map((item, index) => (
					<div
						className={styles.tags}
						style={{ background: TAGS_COLORS[index] }}
					>
						{item}
					</div>
				))}
				{showMoreList && showMorePlacement === 'right' && toolTipComp}
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
				<div className={styles.flex}>
					{(assignes || []).map((eachAssigne) => <AssigneeAvatar data={eachAssigne} />)}
					<Button
						themeType="secondary"
						size="md"
						className={styles.styled_button}
						onClick={() => setOpenModal({ type: 'assign', data: {} })}
					>
						Assign

					</Button>
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
				<Button themeType="primary" size="md">Mark as</Button>
			</div>
		</div>
	);
}
export default Header;
