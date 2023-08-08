import { isEmpty, upperCase } from '@cogoport/utils';

import useRaiseTicketControls from '../../../../configurations/ticket-controls';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function RaiseTickets({
	shipmentData = {}, watchOrgId = '',
	control = {}, errors = {}, additionalInfo = [],
}) {
	const { importer_exporter_id: organizationId = '' } = shipmentData || {};

	const additionalControls = (additionalInfo || []).map((item) => ({
		label          : upperCase(item),
		name           : item,
		controllerType : 'input',
		placeholder    : `add ${item}`,
		showOptional   : false,
		disabled       : true,
	}));

	const controls = useRaiseTicketControls({
		watchOrgId,
	}).concat(additionalControls);

	return (
		<div>
			{(controls || []).map((controlItem) => {
				const { name, label, controllerType } = controlItem || {};
				const Element = getFieldController(controllerType);

				if (!Element) { return null; }

				if (name === 'user_id' && isEmpty(organizationId)) { return null; }

				return (
					<div
						key={controlItem.name}
						className={styles.field}
					>
						{(label && controllerType !== 'checkbox') && <div className={styles.label}>{label}</div>}
						<Element
							{...controlItem}
							size="sm"
							key={name}
							control={control}
							id={`${name}_input`}
						/>
						<div className={styles.error}>{errors?.[controlItem.name] && 'Required'}</div>
					</div>
				);
			})}
		</div>
	);
}

export default RaiseTickets;
