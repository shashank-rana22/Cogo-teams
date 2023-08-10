import { Loader } from '@cogoport/components';
import { RadioGroupController, useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef, useEffect } from 'react';

import useListExistingPoc from '../../../../../../hooks/useListExistingPoc';

import styles from './styles.module.css';

function ExistingPOC({
	setExistingPocData = () => {},
	importer_exporter_id = '',
	trade_party_type = '',
	trade_party_id = '',
}, ref) {
	const { data = [], loading } = useListExistingPoc({
		organization_id: importer_exporter_id,
		trade_party_type,
		trade_party_id,
	});

	useEffect(() => { setExistingPocData(data); }, [data, setExistingPocData]);

	const { handleSubmit, control, formState:{ errors = {} } } = useForm();

	useImperativeHandle(ref, () => ({ handleSubmit }));

	const options = (data || []).map((item) => (
		{
			label: (
				<div className={styles.label_container}>
					<div className={styles.label_name}>{item?.name}</div>
					<div className={styles.label_email}>{item?.email}</div>
					<div className={styles.label_contact}>
						{`${item?.mobile_country_code} ${item?.mobile_number}`}
					</div>
				</div>
			),
			value: item?.id,
		}
	));

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	return (
		<div className={styles.container}>
			{Error('existing_poc')}

			{loading ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			)

				: (
					<RadioGroupController
						options={options}
						control={control}
						name="existing_poc"
						rules={{ required: { value: true, message: 'POC is required' } }}
					/>
				)}
		</div>
	);
}
export default forwardRef(ExistingPOC);
