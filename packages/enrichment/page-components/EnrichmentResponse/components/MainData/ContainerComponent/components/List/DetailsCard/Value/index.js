import { Tooltip } from '@cogoport/components';

import {
	COUNTRY_CODE_TO_NUMBER_MAPPING,
	MOBILE_CONTROLS,
} from '../../../../../../../configurations/response-keys-mapping';
import styles from '../styles.module.css';

import Workscopes from './Workscopes';

function Value(props) {
	const { response, labelKey } = props;

	if (labelKey === 'work_scopes' && response?.[labelKey]) {
		return <Workscopes work_scopes={response?.[labelKey]} />;
	}

	if (MOBILE_CONTROLS.includes(labelKey)
    && response?.[labelKey] && response?.[COUNTRY_CODE_TO_NUMBER_MAPPING[labelKey]]) {
		return 	(

			<div className={styles.bottom}>
				{response?.[COUNTRY_CODE_TO_NUMBER_MAPPING[labelKey]]}
				{' '}
				{response?.[labelKey]}
			</div>

		);
	}

	return 	(

		response?.[labelKey] ? (
			<Tooltip
				placement="bottom"
				content={(response?.[labelKey])}
			>
				<div className={styles.bottom}>
					{response?.[labelKey] }
				</div>
			</Tooltip>
		) : '__'
	);
}
export default Value;
