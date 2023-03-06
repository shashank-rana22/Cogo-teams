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

	const [window, setWindow] = useState(1);
	const [autofill, setAutofill] = useState({});

	const { loading, list:badgeList } = useBadgeConfigurationList();

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
						setAutofill={setAutofill}
					/>
				</div>
			</section>
			{

				(isEmpty(badgeList) && !loading) ? (
					<div style={{
						padding         : '60px 0',
						height          : '400px',
						backgroundColor : 'white',
						margin          : '20px 0',
					}}
					>
						<EmptyState height={400} width={600} flexDirection="column" />
					</div>
				)

					: 	(
						<div>
							{
								(window === 1)
			&&	badgeList?.map(((data, index) => (data.medal_collection.length > 0
				? (
					<MasteryListItem
						data={data}
						index={index}
						loading={loading}
						setWindow={setWindow}
						setAutofill={setAutofill}
					/>
				)
				: (
					<BadgeListItem
						data={data}
						index={index}
						loading={loading}
						setWindow={setWindow}
						setAutofill={setAutofill}
					/>
				)
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
					<CreateBadge setWindow={setWindow} autofill={autofill} />
				</div>
			)
}
						</div>
					)

			}

		</section>
	);
}

export default Badges;
