import { isEmpty } from '@cogoport/utils';

import Workscopes from './components/Workscopes';
import styles from './styles.module.css';
import getUserDetails from './utils/get-user-details';

const LABEL_MAPPING = {
	name                    : 'Name',
	email                   : 'Email ID',
	mobile_number           : 'Mobile Number',
	alternate_mobile_number : 'Alternate Number',
	whatsapp_number         : 'Whatsapp Number',
	work_scopes             : 'Role',
};

function ShowPocList({ data = [] }) {
	const userDetails = getUserDetails({ data });

	if (isEmpty(userDetails)) {
		return null;
	}

	return (
		<div className={styles.main}>

			{(userDetails || []).map((poc) => (
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
