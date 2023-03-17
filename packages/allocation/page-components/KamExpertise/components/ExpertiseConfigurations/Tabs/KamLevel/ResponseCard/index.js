import { Placeholder, Button } from '@cogoport/components';
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
	createKAM,
	dataLength,
	refetch,
}) {
	const { formProps, onCreate, createLoading } = useCreateKamLevel({ dataLength, setCreateKam, refetch });
	const { control, handleSubmit, formState: { errors } } = formProps;

	const controlsWithValidations = addValidationRulesToControls(controls);
	const controlsBottomWithValidations = addValidationRulesToControls(controlsBottom);

	return (
		(createKAM ? (

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
				{!createLoading ? (
					<div className={styles.cancel_button}>
						<Button
							style={{ margin: '10px' }}
							themeType="secondary"
							onClick={() => setCreateKam(false)}
						>
							Cancel

						</Button>
						<Button
							style={{ margin: '10px' }}
							onClick={handleSubmit(onCreate)}
						>
							Save

						</Button>

					</div>
				) : (
					<div className={styles.cancel_button} />
				)}

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
									{
										createLoading ? (<Placeholder height="30px" width="300px" />) : (
											<Element
												{...singleField}
												key={singleField.label}
												control={control}
												id={singleField.name}
											/>
										)
									}

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
										{
											createLoading ? (<Placeholder height="30px" width="300px" />) : (
												<Element
													{...singleField}
													key={singleField.label}
													control={control}
													id={singleField.name}
												/>
											)
										}

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
		) : (
			<div style={{ marginTop: '10px' }}>
				<Button
					themeType="secondary"
					className={styles.create_button}
					onClick={() => setCreateKam(true)}
				>
					Create Kam Level
				</Button>
			</div>
		))

	);
}

export default ResponseCard;
