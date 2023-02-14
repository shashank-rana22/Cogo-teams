import { Pill } from '@cogoport/components';
import { IcCCountryIndia, IcMFcl, IcMPort } from '@cogoport/icons-react';

import styles from './styles.module.css';

function BookingContent() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left}>
					<IcCCountryIndia width={20} height={20} />
					<div className={styles.title}>Cosco Shipping</div>
				</div>
				<div className={styles.right}>
					<Pill
						key="Import"
						size="sm"
						color="#C4DC91"
					>
						Import
					</Pill>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.type}>
					<IcMFcl width={20} height={20} fill="#221F20" />
					<div className={styles.type_name}>FCL</div>
				</div>
				<div className={styles.details}>
					<div className={styles.port}>
						<div className={styles.origin}>
							India,
							{' '}
							<span>(INNSA)</span>
							,
							{' '}
							<div className={styles.name}>Jawaharlal Nehru</div>
						</div>
					</div>
					<IcMPort width={20} height={20} fill="#ACDADF" />
					<div className={styles.port}>
						<div className={styles.origin}>
							China,
							{' '}
							<span>(CNSHA)</span>
							,
							{' '}
							<div className={styles.name}>Shanghai</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.quantities}>2 Ctr</div>
				<div className={styles.quantities}>40 ft </div>
				<div className={styles.quantities}>
					Std
					<span>Gen</span>
				</div>
				<div className={styles.quantities}>26 MT</div>
			</div>
		</div>
	);
}
export default BookingContent;
