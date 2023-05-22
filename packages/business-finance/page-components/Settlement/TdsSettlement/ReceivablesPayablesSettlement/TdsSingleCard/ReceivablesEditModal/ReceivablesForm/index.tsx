import { Button } from '@cogoport/components';
import { SelectController, InputController, AsyncSelectController } from '@cogoport/forms';

import tdsCollectionFilters from '../../../../../configurations/tds-settlement/tds-receivables-collection';

import styles from './styles.module.css';

function ReceivablesFrom({
	handleSubmit = () => {},
	onSubmit = () => {},
	control,
	errors,
	editTdsLoading,
	setShow,
	reset,
}) {
	const formControls = tdsCollectionFilters();

	const controlTypeMapping = {
		asyncSelect : AsyncSelectController,
		select      : SelectController,
		text        : InputController,
	};

	function FormElement({ name, label, type, show, ...rest }) {
		const Element = controlTypeMapping[type];

		return Element && show ? (
			<div>
				<div className={styles.label}>{label}</div>

				<Element name={name} type={type} {...rest} />

				{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
			</div>
		) : null;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
			{formControls.map((item) => <FormElement control={control} errors={errors} {...item} />)}
			<div style={{ display: 'flex' }}>
				<Button
					size="md"
					themeType="secondary"
					style={{ marginRight: '10px' }}
					onClick={() => {
						setShow(false);
						reset();
					}}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					size="md"
					disabled={editTdsLoading}
				>
					Upload
				</Button>
			</div>
		</form>
	);
}

export default ReceivablesFrom;
