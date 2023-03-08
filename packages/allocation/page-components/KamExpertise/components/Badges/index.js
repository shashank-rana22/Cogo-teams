import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useGetBadgeList from '../../hooks/useGetBadgeList';

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

	const [toggleScreen, setToggleScreen] = useState(1);
	// Screen 1 - Badge List
	// Screen 2 - Create Mastery
	// Screen 3 - Create Badge

	const [badgeListData, setBadgeListData] = useState({});
	// const [autofill, setAutofill] = useState({});
	const [masteryListData, setMasteryListData] = useState({});

	const { loading, list:badgeList } = useGetBadgeList();

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
						setToggleScreen={setToggleScreen}
						setMasteryListData={setMasteryListData}
						setBadgeListData={setBadgeListData}
					/>
				</div>
			</section>
			<div>

				{
					// ToDo: add empty state's dimensions
					(toggleScreen === 1) && isEmpty(badgeList)
						? <EmptyState />
						: ''
				}
				{
				(toggleScreen === 1)
			&&	(badgeList?.map(((data, index) => (data.medal_collection.length > 0
				? (
					<MasteryListItem
						data={data}
						index={index}
						loading={loading}
						setToggleScreen={setToggleScreen}
						setMasteryListData={setMasteryListData}
					/>
				)
				: (
					<BadgeListItem
						data={data}
						index={index}
						loading={loading}
						setToggleScreen={setToggleScreen}
						setBadgeListData={setBadgeListData}
					/>
				)
			))))

			}

				{
			(toggleScreen === 2) && (
				<div>
					<CreateMastery
						setToggleScreen={setToggleScreen}
						badgeList={badgeList}
						masteryListData={masteryListData}
					/>
				</div>
			)
			}
				{
				(toggleScreen === 3) && (
					<div>
						<CreateBadge setToggleScreen={setToggleScreen} badgeListData={badgeListData} />
					</div>
				)
			}
			</div>

		</section>
	);
}

export default Badges;
