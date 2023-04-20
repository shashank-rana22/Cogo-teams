import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ChooseModal({ setShow = () => {}, setUploadData = () => {}, uploadData = {} }) {
	const NEXT_PAGE_MAPPING = {
		lead: 'providerSelect',
	};

	const IS_CP_MAPPING = {
		lead: null,
	};

	const onChoose = (type) => {
		setShow((pv) => ({
			...pv,
			screen: NEXT_PAGE_MAPPING[type],
		}));

		setUploadData({
			...uploadData,
			ingestion_type     : type,
			is_channel_partner : IS_CP_MAPPING[type],
		});
	};

	return (

		<div>
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
