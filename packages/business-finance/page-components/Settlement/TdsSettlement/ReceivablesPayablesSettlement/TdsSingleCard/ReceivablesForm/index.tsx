import { SelectController, InputController, AsyncSelectController, DatepickerController } from '@cogoport/forms';

import tdsPayableFilters from '../../../../configurations/tds-settlement/tds-payables-collection';
import tdsCollectionFilters from '../../../../configurations/tds-settlement/tds-receivables-collection';

import styles from './styles.module.css';

function ReceivablesFrom({
	control,
	errors,
	TypeKey,
	globalFilters,
}) {
	const powerControls = (newControls) => newControls.map((controls) => {
		if (controls.name === 'id') {
			return {
				...controls,
				params: {
					filters: {
						organization_trade_party_detail_id : (globalFilters || {}).orgId,
						trade_party_type                   : ['self'],
						organization_account_type          : [
							TypeKey === 'AP' ? 'service_provider' : 'importer_exporter',
						],
					},
				},
			};
		}
		return { ...controls };
	});
	const formControls = TypeKey === 'AR' ? powerControls(tdsCollectionFilters()) : powerControls(tdsPayableFilters());

	const controlTypeMapping = {
		asyncSelect : AsyncSelectController,
		select      : SelectController,
		text        : InputController,
		datepicker  : DatepickerController,

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
		<form className={styles.form_container}>
			{formControls.map((item) => <FormElement control={control} errors={errors} {...item} />)}
		</form>
	);
}

export default ReceivablesFrom;
