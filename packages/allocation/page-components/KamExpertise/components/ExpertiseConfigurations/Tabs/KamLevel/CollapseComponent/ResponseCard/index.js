import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

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
	dataLength = '',
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
					{ dataLength ? dataLength + 1 : 1}
					<IcMArrowNext className={styles.arrow} />
					{' '}
					{ dataLength ? dataLength + 2 : 2}
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
			<FormComponent
				formProps={formProps}
				controls={controlsWithValidations}
				createLoading={createLoading}
				isTop
			/>
			<div className={styles.bottom_supporting_txt}>Transacting Accounts</div>

			<div className={styles.bottom_form}>
				<FormComponent
					formProps={formProps}
					controls={controlsBottomWithValidations}
					createLoading={createLoading}
				/>
			</div>

		</div>
	);
}

export default ResponseCard;
