import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ChooseModal({ setShow = () => {}, setUploadData = () => {}, uploadData = {} }) {
	const NEXT_PAGE_MAPPING = {
		organization : 'orgDetails',
		partner      : 'providerSelect',
		lead         : 'providerSelect',
	};

	const IS_CP_MAPPING = {
		organization : false,
		partner      : true,
		lead         : null,
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
				<Button
					themeType="secondary"
					onClick={() => onChoose('partner')}
					style={{ height: '60px', width: '50%' }}
				>
					Channel Partner

				</Button>
				<Button
					themeType="secondary"
					onClick={() => onChoose('organization')}
					style={{ height: '60px', width: '50%' }}
				>
					Importer Exporter
				</Button>
			</div>

		</div>

	);
}

export default ChooseModal;
