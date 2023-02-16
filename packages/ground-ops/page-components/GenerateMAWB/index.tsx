import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import FieldArray from './FieldArray';
import GenerateMawbDoc from './GenerateMawbDoc';
import getElementController from './getController';
import mawbControls from './mawbControls';
import styles from './styles.module.css';
import useGenerateDocument from './useGenerateDocument';

function GenerateMAWB({ viewDoc = false }) {
	const [back, setBack] = useState(false);
	const { control, watch, handleSubmit, formState: { errors } } = useForm();
	const fields = mawbControls();
	return (
		<div>
			<div className={styles.heading}>Generate MAWB</div>
			<div className={styles.form_container}>
				<div className={styles.flex}>
					<form>
						<div className={styles.content}>
							{fields.map((field) => {
								const { ...rest } = field;

								if (rest.type === 'fieldArray') {
									return (
										<div className={styles.list}>
											<h4>{field.label}</h4>
											<FieldArray {...rest} control={control} />
										</div>
									);
								}
								const Element = getElementController(rest.type);
								return (
									<div className={styles.list}>
										<h4>{field.label}</h4>
										<Element
											width="100%"
											control={control}
											{...rest}
										/>
										<div className={styles.error}>{errors[field.name]?.message}</div>
									</div>
								);
							})}
						</div>
						<div className={styles.button_div}>
							{!back ? (
								<Button>
									Generate Master Airway Bill
								</Button>
							) : null}
						</div>
					</form>
				</div>

			</div>
			<div className={styles.file_container}>
				{(back || viewDoc) && (
					// <GenerateMawbDoc />
					<h1>GenerateMawbDoc</h1>
				)}
			</div>
		</div>
	);
}

export default GenerateMAWB;
