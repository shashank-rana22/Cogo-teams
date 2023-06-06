import { Button, Modal } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOrganization, asyncFieldsOrganizationUsers,
}
	from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import Layout from '../../../../../RfqEnquiries/Layout';
import LclFields from '../../../../configurations/lcl-controls';
import useAddRate from '../../../../hooks/useAddRate';

function AddRateModel({ show, setShow }) {
	const serviceProviderOptions = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{ params: { filters: { account_type: 'service_provider', kyc_status: 'verified' } } },
		),
	);
	const { control, handleSubmit, postApi, setErrors, value } = useAddRate();

	const organizationUsersOptions = useGetAsyncOptions(
		merge(
			asyncFieldsOrganizationUsers(),
			{ params: { filters: { organization_id: value?.service_provider_id } } },
		),

	);
	const onClose = () => {
		setShow(false);
	};

	const controls = LclFields();

	const newControls = controls.map((cont) => {
		const { name } = cont;
		let newControl = { ...cont };
		if (name === 'service_provider_id') {
			newControl = { ...newControl, ...serviceProviderOptions };
		} else if (name === 'sourced_by_id') {
			newControl = { ...newControl, ...organizationUsersOptions };
		}
		// if (newControl.controls) {
		// 	let chargeCodes = {};
		// 	if (newControl.charge_code_name && data?.[newControl.charge_code_name]) {
		// 		chargeCodes = data[newControl.charge_code_name];
		// 	}
		// 	newControl.controls.forEach((childcontrol) => {
		// 		if (childcontrol.name === 'unit') {
		// 			const unitOptions = {};
		// 			const chargeValues = value[control.name];
		// 			chargeValues?.forEach((item, i) => {
		// 				unitOptions[i] = (
		// 					chargeCodes[item.code]?.units || ['per_container']
		// 				).map((unit) => ({
		// 					label : startCase(unit),
		// 					value : unit,
		// 				}));
		// 			});
		// 			// eslint-disable-next-line no-param-reassign
		// 			childcontrol.customProps = {};
		// 			// eslint-disable-next-line no-param-reassign
		// 			childcontrol.customProps.options = unitOptions;
		// 		}
		// 		if (childcontrol.name === 'code') {
		// 			const newOptions = Object.keys(chargeCodes).map((code) => ({
		// 				label : `${code} ${chargeCodes[code]?.name}`,
		// 				value : code,
		// 				code,
		// 				...(chargeCodes[code] || {}),
		// 			}));
		// 			// eslint-disable-next-line no-param-reassign
		// 			childcontrol.options = newOptions;
		// 		}
		// 	});
		// }
		return { ...newControl };
	});

	const handleData = (values, e) => {
		// e.preventDefault();
		postApi(values);
	};

	const onError = (errs, e) => {
		e.preventDefault();
		setErrors({ ...errs });
	};

	return (
		<Modal size="lg" show={show} onClose={onClose} placement="center">
			<Modal.Header title="Add Rate " />
			<Modal.Body>
				<Layout
					fields={newControls}
					control={control}
					errors={{}}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="tertiary"
					style={{ marginRight: '4px' }}
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					type="submit"
					onClick={handleSubmit(handleData, onError)}
				>
					Add Rate
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddRateModel;
