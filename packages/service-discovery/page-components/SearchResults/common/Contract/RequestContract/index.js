import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { addDays } from '@cogoport/utils';
import React, { useEffect } from 'react';

import LocationDetails from '../../../../../common/LocationDetails';
import getElementController from '../../../../../configs/getElementController';
import getErrorMessage from '../../../../../configs/getErrorMessage';
import useCreateContract from '../../../hooks/useCreateContract';
import LoadDetails from '../common/LoadDetails';

import createContracts from './controls';
import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const PERCENTAGE_FACTOR = 100;
const FLEX_OFFSET = 2;

const MAX_DAYS_DIFFERENCE = 30;

function RequestContract({
	rateCardId = '',
	detail = {},
	setShow = () => {},
	setScreen = () => {},
	setContractData = () => {},
}) {
	const controls = createContracts();

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm();

	const { search_type = '' } = detail || {};

	const { createContract, loading } = useCreateContract({
		rateCardId,
		setContractData,
		search_type,
	});

	const onSubmit = async (val) => {
		const done = await createContract(val);

		if (done) {
			setScreen('submitted');
		}
	};

	const startDate = watch('validity_start');

	useEffect(() => {
		setValue('validity_end', null);
	}, [setValue, startDate]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text_container}>
					<span className={styles.heading}>Request Contract</span>

					<span className={styles.supporting_heading}>Note: Only Basic Freight rate will be locked.</span>
				</div>

				<div className={styles.details_container}>
					<LocationDetails data={detail} />

					<div className={styles.load_details}>
						<LoadDetails detail={detail} />
					</div>
				</div>
			</div>

			<div className={styles.form}>
				<div className={styles.form_items_container}>
					{controls.map((controlItem) => {
						let newControl = { ...controlItem };

						const { name, label, type, span } = newControl;

						if (!newControl.showIn.includes(search_type)) {
							return null;
						}

						const Element = getElementController(type || 'text');
						if (!Element) return null;

						const errorOriginal = getErrorMessage({
							error : errors?.[newControl.name],
							rules : newControl?.rules,
							label : newControl?.label,
						});

						const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENTAGE_FACTOR - FLEX_OFFSET;

						const maxDate = addDays(startDate, MAX_DAYS_DIFFERENCE);
						const minDate = startDate;

						if (name === 'validity_end') {
							newControl = { ...newControl, maxDate, minDate };
						}

						return (
							<div key={`${name}_${label}`} className={styles.form_item} style={{ width: `${flex}%` }}>
								<div className={styles.label}>
									{label || ''}

									{newControl?.rules?.required && label ? (
										<span className={styles.required_mark}>*</span>
									) : null}
								</div>

								<div className={styles.element}>
									<Element
										{...newControl}
										name={name}
										label={label}
										control={control}
									/>
								</div>

								{errors[name] && (
									<div className={styles.error_message}>
										{errorOriginal}
									</div>
								)}
							</div>
						);
					})}
				</div>

				<div className={styles.buttons_container}>
					<Button
						size="lg"
						themeType="secondary"
						style={{ marginRight: 16 }}
						onClick={() => setShow(false)}
						disabled={loading}
					>
						Cancel
					</Button>

					<Button
						size="lg"
						themeType="accent"
						onClick={handleSubmit(onSubmit)}
						loading={loading}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}

export default RequestContract;
