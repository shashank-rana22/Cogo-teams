import { IcMCallbarge } from '@cogoport/icons-react';

import KamUserContactCard from '../KamUserContactCard';

import styles from './styles.module.css';

function KamOrgAccordian(
	{
		onCardClick = () => {},
		formattedOrgUsersList = [],
		openOrgAccordianId = false,
		item = {},
	},
) {
	const { id, orgName } = item;

	return (
		<div role="presentation" className={styles.container} onClick={() => onCardClick(item)}>
			<div className={styles.name_container}>
				<IcMCallbarge className={styles.group_icon_styles} />
				<div className={styles.org_name}>{orgName}</div>
			</div>
			{openOrgAccordianId === id && (formattedOrgUsersList?.map((eachUser) => (
				<KamUserContactCard
					item={eachUser}
					key={eachUser?.user_id}
				/>
			)))}
		</div>
	);
}

export default KamOrgAccordian;
