import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
// import { isValid } from '@cogoport/utils';
import React from 'react';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';
import useCreateKamLevel from '../../../../../hooks/useCreateKamLevel';
import { controls, controlsBottom } from '../getControls';

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
	const { formProps, onCreate, createLoading } = useCreateKamLevel({ dataLength, setCreateKam, refetch });
	const { control, handleSubmit, formState: { errors } } = formProps;

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
					style={{ margin: '10px' }}
					themeType="secondary"
					onClick={() => setCreateKam(false)}
				>
					Cancel

				</Button>
				<Button
					disabled={createLoading}
					style={{ margin: '10px' }}
					onClick={handleSubmit(onCreate)}
				>
					Save

				</Button>

			</div>

			{controlsWithValidations.map((singleField) => {
				const Element = getFieldController(singleField.type) || null;

				if (!Element) return null;

				return (
					<>
						<div className={styles.row_level}>
							{' '}
							{singleField.label}
							<div className={styles.supporting_text}>Score</div>
							<div>
								<Element
									{...singleField}
									key={singleField.label}
									control={control}
									id={singleField.name}
									disabled={createLoading}
								/>

								{errors[singleField.name] && (
									<span className={styles.errors}>
										{errors[singleField.name].message}
									</span>
								)}

							</div>
						</div>
						<div className={styles.border_class} />
					</>
				);
			})}

			<div className={styles.row_level_end}>
				<h2>Transacting Accounts</h2>
				<div className={styles.row_level_end_options}>
					{controlsBottomWithValidations.map((singleField) => {
						const Element = getFieldController(singleField.type) || null;

						if (!Element) return null;

						return (
							<div className={styles.row_level} style={{ width: '30%' }}>
								{' '}
								{singleField.label}

								<div>
									<Element
										{...singleField}
										key={singleField.label}
										control={control}
										id={singleField.name}
										disabled={createLoading}
									/>

									{errors[singleField.name] && (
										<span className={styles.errors}>
											{errors[singleField.name].message}
										</span>
									)}

								</div>

								{' '}

							</div>
						);
					})}

				</div>

			</div>

		</div>

	);
}

export default ResponseCard;
