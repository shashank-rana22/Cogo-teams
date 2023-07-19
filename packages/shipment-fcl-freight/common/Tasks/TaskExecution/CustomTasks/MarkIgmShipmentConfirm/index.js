import { Button, Toast, cl } from '@cogoport/components';
import { IcMCopy } from '@cogoport/icons-react';

import styles from './styles.module.css';

const STYLE_ICON = {
	marginLeft : 4,
	height     : 20,
	width      : 20,
};

function MarkIgmShipmentConfirm() {
	const handleCopy = async (val) => {
		navigator.clipboard
			.writeText(val)
			.then(Toast.info('Copied Successfully !!', { autoClose: 1000 }));
	};

	const getBLContainerDetails = (bl_type, bl_number) => (
		<div className={styles.bl_container}>
			<div className={styles.document_type}>
				{bl_type}
				:
				{' '}
			</div>
			<div className={cl`${styles.bl_container} ${styles.bl_details}`}>
				<div className={styles.bl_number}>{bl_number}</div>
				<IcMCopy
					onClick={() => handleCopy(bl_number)}
					style={STYLE_ICON}
				/>
			</div>
		</div>
	);

	return (
		<div>
			{getBLContainerDetails('MBL Number', '177KGGGGA3957')}
			{getBLContainerDetails('HBL Number', 'KY23060228')}
			<div className={styles.btn_div}>
				<Button
					themeType="secondary"
					className={styles.button}
				>
					Cancel
				</Button>

				<Button>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default MarkIgmShipmentConfirm;
