import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function OfferLetter({ setInformationPage }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>OFFER LETTER</div>
			</div>
			<div> Offer Letter!</div>
		</div>
	);
}

export default OfferLetter;
