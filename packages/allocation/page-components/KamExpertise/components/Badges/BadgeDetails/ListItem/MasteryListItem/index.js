import { Pill, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function MasteryListItem({ data = {}, index, setToggleScreen, setMasteryItemData }) {
	const {
		badge_name = '_', description = '_',
		created_at, created_by = {},
		mastery_in, badge_details = [],
	} = data;

	const handleEdit = () => {
		setMasteryItemData(data);
		setToggleScreen('create_mastery');
	};

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
							{created_at ? format(created_at, 'dd MMMM yy') : '_'}
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

						{mastery_in?.map((item) => (
							<span className={styles.pill}>
								<Pill color="#edd7a9">{item}</Pill>

							</span>
						))}

					</div>

					<div className={styles.badge}>
						<img
							style={{ objectFit: 'contain' }}
							src={badge_details?.[0]?.image_url}
							alt="Mastery Modal"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MasteryListItem;
