import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import { getFieldController } from '@cogoport/ocean-modules/utils/getFieldController';
import { useEffect, useState } from 'react';

import useCreateAutoUpsellService from '../../../../../../hooks/useCreateAutoUpsellService';
import useListOrganizationUsers from '../../../../../../hooks/useListOrganizationUsers';

import getControls from './getControls';
import styles from './styles.module.css';

function Error(key, errors) {
	return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
}

function BillingAddress({ task = {}, refetch = () => {}, consigneeShipperId = '', onCancel = () => {} }) {
	const [countryId, setCountryId] = useState('');

	const { loading = false, defaultValues = {} } = useListOrganizationUsers({ consigneeShipperId });

	const { control, reset, formState:{ errors = {} }, handleSubmit } = useForm();

	const {
		onSubmit = () => {},
		loading: upsellLoading = false,
	} = useCreateAutoUpsellService({ task, refetch, onCancel });

	const countryValidation = getCountryConstants({
		country_id    : countryId,
		isDefaultData : false,
	});

	const { controls = [] } = getControls({ setCountryId, countryValidation });

	useEffect(() => {
		reset(defaultValues);
	}, [reset, defaultValues]);

	return (
		<div className={styles.main_container}>
			<div className={styles.flex_container}>
				{controls?.map((cntrl) => {
					const { type = '', name = '', styles: style = {}, label = '' } = cntrl;

					const Element = getFieldController(type);

					return (
						<>
							<div
								className={styles.form_item_container}
								key={name}
								style={style}
							>
								<label className={styles.form_label}>{label}</label>

								<Element
									control={control}
									{...cntrl}
								/>
							</div>

							{Error(name, errors)}
						</>
					);
				})}
			</div>

			<div className={styles.button_container}>
				<Button disabled={upsellLoading || loading} onClick={handleSubmit(onSubmit)}>
					Save
				</Button>
			</div>
		</div>
	);
}

export default BillingAddress;
