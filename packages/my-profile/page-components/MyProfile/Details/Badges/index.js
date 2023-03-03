import { Modal, Button, Select, Tooltip } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { useState } from 'react';

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

function Badges() {
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

				<div className={styles.badge_list}>
					{
                    badge_data.map((data) => (
	<div key={data.badge_name} className={styles.badge_container}>
		<Tooltip content={data.badge_name}>
			<div className={styles.badge}>
				<img src={data.badge_url} alt="badge icon" />
			</div>
			<div className={styles.stars}>
				<IcCStar width={8} stroke="#FFDF33" />
				<IcCStar width={8} stroke="#FFDF33" />
				<IcCStar width={8} stroke="#FFDF33" />
			</div>
		</Tooltip>
	</div>
                    ))
                }
				</div>

				<div className={styles.view_more}>View More</div>

			</div>

			<Modal
				size="sm"
				show={show}
				onClose={onClose}
				placement="center"
				closeOnOuterClick
			>
				<Modal.Header title="Preview Badges" />
				<Modal.Body>
					<p className={styles.lable}>
						Select the mastery badge to preview on your profile
					</p>
					Select Mastery Badge

					<Select placeholder="Multimodal Mastery" />

					Eu do culpa occaecat veniam aute incididunt
					ipsum eiusmod do excepteur exercitation. Non minim esse ex amet amet
					aliqua enim incididunt reprehenderit culpa commodo deserunt. Nisi minim
					aute labore cillum exercitation amet. Esse Lorem adipisicing dolor sunt
					culpa ipsum ut laborum incididunt nostrud. Ipsum fugiat duis cupidatat
					ipsum et ex. Et aliquip nostrud ad in sit.

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
