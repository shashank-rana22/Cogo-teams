import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useCreateKRA from '../hooks/useCreateKRA';

import controls from './DescriptionControls';
import DropDownComponent from './DropDownComponent';
import EndComponent from './EndComponent';
import styles from './styles.module.css';

const DEFAULT_INDEX = 0;
const OFFSET = 1;

function FormComponent({ data }) {
	const {
		control,
		errors,
		handleSubmit,
		onClickSubmitButton,
		watch,
		setValue,
		showSelectedValue,
		setShowSelectedValue,
		loading,
	} = useCreateKRA();

	const {
		chapter_details,
		kra_details,
		kra_ratings,
		squad_details,
		sub_chapter_details,
		tribe_details,
		role_details,
	} = data || {};

	const { kra_name, kra_description, operation_key, is_rating_individual } = kra_details || {};

	useEffect(() => {
		setValue('kra_name', kra_name);
		setValue('kra_description', kra_description);
		setValue('operation_type', operation_key);
		setValue('is_rating_individual', is_rating_individual ? 'yes' : 'no');
		setValue('is_target_achieved_manually', operation_key === 'manual' ? 'yes' : 'no');
		setValue(
			'is_rating_schema_in_percentage',
			kra_ratings?.[DEFAULT_INDEX]?.value_type === 'percentage' ? 'yes' : 'no',
		);
		setValue(
			'target_value',
			kra_ratings?.[DEFAULT_INDEX]?.target_value,
		);
		setValue('squad_ids', squad_details?.map(({ id }) => (id)));
		setValue('tribe_ids', tribe_details?.map(({ id }) => (id)));
		setValue('chapter_ids', chapter_details?.map(({ id }) => (id)));
		setValue('sub_chapter_ids', sub_chapter_details?.map(({ id }) => (id)));
		setValue('role_ids', role_details?.map(({ id }) => (id)));
		kra_ratings?.forEach((kra_rating, index) => {
			setValue(`rating_${index + OFFSET}`, kra_rating.value);
		});
	}, [chapter_details, is_rating_individual, kra_description, kra_ratings, kra_name,
		operation_key, role_details, setShowSelectedValue, setValue, squad_details,
		sub_chapter_details, tribe_details]);

	return (
		<div className={styles.container}>
			<div>
				Hello,
			</div>

			<div style={{ width: '85%' }}>
				Before requesting a new KRA creation request,
				we urge you to kindly go through the list of KRAS we have active currently.
				If you feel the KRA you want to be created is not part of the system already,
				please go ahead and create a new KRA request.
			</div>

			<div className={styles.form}>
				{(controls || []).map((controlItem) => {
					const { name, type, label } = controlItem || {};

					if (!type) return null;

					const DynamicController = getElementController(type);

					return (
						<div key={name} className={styles.form_container}>
							<div key={name} className={styles.single_field}>
								<div className={styles.label}>
									{label}
								</div>

								<div className={styles.controller_wrapper}>
									<DynamicController
										{...controlItem}
										control={control}
										name={name}
									/>
								</div>
							</div>

							{errors[name] ? (
								<div className={styles.error_message}>
									{' '}
									{errors[name]?.message}
								</div>
							) : null}
						</div>

					);
				})}
			</div>

			<div className={styles.form}>
				<DropDownComponent
					control={control}
					errors={errors}
					setShowSelectedValue={setShowSelectedValue}
					showSelectedValue={showSelectedValue}
					data={data}
				/>
			</div>

			<div>
				<EndComponent control={control} errors={errors} watch={watch} setValue={setValue} />
			</div>

			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button onClick={handleSubmit(onClickSubmitButton)} loading={loading}>Submit</Button>
			</div>

		</div>

	);
}

export default FormComponent;
