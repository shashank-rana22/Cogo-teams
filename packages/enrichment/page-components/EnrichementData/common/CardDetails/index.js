import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMLocation, IcMProfile } from '@cogoport/icons-react';
import { useEffect } from 'react';

import { getFieldController } from '../../../../common/Form/getFieldController';
import getControls from '../../configurations/get-controls';

import styles from './styles.module.css';

const cardHeader = {
	user: {
		icon  : <IcMProfile />,
		label : 'POC',
	},
	address: {
		icon  : <IcMLocation />,
		label : 'Address',
	},
};

function CardDetails({ type = '' }) {
	const controls = getControls({ type });

	const formProps = useForm({
		defaultValues: {},
	});

	const { control, handleSubmit, reset } = formProps;

	useEffect(() => {
		reset();
	}, [type]);

	const onSave = (formValues, e) => {
		e.preventDefault();

		console.log('formValues :: ', formValues);
	};

	return (

		<form onSubmit={handleSubmit(onSave)}>
			<div className={styles.card}>

				<div className={styles.card_header}>

					<div className={styles.card_header_icons}>{cardHeader[type].icon}</div>
					<div>{cardHeader[type].label}</div>
				</div>

				<div className={styles.row_container}>
					{controls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getFieldController(el.type);

						if (!Element) return null;

						return (
							<div className={styles.control_container}>
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
						type="submit"
						size="md"
						themeType="primary"
					>
						Save

					</Button>
				</div>

			</div>

		</form>

	);
}

export default CardDetails;
