import { isEmpty } from '@cogoport/utils';

import useRaiseTicketcontrols from '../../../configurations/filter-controls';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function RaiseTickets({ control, errors, watchOrgId, additionalInfo, setAdditionalInfo }) {
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
				const el = { ...controlItem };
				const Element = getFieldController(el.controllerType);

				if (!Element) return null;

				if (el.name === 'user_id' && isEmpty(watchOrgId)) return null;

				return (
					<div
						key={controlItem.name}
						className={styles.field}
					>
						{el.label && <div className={styles.label}>{el.label}</div>}
						<Element
							{...el}
							size="sm"
							key={el.name}
							control={control}
							id={`${el.name}_input`}
						/>
						<div className={styles.error}>{errors?.[controlItem.name] && 'Required'}</div>
					</div>
				);
			})}
		</div>
	);
}

export default RaiseTickets;
