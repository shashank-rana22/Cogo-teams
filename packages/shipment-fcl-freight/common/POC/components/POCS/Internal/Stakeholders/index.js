import { Button, Popover } from '@cogoport/components';
import { IcMCall, IcMEdit, IcMEmail } from '@cogoport/icons-react';

import STAKEHOLDER_MAPPING from '../../../../../../constants/STAKEHOLDER_MAPPING';

import styles from './styles.module.css';

function Stakeholders({ data = [], setAddPoc = () => {} }) {
	return (
		<div>
			{data?.map((item) => {
				const {
					stakeholder_type = '', user: {
						name = '', email = '', mobile_country_code = '', mobile_number = '',
					},
					service_type,
				} = item || {};

				if (!STAKEHOLDER_MAPPING[stakeholder_type]) return null;

				const contact_number = `${mobile_country_code} ${mobile_number}`;

				return (
					<div className={styles.stakeholder_container}>
						<div className={styles.stakeholder}>
							<span className={styles.stakeholder_type}>
								{`${STAKEHOLDER_MAPPING[stakeholder_type]} : `}
							</span>
							{name}
						</div>

						<div className={styles.action_container}>
							<Button
								themeType="linkUi"
								onClick={() => setAddPoc({
									poc_type: 'editInternal',
									stakeholder_type,
									service_type,

								})}
								size="sm"
							>
								<IcMEdit height={15} width={15} />

							</Button>

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
