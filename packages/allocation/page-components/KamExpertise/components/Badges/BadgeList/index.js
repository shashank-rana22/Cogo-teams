import { Button, Modal } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import useBadgeConfiguration from '../../../../CoreAllocationEngine/hooks/useBadgeConfiguration';
import GetCard from '../CreateBadge/getCard';

import styles from './styles.module.css';

function CreateBadge() {
	const [openModal, setOpenModal] = useState(false);
	const [medalType, setMedalType] = useState('');

	const {
		onCheckPublish, loadingCheckPublishability,
	} = useBadgeConfiguration();

	const handleClick = (e) => {
		setOpenModal((pv) => !pv);
		setMedalType(e);
	};

	return (
		<div className={styles.container}>
			<div className={styles.number_tag}>
				<p>#0001</p>
				<Button themeType="secondary">Edit</Button>
			</div>

			<div className={styles.main_card}>

				<div className={styles.card_description}>
					<div className={styles.badge_name_tag}>
						<p>
							Badge Name
							{' '}
							:
							{'  '}
							<b>
								Nautical Ninja
							</b>
						</p>
					</div>

					<div className={styles.desc}>
						<p>Description : Surface Stuff</p>
					</div>

					<div className={styles.modified}>
						<p>Last Modified : 31/September/2023</p>
						<p>Last Modified By : Ankur Verma</p>
					</div>
				</div>

				<div className={styles.score_container}>
					<h3 style={{ color: '#4f4f4f' }}>Scores</h3>
					<div className={styles.score_badge}>

						<div className={styles.badge_card_left}>
							<div className={styles.badge_header}>
								<span>
									Bronze :
									<b>
										{' '}
										2000 Score
									</b>
								</span>
								<span>
									<IcMEdit onClick={() => handleClick('Bronze')} />
								</span>
							</div>
							<div className={styles.badge_icon}>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg"
									alt="badge-icon"
								/>
							</div>

						</div>

						<div className={styles.badge_card_middle}>
							<div className={styles.badge_header}>
								<span>
									Silver :
									<b>
										{' '}
										5000 Score
									</b>
								</span>
								<span>
									<IcMEdit onClick={() => setOpenModal((pv) => !pv)} />
								</span>
							</div>
							<div className={styles.badge_icon}>
								<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/silver_badge.svg" alt="badge-icon" />
							</div>
						</div>

						<div className={styles.badge_card_right}>
							<div className={styles.badge_header}>
								<span>
									Gold :
									<b>
										{' '}
										9000 Score
									</b>
								</span>
								<span>
									<IcMEdit onClick={() => setOpenModal((pv) => !pv)} />
								</span>
							</div>
							<div className={styles.badge_icon}>
								<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg" alt="badge-icon" />
							</div>
						</div>
					</div>

					{ openModal
						&& (
							<Modal
								size="md"
								show={openModal}
								onClose={() => setOpenModal((pv) => !pv)}
								placement="center"
							>
								{/* <Modal.Body>Do you want to check publishability of the configuration?</Modal.Body>
								<Modal.Footer>
									<Button
										type="submit"
										size="md"
										themeType="primary"
										disabled={loadingCheckPublishability}
										onClick={onCheckPublish}
									>
										Check
									</Button>
								</Modal.Footer> */}
								<Modal.Body>
									<div style={{ padding: '10px' }}>
										<GetCard
											medalType={medalType}
											inputPlaceHolder="score"
										/>
									</div>
								</Modal.Body>
							</Modal>
						)}
				</div>
			</div>
		</div>
	);
}

export default CreateBadge;
