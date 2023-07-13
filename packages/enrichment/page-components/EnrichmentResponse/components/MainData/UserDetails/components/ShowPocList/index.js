import { isEmpty } from '@cogoport/utils';

import Workscopes from './components/Workscopes';
import styles from './styles.module.css';

const LABEL_MAPPING = {
	name                    : 'Name',
	email                   : 'Email ID',
	mobile_number           : 'Mobile Number',
	alternate_mobile_number : 'Alternate Number',
	whatsapp_number         : 'Whatsapp Number',
	work_scopes             : 'Role',
};

function ShowPocList({
	data = [],
}) {
	const details = (data || []).map((poc) => {
		const obj = {
			name          : poc?.name,
			email         : poc?.email,
			mobile_number : `${poc?.mobile_country_code} ${poc?.mobile_number}`,

			alternate_mobile_number: (poc?.alternate_mobile_country_code && poc?.alternate_mobile_number)
				? `${poc?.alternate_mobile_country_code} ${poc?.alternate_mobile_number}` : '__',

			whatsapp_number: (poc?.whatsapp_country_code && poc?.whatsapp_number)
				? `${poc?.whatsapp_country_code} ${poc?.whatsapp_number}` : '__',

			work_scopes: poc?.work_scopes,
		};

		return obj;
	});

	if (isEmpty(details)) {
		return null;
	}

	return (
		<div className={styles.main}>

			{(details).map((poc) => (
				<div key={poc} className={styles.content}>

					<div className={styles.box_info}>

						{Object.keys(poc).map((pocKey) => (
							<div key={pocKey} className={styles.label_value_container}>
								<div className={styles.top}>
									{LABEL_MAPPING[pocKey]}
								</div>

								<div className={styles.bottom}>
									{pocKey === 'work_scopes' ? <Workscopes work_scopes={poc?.[pocKey]} />
										: poc?.[pocKey] }
								</div>
							</div>

						))}

					</div>

				</div>
			))}

		</div>
	);
}

export default ShowPocList;
