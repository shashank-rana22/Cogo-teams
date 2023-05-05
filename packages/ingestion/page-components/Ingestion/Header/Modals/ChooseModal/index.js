import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ChooseModal({ setShow = () => {}, setUploadData = () => {}, uploadData = {} }) {
	const onChoose = (type) => {
		setShow((pv) => ({
			...pv,
			activeMode: 'providerSelect',
		}));

		setUploadData({
			...uploadData,
			ingestion_type: type,
		});
	};

	return (

		<div className={styles.container}>
			<div className={styles.choose_heading}>What do you wish to upload CSV for?</div>
			<div className={styles.choose_container}>
				<Button
					themeType="secondary"
					onClick={() => onChoose('lead')}
					style={{ height: '60px', width: '50%' }}
				>
					Lead

				</Button>

			</div>

		</div>

	);
}

export default ChooseModal;
