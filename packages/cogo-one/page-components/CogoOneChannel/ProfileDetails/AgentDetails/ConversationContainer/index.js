import { Placeholder } from '@cogoport/components';
import { IcCWhatsapp, IcMEmail } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ConversationContainer({ userData, loading, noData = false }) {
	const { email, name, whatsapp_number_eformat } = userData || {};

	if (isEmpty(userData) || noData) {
		return (
			<div className={styles.empty}>No data Found...</div>
		);
	}
	return (
		loading ? (
			[...Array(2)].map(() => (
				<div className={styles.container}>
					<div className={styles.icon_type}>
						<Placeholder type="circle" radius="30px" />
					</div>
					<div className={styles.details}>
						<div className={styles.header}>
							<div className={styles.name}>
								<Placeholder height="10px" width="160px" margin="0px 0px 0px 0px" />
							</div>
						</div>
						<div className={styles.organization}>
							<Placeholder height="10px" width="80px" margin="10px 0px 0px 0px" />
						</div>
					</div>
				</div>
			))
		) : (

			<div className={styles.wrapper}>
				{!isEmpty(whatsapp_number_eformat) && (
					<div className={styles.contacts_container}>
						<div className={styles.container}>
							<div className={styles.icon_type}><IcCWhatsapp width={25} height={25} /></div>
							<div className={styles.details}>
								<div className={styles.header}>
									<div className={styles.name}>{name}</div>
								</div>
								<div className={styles.organization}>{whatsapp_number_eformat}</div>
							</div>

						</div>
					</div>
				)}
				{!isEmpty(email) && (
					<div className={styles.contacts_container}>
						<div className={styles.container}>
							<div className={styles.icon_type}><IcMEmail width={25} height={25} fill="#E09B3D" /></div>
							<div className={styles.details}>

								<div className={styles.header}>
									<div className={styles.name}>{name}</div>
								</div>
								<div className={styles.organization}>{email}</div>

							</div>

						</div>
					</div>
				)}
			</div>
		)
	);
}
export default ConversationContainer;
