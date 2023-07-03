import { Toggle } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMEmail } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import getElementController from '../../../../../../../../../../commons/forms/getElementController';
import ToEmailList from '../ToEmailList';

import controls from './controls';
import getPrefilledValues from './getPrefilledValues';
import styles from './styles.module.css';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function EmailComponent({ detail, organization = {}, billing_addresses = [] }) {
	const { agent_id } = useSelector(({ profile }) => ({
		agent_id: profile?.id,
	}));

	const prefilledValues = getPrefilledValues(detail, [
		organization?.agent_id,
		agent_id,
	]);

	const [activateTerms, setActivateTerms] = useState(true);

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		Object.entries(prefilledValues).forEach(([key, value]) => {
			setValue(key, value);
		});
	}, [prefilledValues, setValue]);

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<IcMEmail width={20} height={20} />
				<div className={styles.heading}>Customize Email</div>
			</div>

			<ToEmailList billing_addresses={billing_addresses} organization={organization} detail={detail} />

			<div className={styles.sub_heading}>Edit Email Content</div>

			{controls.map((controlItem) => {
				const { name, label, type } = controlItem;

				const Element = getElementController(type);

				if (name === 'terms_and_conditions') {
					return (
						<div key={name} className={`${styles.form_group} ${styles[name]}`}>
							<div className={`${styles.label} ${styles[name]}`}>
								{label}

								<Toggle
									name="aactivate_t&c"
									size="sm"
									disabled={false}
									onLabel="Enabled"
									offLabel="Disabled"
									checked={activateTerms}
									onChange={() => setActivateTerms((prev) => !prev)}
								/>
							</div>

							<div className={`${styles.input_group} ${styles[name]}`}>
								<Element
									{...(type === 'file-uploader'
										? removeTypeField(controlItem)
										: { ...controlItem })}
									key={name}
									control={control}
									id={`${name}_input`}
									disabled={!activateTerms}
								/>
							</div>

							{errors?.[name]?.message ? (
								<div className={styles.error_message}>
									{errors?.[name]?.message}
								</div>
							) : null}
						</div>
					);
				}

				return (
					<div key={name} className={`${styles.form_group} ${styles[name]}`}>
						<div className={styles.label}>{label}</div>

						{name === 'body' ? (
							<div className={styles.label} style={{ marginTop: '12px' }}>
								Dear
								{' '}
								{'<Recipient Name>'}
							</div>
						) : null}

						<div className={`${styles.input_group} ${styles[name]}`}>
							<Element
								{...(type === 'file-uploader'
									? removeTypeField(controlItem)
									: { ...controlItem })}
								key={name}
								control={control}
								id={`${name}_input`}
							/>
						</div>

						{errors?.[name]?.message ? (
							<div className={styles.error_message}>
								{errors?.[name]?.message}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default EmailComponent;
