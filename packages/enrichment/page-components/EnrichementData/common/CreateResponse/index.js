import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMLocation, IcMProfile } from '@cogoport/icons-react';
import { useEffect } from 'react';

import { getFieldController } from '../../../../common/Form/getFieldController';
import getUserControls from '../../../../configurations/get-controls';

import styles from './styles.module.css';

const cardHeader = {
	user: {
		icon  : <IcMProfile />,
		label : 'Add POC Details',
	},
	address: {
		icon  : <IcMLocation />,
		label : 'Add Address Details',
	},
};

function CreateResponse({
	loading = false,
	activeTab = '',
	setResponseData = () => {},
	responseData = [],
	user = {},
	type = '',
	index,
	setShowDetailsForm = () => {},
	setShowAddPoc = () => {},

}) {
	const controls = getUserControls({ activeTab });

	const formProps = useForm();

	const { control, handleSubmit, setValue } = formProps;

	useEffect(() => {
		setValue('email', user.email);
		setValue('name', user.name);
		setValue('work_scopes', user.work_scopes);
		setValue('alternate_email', user.alternate_email);
		setValue('mobile_number', {
			country_code : user.mobile_country_code,
			number       : user.mobile_number,
		});
		setValue('whatsapp_number', {
			country_code : user.whatsapp_country_code,
			number       : user.whatsapp_number,
		});
		setValue('alternate_mobile_number', {
			country_code : user.alternate_country_code,
			number       : user.alternate_mobile_number,
		});
	});

	const onSave = (formValues, e) => {
		e.preventDefault();

		if (type === 'create') {
			setResponseData((prev) => ([
				...prev,
				formValues,
			]));
		} else {
			const data = responseData;
			data[index] = formValues;

			setResponseData(data);
		}
		setShowDetailsForm(false);
		setShowAddPoc(false);
	};

	return (

		<form onSubmit={handleSubmit(onSave)}>
			<div className={styles.card}>

				<div className={styles.card_header}>

					<div className={styles.card_header_icons}>{cardHeader[activeTab].icon}</div>
					<div>{cardHeader[activeTab].label}</div>
				</div>

				<div className={styles.row_container}>
					{controls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getFieldController(el.type);

						if (!Element) return null;

						return (
							<div style={el.style} className={styles.control_container}>
								<span style={{ marginBottom: '12px' }}>{el.label}</span>
								<Element
									{...el}
									size="md"
									key={el.name}
									control={control}
									id={`${el.name}_input`}
								/>
							</div>
						);
					})}
				</div>

				<div className={styles.card_footer}>

					<Button
						type="button"
						size="md"
						themeType="secondary"
						disabled={loading}
						style={{ marginRight: '12px' }}
						onClick={() => setShowDetailsForm(false)}
					>
						Cancel

					</Button>

					<Button
						type="submit"
						size="md"
						themeType="primary"
						disabled={loading}
					>
						Save

					</Button>
				</div>

			</div>

		</form>

	);
}

export default CreateResponse;
