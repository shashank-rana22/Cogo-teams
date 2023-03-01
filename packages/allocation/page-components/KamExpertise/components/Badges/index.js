import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import useBadgeConfigurationList from '../../hooks/useBadgeConfigurationList';

import BadgeListItem from './BadgeListItem';
import CreateBadge from './CreateBadge';
import CreateMastery from './CreateMastery';
import listData from './dummyList';
import Header from './Header';
import MasteryListItem from './MasteryListItem';
import styles from './styles.module.css';

function Badges() {
	const router = useRouter();
	const { fetchBadgeList } = useBadgeConfigurationList();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};

	const [badgeList, setBadgeList] = useState([]);
	// const [badgeList, setBadgeList] = useState(false);

	const [window, setWindow] = useState(1);

	useEffect(() => {
		fetchBadgeList(setBadgeList);
		setBadgeList(listData);
	}, []);

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
					<Header
						badgeList={badgeList}
						setWindow={setWindow}
					/>
				</div>
			</section>

			{
				(window === 1)
			&& (
				<section>
					<MasteryListItem />
					<BadgeListItem />
					<BadgeListItem />
				</section>
			)
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

			{
				(!createBadge) && badgeList.map(((data, index) => (
					<BadgeListItem data={data} index={index} />
				)))
			// && (
			// 	<section>
			// 		<MasteryListItem />
			// 		<BadgeListItem />
			// 		{

			// 		}
			// 	</section>
			// )
			}
		</section>
	);
}

export default Badges;
