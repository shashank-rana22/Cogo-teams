import { Button, Popover } from '@cogoport/components';
import { IcMCall, IcMEdit, IcMEmail } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import STAKEHOLDER_MAPPING from '../../../../../../contants/STAKEHOLDER_MAPPING';

import styles from './styles.module.css';

function Stakeholders({ data = [], setAddPoc = () => {}, rolesPermission = {} }) {
	const editInternalPoc = rolesPermission?.edit_internal_poc || [];
	return (
		<div>
			{data?.map((item) => {
				const {
					stakeholder_type = '',
					user: {
						name = '', email = '', mobile_country_code = '', mobile_number = '',
					},
					service_type,
					service_id,
					stakeholder_id,
					id,
				} = item || {};

				if (!STAKEHOLDER_MAPPING[stakeholder_type]) return null;

				const contact_number = `${mobile_country_code} ${mobile_number}`;

				return (
					<div className={styles.stakeholder_container} key={id}>
						<div className={styles.stakeholder}>
							<span className={styles.stakeholder_type}>
								{`${STAKEHOLDER_MAPPING[stakeholder_type] || startCase(stakeholder_type)} : `}
							</span>
							{name}
						</div>

						<div className={styles.action_container}>
							{editInternalPoc?.includes(stakeholder_type) ? (
								<Button
									themeType="linkUi"
									onClick={() => setAddPoc({
										poc_type: 'editInternal',
										stakeholder_type,
										service_type,
										service_id,
										stakeholder_id,
									})}
									size="sm"
								>
									<IcMEdit height={15} width={15} />
								</Button>
							) : null}

							<div>
								<Popover render={<div>{email}</div>} trigger="mouseenter" placement="bottom">
									<IcMEmail height={15} width={15} />
								</Popover>
							</div>

							<div>
								<Popover render={<div>{contact_number}</div>} trigger="mouseenter" placement="bottom">
									<IcMCall height={15} width={15} />
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
