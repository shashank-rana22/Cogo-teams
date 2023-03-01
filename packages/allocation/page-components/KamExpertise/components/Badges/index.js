import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useBadgeConfigurationList from '../../hooks/useBadgeConfigurationList';

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

	const [window, setWindow] = useState(1);

	const { list:badgeList } = useBadgeConfigurationList();

	return (
		<section className={styles.main_container}>
			<div className={styles.back_container} role="presentation" onClick={onClickBack}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>
				<div className={styles.back_text}>
					Back to Dashboard
				</div>
			</div>

			<section className={styles.container}>
				<div className={styles.heading_container}>
					Configurations
				</div>

				<div>
					<Header
						badgeList={badgeList.length}
						setWindow={setWindow}
					/>
				</div>
			</section>

			{
				(window === 1)
			&& badgeList?.map(((data, index) => (
				<BadgeListItem data={data} index={index} />
			)))
			}

			{
				(window === 2) && (
					<div>
						<CreateMastery setWindow={setWindow} />
					</div>
				)
			}

			{
				(window === 3) && (
					<div>
						<CreateBadge setWindow={setWindow} />
					</div>
				)
			}

		</section>
	);
}

export default Badges;
