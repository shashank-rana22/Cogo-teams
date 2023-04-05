import { Button } from '@cogoport/components';

import handleMinimizeTest from '../../../../utils/handleMinimizeTest';

import styles from './styles.module.css';

function Footer({
	setShowSubmitTestModal,
}) {
	const handleSubmitTest = () => {
		setShowSubmitTestModal(true);
		handleMinimizeTest();
	};

	return (
		<div className={styles.container}>
			<Button
				type="button"
				size="md"
				onClick={() => handleSubmitTest()}
				themeType="accent"
			>
				Submit Test
			</Button>
		</div>
	);
}

export default Footer;
