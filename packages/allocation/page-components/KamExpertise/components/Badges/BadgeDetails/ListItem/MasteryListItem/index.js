import { Pill, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function MasteryListItem({ data = {}, index, setToggleScreen, setMasteryListData }) {
	const handleEdit = () => {
		setMasteryListData(data);
		setToggleScreen('create_mastery');
	};
	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<p>
					#
					{index + 1}
				</p>
				<Button themeType="secondary" onClick={handleEdit}>Edit</Button>
			</div>

			<div className={styles.content}>
				<div className={styles.details}>
					<div>
						<div style={{ paddingBottom: '12px' }}>
							Event Name :
							{' '}
							<b>{data.badge_name}</b>
						</div>
						<div>
							Description :
							{' '}
							{data.description}
						</div>
					</div>
					<div className={styles.modified}>
						<div>
							Last Modified :
							{' '}
							{format(data.created_at, 'yyyy-MMM-dd')}
						</div>
						{/* //! needs changes */}
						{/* <div>
							Last Modified By:
							{' '}
							{data.last_modified_by}
						</div> */}
					</div>
				</div>

				<div className={styles.badge_icon_container}>

					<div className={styles.rules}>
						<div className={styles.rule_heading}>Rules</div>
						<span>Mastery in</span>
						{
                        data.mastery_in?.map((item) => (
	<span className={styles.pill}>
		<Pill color="#edd7a9">{item}</Pill>

	</span>
                        ))
                    }
					</div>

					<div className={styles.badge}>
						<img
							style={{ objectFit: 'contain' }}
							src={data.badge_details?.[0].image_url}
							alt="Mastery Modal"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MasteryListItem;
