import { Button } from '@cogoport/components';

import handleMinimizeTest from '../../../../utils/handleMinimizeTest';

import styles from './styles.module.css';

function Footer({
	setShowTimeOverModal,
}) {
	const handleSubmitTest = () => {
		setShowTimeOverModal(true);
		handleMinimizeTest();
	};

	return (
		<div className={styles.container}>
			<Button
				type="button"
				onClick={() => handleSubmitTest()}
				themeType="accent"
			>
				Submit Test

			</Button>
		</div>
	);
}

export default Footer;
