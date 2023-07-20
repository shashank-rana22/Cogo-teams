import { Button } from '@cogoport/components';
import { RadioGroupController, useForm, MultiselectController, InputController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/ocean-modules';
import React, { useState, useEffect } from 'react';

import useAddSopData from '../../../../../hooks/useAddSopData';
import conditionOptions from '../helpers/sop_condition_options';

import controls from './controls';
import styles from './styles.module.css';

const SOP_TYPE_OPTIONS = [
	{ label: 'For This Shipment', value: 'shipment' },
	{ label: 'For Booking Party', value: 'for_booking_party' },
];

function AddSop({
	setSopAddForm = () => {},
	setReload = () => {},
	reload,
	trade_partners_details,
	primary_service,
	shipment_data,
}) {
	const [sopType, setSopType] = useState(SOP_TYPE_OPTIONS[GLOBAL_CONSTANTS.zeroth_index]?.value);
	const [formHeading, setFormHeading] = useState('');
	const [errors, setErrors] = useState({});
	const [hasData, sethasData] = useState(false);
	const [showheadingError, setShowHeadingError] = useState(false);

	const conditionOption = conditionOptions(primary_service, trade_partners_details);

	const fieldControls = controls({
		primary_service,
		trade_partners_details,
	});

	const { control, watch, handleSubmit } = useForm({
		defaultValues: { instruction_items: [{}] },
	});

	const formValues = watch();

	const { handleAddSop, loading } = useAddSopData({
		formValues,
		api          : 'create',
		sopID        : '',
		originalData : [],
		reload,
		setReload,
		setSopAddForm,
		trade_partners_details,
		primary_service,
		shipment_data,
	});

	useEffect(() => {
		const { instruction_items = {}, heading = {}, conditions = {} } = formValues;
		let hasIntructions = false;
		if (instruction_items.length) {
			if (instruction_items[GLOBAL_CONSTANTS.zeroth_index].instruction
				|| instruction_items[GLOBAL_CONSTANTS.zeroth_index].file) {
				hasIntructions = true;
			}
		}

		if (heading || conditions.length || hasIntructions) {
			sethasData(true);
		} else {
			sethasData(false);
		}
	}, [formValues]);

	const onError = (errs, e) => {
		e.preventDefault();
		if (Object.keys(errs).includes('heading')) {
			setShowHeadingError(true);
		} else {
			setShowHeadingError(false);
		}

		setErrors({ ...errs });
	};
	return (
		<div className={styles.container}>
			<div className={styles.radio_row}>
				<RadioGroupController
					options={SOP_TYPE_OPTIONS}
					control={control}
					name="soptype"
					onChange={(val) => setSopType(val)}
					value={sopType}
				/>
			</div>
			<div className={styles.form_box}>
				{formValues.soptype === 'for_booking_party' ? (
					<>
						<div className={styles.heading}>Applicable if (optional)</div>
						<MultiselectController
							size="sm"
							name="conditions"
							placeholder="Select a Condition"
							control={control}
							options={conditionOption}
						/>
					</>
				) : null}
				<div className={styles.sop_heading}>
					<InputController
						size="sm"
						control={control}
						name="heading"
						placeholder="Enter heading"
						value={formHeading}
						onChange={(value) => setFormHeading(value)}
					/>
					{showheadingError ? (
						<div className={styles.sop_heading_error}>Heading is Required</div>
					) : null}
				</div>
				<Layout
					fields={fieldControls}
					control={control}
					errors={errors}
				/>
			</div>
			<div className={styles.actions_row}>
				<Button className="primary sm" onClick={() => setSopAddForm(false)}>
					Close
				</Button>

				<Button
					className="secondary sm"
					onClick={handleSubmit(handleAddSop, onError)}
					style={{ marginLeft: '10px' }}
					disabled={!hasData || loading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
export default AddSop;
