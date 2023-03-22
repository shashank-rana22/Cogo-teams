import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
// import { isValid } from '@cogoport/utils';
import React from 'react';

// import Form from '../../../../../../../../common/Form';
import useCreateKamLevel from '../../../../../../hooks/useCreateKamLevel';
import FormComponent from '../../FormComponent';
import { controls, controlsBottom } from '../../getControls';

import styles from './styles.module.css';

function addValidationRulesToControls(item) {
	return item.map((control) => ({
		...control,
		rules: {
			required: `${control.label} is Required`,
		},
	}));
}

function ResponseCard({
	setCreateKam = () => { },
	dataLength,
	refetch,
}) {
	const {
		formProps,
		onCreate,
		createLoading,
	} = useCreateKamLevel({ dataLength, setCreateKam, refetch });

	const { handleSubmit } = formProps;

	const controlsWithValidations = addValidationRulesToControls(controls);
	const controlsBottomWithValidations = addValidationRulesToControls(controlsBottom);

	return (
		<div className={styles.level_card_container}>
			<div className={styles.level_desc}>
				<b>
					KAM
					{' '}
					{dataLength + 1}
					<IcMArrowNext className={styles.arrow} />
					{' '}
					{dataLength + 2}
				</b>
			</div>

			<div className={styles.cancel_button}>
				<Button
					disabled={createLoading}
					themeType="secondary"
					onClick={() => setCreateKam(false)}
				>
					Cancel
				</Button>

				<Button
					loading={createLoading}
					onClick={handleSubmit(onCreate)}
				>
					Save
				</Button>
			</div>
			<div style={{ width: '20%' }} />

			<FormComponent formProps={formProps} controls={controlsWithValidations} />

			<div className={styles.row_level_end}>
				<span className={styles.span_heading}>Transacting Accounts</span>
				<div className={styles.row_level_end_options}>
					<FormComponent formProps={formProps} controls={controlsBottomWithValidations} />
				</div>
			</div>
		</div>
	);
}

export default ResponseCard;
