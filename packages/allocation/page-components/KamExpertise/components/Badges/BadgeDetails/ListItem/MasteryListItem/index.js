import { Pill, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function MasteryListItem({ data = {}, index, setToggleScreen, setMasteryItemData }) {
	const {
		badge_name = '_', description = '_',
		audits = [], created_by = {},
		mastery_details = {},
		mastery_badges_detail = [],
	} = data;

	const handleEdit = () => {
		setMasteryItemData(data);
		setToggleScreen('create_mastery');
	};

	const updated_at = audits?.[0]?.created_at || null;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				#
				{' '}
				{index + 1}
				<Button
					themeType="secondary"
					onClick={handleEdit}
				>
					Edit
				</Button>
			</div>

			<div className={styles.content}>
				<div className={styles.details}>
					<div>
						<div style={{ paddingBottom: '12px' }}>
							Event Name :
							{' '}
							<b>{badge_name}</b>
						</div>

						<div>
							Description :
							{' '}
							{description}
						</div>
					</div>

					<div className={styles.modified}>
						<div>
							Last Modified :
							{' '}
							{updated_at ? format(updated_at, 'dd MMMM yy') : '_'}
						</div>

						<div>
							Last Modified By:
							{' '}
							{created_by?.name}
						</div>
					</div>
				</div>

				<div className={styles.badge_icon_container}>
					<div className={styles.rules}>
						<div className={styles.rule_heading}>Rules</div>

						<span>Mastery in</span>

						{mastery_badges_detail?.map((item) => (
							<div className={styles.pill}>
								<Pill color="#ced1ed">{item?.badge_name}</Pill>
							</div>
						))}
					</div>

					<div className={styles.badge}>
						<img
							style={{ objectFit: 'contain' }}
							src={mastery_details?.image_url}
							alt="Mastery-Icon"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MasteryListItem;
