import { Pagination } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
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

	const [toggleScreen, setToggleScreen] = useState(1);
	// Screen 1 - Badge List
	// Screen 2 - Create Mastery
	// Screen 3 - Create Badge

	const [autofill, setAutofill] = useState({});
	const [masteryListData, setMasteryListData] = useState({});

	const { loading, list:badgeList, paginationData, getNextPage, listRefetch } = useBadgeConfigurationList();

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

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
						setAutofill={setAutofill}
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
				&&	(
					<div>
						{badgeList?.map(((data, index) => (data.medal_collection.length > 0
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
									setAutofill={setAutofill}
								/>
							)
						)))}
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={getNextPage}
							/>
						</div>
					</div>
				)
			}

				{
			(toggleScreen === 2) && (
				<div>
					<CreateMastery
						setToggleScreen={setToggleScreen}
						badgeList={badgeList}
						masteryListData={masteryListData}
						listRefetch={listRefetch}
					/>
				</div>
			)
			}
				{
				(toggleScreen === 3) && (
					<div>
						<CreateBadge
							setToggleScreen={setToggleScreen}
							autofill={autofill}
							listRefetch={listRefetch}
						/>
					</div>
				)
			}
			</div>

		</section>
	);
}

export default Badges;
