import { isEmpty } from '@cogoport/utils';

import useRaiseTicketcontrols from '../../../configurations/filter-controls';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function RaiseTickets({
	control = {}, errors = {}, watchOrgId = '', additionalInfo = [],
	setAdditionalInfo = () => {},
}) {
	const additionalControls = (additionalInfo || []).map((item) => ({
		label          : item,
		name           : item,
		controllerType : 'text',
		placeholder    : `add ${item}`,
		showOptional   : false,
	}));

	const controls = useRaiseTicketcontrols({ watchOrgId, setAdditionalInfo }).concat(additionalControls);

	return (
		<div>
			{controls.map((controlItem) => {
				const elementItem = { ...controlItem };
				const { name, label, controllerType } = elementItem || {};
				const Element = getFieldController(controllerType);

				if (!Element) { return null; }

				if (name === 'user_id' && isEmpty(watchOrgId)) { return null; }

				return (
					<div
						key={controlItem.name}
						className={styles.field}
					>
						{label && controllerType !== 'checkbox'
							&& (
								<div className={styles.label}>
									<div className={styles.sub_label}>{label}</div>
									{controlItem.name === 'additional_information'
									&& <div className={styles.info_label}>(max 200 characters)</div>}
								</div>
							)}
						<Element
							{...elementItem}
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
