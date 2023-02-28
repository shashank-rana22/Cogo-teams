import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import BadgeListItem from './BadgeListItem';
import CreateBadge from './CreateBadge';
import CreateMastery from './CreateMastery';
import Header from './Header';
import MasteryListItem from './MasteryListItem';
import styles from './styles.module.css';

function Badges() {
	const router = useRouter();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};

	const [badgeList, setBadgeList] = useState(true);
	// const [badgeList, setBadgeList] = useState(false);

	// const [createBadge, setCreateBadge] = useState(true);
	const [createBadge, setCreateBadge] = useState(false);
	const [createMastery, setCreateMastery] = useState(false);

	return (
		<section className={styles.main_container}>
			<div className={styles.back_container}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>

				<div className={styles.back_text} role="presentation" onClick={onClickBack}>
					Back to Dashboard
				</div>
			</div>

			<section className={styles.container}>
				<div className={styles.heading_container}>
					Configurations
				</div>

				<div>
					<Header badgeList={badgeList} setCreateBadge={setCreateBadge} setCreateMastery={setCreateMastery} />
				</div>
			</section>

			{
				createBadge && (
					<div>
						<CreateBadge setCreateBadge={setCreateBadge} />
					</div>
				)
			}

			{
				badgeList && (!createBadge)
			&& (
				<section>
					<MasteryListItem />
					<BadgeListItem />
					<BadgeListItem />
				</section>
			)
			}

			{
				createMastery && (
					<div>
						<CreateMastery setCreateMastery={setCreateMastery} />
					</div>
				)
			}
		</section>
	);
}

export default Badges;
