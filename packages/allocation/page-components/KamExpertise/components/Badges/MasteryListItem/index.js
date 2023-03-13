import { Pill, Button, Placeholder } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function MasteryListItem({ data = {}, index, loading, setToggleScreen, setMasteryListData }) {
	const handleEdit = () => {
		setMasteryListData(data);
		setToggleScreen(2);
	};

	if (loading) {
		return (
			<div className={styles.container}>

				<div className={styles.header}>
					<Placeholder width="60px" height="20px" />
					<Placeholder width="60px" height="20px" />
				</div>

				<div className={styles.content}>
					<div className={styles.details}>
						<div>
							<div style={{ paddingBottom: '12px' }}>
								<Placeholder width="160px" height="20px" style={{ marginTop: '12px' }} />
							</div>
							<div>
								<Placeholder width="400px" height="20px" style={{ marginTop: '12px' }} />
								{' '}
								<Placeholder width="400px" height="20px" style={{ marginTop: '12px' }} />
							</div>
						</div>
						<div className={styles.modified}>
							<div>

								{' '}
								<Placeholder width="200px" height="20px" />

							</div>
							<div>
								{' '}
								<Placeholder width="200px" height="20px" />

							</div>
						</div>
					</div>

					<div className={styles.rules}>
						<Placeholder width="120px" height="20px" style={{ marginTop: '8px' }} />
						<Placeholder width="120px" height="20px" style={{ marginTop: '8px' }} />
						{
                        data.expertise_configuration_ids?.map(() => (
	<span className={styles.pill}>
		<Placeholder width="120px" height="20px" style={{ marginTop: '8px' }} />
	</span>
                        ))
                    }
					</div>

					<div className={styles.badge}>
						<Placeholder width="140px" height="140px" />
					</div>
				</div>
			</div>
		);
	}

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
						<div>
							Last Modified By:
							{' '}
							{/* //! needs changes */}
							{/* {data.last_modified_by} */}
						</div>
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
							height={140}
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
