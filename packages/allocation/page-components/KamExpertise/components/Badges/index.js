import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import CreateBadge from './BadgeList';
import CreateBadgeV2 from './CreateBadge';
import Header from './Header';
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
					<Header badgeList={badgeList} setCreateBadge={setCreateBadge} />
				</div>
			</section>

			{
				createBadge && (
					<div>
						<CreateBadgeV2 setCreateBadge={setCreateBadge} />
					</div>
				)
			}

			{
				badgeList
			&& (
				<section>
					<CreateBadge />
				</section>
			)
			}

		</section>
	);
}

export default Badges;
