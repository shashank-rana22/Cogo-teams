import { Popover } from '@cogoport/components';
import { IcMCall, IcMEdit, IcMEmail } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Stakeholders({ data = [] }) {
	return (
		<div>
			{data?.map((item) => {
				const {
					stakeholder_type = '', user: {
						name = '', email = '', mobile_country_code = '', mobile_number = '',
					},
				} = item || {};

				const contact_number = `${mobile_country_code} ${mobile_number}`;

				return (
					<div className={styles.stakeholder_container}>
						<div className={styles.stakeholder}>
							<span className={styles.stakeholder_type}>{`${startCase(stakeholder_type)} : `}</span>
							{name}
						</div>

						<div className={styles.action_container}>
							<div><IcMEdit /></div>

							<div>
								<Popover render={<div>{email}</div>} trigger="mouseenter" placement="bottom">
									<IcMEmail />
								</Popover>

							</div>

							<div>
								<Popover render={<div>{contact_number}</div>} trigger="mouseenter" placement="bottom">
									<IcMCall />
								</Popover>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default Stakeholders;
