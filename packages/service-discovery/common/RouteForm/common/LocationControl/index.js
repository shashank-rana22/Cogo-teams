import { Toast } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const PERCENT_FACTOR = 100;
const FLEX_OFFSET = 4;

const NOT_FOUND_ERROR_STATUS = 404;

function LocationControl({
	controlItem = {},
	formValues = {},
	setFormValues = () => {},
	intent = '',
	service_type = '',
	organization = {},
	...rest
}) {
	const { label, span, name } = controlItem;

	const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENT_FACTOR - FLEX_OFFSET;

	const key = name.split('_')?.[GLOBAL_CONSTANTS.zeroth_index];

	const [, trigger] = useRequest({
		method : 'POST',
		url    : '/create_planet_search_history',
	}, { manual: true });

	const updateOrgSearchHistory = async (selectedOption, source) => {
		try {
			const payload = {
				organization_id   : organization?.organization_id,
				source,
				selected_location : {
					id: selectedOption,
					service_type,
				},
			};

			await trigger({ data: payload });
		} catch (err) {
			if (err.response && err.response?.status !== NOT_FOUND_ERROR_STATUS) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	};

	return (
		<section
			key={`${name}_select_control`}
			id={`${name}_select_control`}
			className={styles.form_item}
			style={{ width: `${flex}%` }}
		>
			<div className={styles.label}>
				{label || ''}
				{' '}
				<div className={styles.required_mark}>*</div>
			</div>

			<AsyncSelect
				{...controlItem}
				value={formValues?.[key]?.id}
				onChange={(id, obj) => {
					setFormValues((prev) => ({ ...prev, [key]: obj }));

					if (!isEmpty(obj) && intent === 'rate_search') {
						updateOrgSearchHistory(id, intent);
					}
				}}
				{...rest}
			/>
		</section>
	);
}

export default LocationControl;
