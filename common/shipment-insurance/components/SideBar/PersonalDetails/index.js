import { Button, cl } from '@cogoport/components';
import { useState } from 'react';

import getPocMapping from '../../../constants/getPocMapping';

import PersonalDetailsModal from './PersonalDetailsModal';
import styles from './styles.module.css';

function PersonalDetail({ pocDetails = {} }) {
	const [detailModal, setDetailModal] = useState({
		openModal : false,
		info      : {},
	});

	const POC_MAPPING = getPocMapping();

	return (
		<div className={cl`${styles.section} ${styles.personal_detail}`}>
			<h3>Personal Details</h3>

			<div className={cl`${styles.container} ${styles.flex_box}`}>

				{Object.keys(POC_MAPPING).map((detail) => {
					if (detail === 'edit') {
						return (
							<Button
								size="sm"
								key={detail}
								className={styles.edit_btn}
								themeType="secondary"
								onClick={() => setDetailModal({
									openModal : true,
									info      : pocDetails,
								})}
							>
								Edit
							</Button>
						);
					}

					return (
						<div key={detail} className={styles.col}>
							<p className={styles.label}>{POC_MAPPING[detail]}</p>
							<p className={styles.value}>{pocDetails[detail]}</p>
						</div>
					);
				})}
			</div>

			<PersonalDetailsModal detailModal={detailModal} setDetailModal={setDetailModal} />

		</div>
	);
}

export default PersonalDetail;
