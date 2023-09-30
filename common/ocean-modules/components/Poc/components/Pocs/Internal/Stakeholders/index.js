import { Button, Popover } from '@cogoport/components';
import { IcMCall, IcMEdit, IcMEmail } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import STAKEHOLDER_MAPPING, { DEFAULT_STAKEHOLDERS } from '../../../../../../constants/STAKEHOLDER_MAPPING';

import styles from './styles.module.css';

const ICONS_DIMENSIONS = 15;

function Stakeholders({
	data = [], setAddPoc = () => {}, rolesPermission = {},
	shipment_data = {}, activeStakeholder = '',
}) {
	const editInternalPoc = rolesPermission?.edit_internal_poc || [];

	const { is_rate_reverted = false, shipment_type = '' } = shipment_data;

	const checkForStakeholders = ['booking_agent', 'booking_agent_manager',
		'sales_agent', 'consignee_shipper_booking_agent'].includes(activeStakeholder);

	const isPocStakeholdersVisible = checkForStakeholders && shipment_type === 'fcl_freight'
		? is_rate_reverted
		: true;

	let mapping = DEFAULT_STAKEHOLDERS;

	if (isPocStakeholdersVisible) {
		mapping = STAKEHOLDER_MAPPING;
	}

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

				if (rolesPermission?.hidden_poc?.includes(stakeholder_type) || !mapping[stakeholder_type]) {
					return null;
				}

				const contact_number = `${mobile_country_code} ${mobile_number}`;

				return (
					<div className={styles.stakeholder_container} key={id}>
						<div className={styles.stakeholder}>
							<span className={styles.stakeholder_type}>
								{`${mapping[stakeholder_type] || startCase(stakeholder_type)} : `}
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
										...(!service_type && { shipment_type }),
									})}
									size="sm"
								>
									<IcMEdit height={ICONS_DIMENSIONS} width={ICONS_DIMENSIONS} />
								</Button>
							) : null}

							<div>
								<Popover render={<div>{email}</div>} trigger="mouseenter" placement="bottom">
									<IcMEmail height={ICONS_DIMENSIONS} width={ICONS_DIMENSIONS} />
								</Popover>
							</div>

							<div>
								<Popover render={<div>{contact_number}</div>} trigger="mouseenter" placement="bottom">
									<IcMCall height={ICONS_DIMENSIONS} width={ICONS_DIMENSIONS} />
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
