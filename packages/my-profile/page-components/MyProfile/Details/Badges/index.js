import { Modal, Button, Select, Tooltip } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import badges from '../../../../pages/badges';

import styles from './styles.module.css';

const badge_data = [
	{
		badge_name : 'Wings of Logistics GOLD LVL 3',
		badge_url  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg',
		stars      : 3,
	},
	{
		badge_name : 'Wings of Logistics BRONZE LVL 3',
		badge_url  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg',
		stars      : 3,
	},
	{
		badge_name : 'Wings of Logistics GOLD LVL 2',
		badge_url  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg',
		stars      : 3,
	},
	{
		badge_name : 'Wings of Logistics SILVER LVL 3',
		badge_url  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/silver_badge.svg',
		stars      : 3,
	},
	{
		badge_name : 'Wings of Logistics BRONZE LVL 1',
		badge_url  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg',
		stars      : 3,
	},
];

function Badges({ badgeList = {} }) {
	const router = useRouter();
	const { badges_got = {}, badges_not_got = {} } = badgeList;

	console.log('ajcnjncajc : ', badgeList);

	const [show, setShow] = useState(false);
	const onClose = () => setShow(false);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.heading}>Badges List</p>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => 	setShow(true)}
				>
					<b>Select Badges To Preview</b>
				</Button>
			</div>
			<div className={styles.content}>

				{
				isEmpty(badges_got)
					?				(
						<>

							<div className={styles.badge_list}>
								{
									badges_not_got.map((item, index) => (
										(index < 5)
											?		(
												<div key={item.id} className={styles.badge_container}>
													<Tooltip content={item.medal}>
														<div className={styles.badge}>
															<img src={item.image_url} alt="badge icon" />
														</div>
														<div className={styles.stars}>
															<IcCStar width={8} stroke="#FFDF33" />
															<IcCStar width={8} stroke="#FFDF33" />
															<IcCStar width={8} stroke="#FFDF33" />
														</div>
													</Tooltip>
												</div>
											) : ''
									))
								}
							</div>
							<div
								role="presentation"
								onClick={() => {
									router.push('/badges');
								}}
								className={styles.view_more}
							>
								View More

							</div>
						</>
					)
					: (
						<div>No Badges to Display..</div>
					)
				}

			</div>

			<Modal
				size="sm"
				show={show}
				onClose={onClose}
				placement="center"
				closeOnOuterClick
			>
				<Modal.Header title="Preview Badges" />
				<Modal.Body style={{ height: '300px' }}>
					<p className={styles.lable}>
						Select the mastery badge to preview on your profile
					</p>

					<Select placeholder="Multimodal Mastery" />

				</Modal.Body>
				<Modal.Footer>
					<Button themeType="tertiary" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={onClose}>Save</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Badges;
