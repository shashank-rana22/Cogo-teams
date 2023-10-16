import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';

import { getSidFilterControls } from '../../../../configurations/sid-filters-controls';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function SidTypeFilters(props) {
	const { setIdFilters = () => {} } = props;

	const { t } = useTranslation(['myTickets']);

	const { control, handleSubmit, reset, watch, setValue } = useForm();
	const watchIdType = watch('id_type');
	const watchSerial = watch('serial_id');

	const controls = getSidFilterControls({ setValue, t });

	const onSubmit = (val) => {
		const { serial_id, id_type } = val || {};
		setIdFilters(() => ({
			serialId : serial_id,
			idType   : id_type,
		}));
	};

	return (
		<div className={styles.container}>
			{(controls || []).map((controlItem) => {
				const { name, label, controllerType } = controlItem || {};
				const Element = getFieldController(controllerType);

				if (!Element) {
					return null;
				}

				return (
					<div className={styles.wrap} key={name}>
						<div className={styles.label}>{label}</div>
						<Element
							{...controlItem}
							key={name}
							id={name}
							size="sm"
							control={control}
						/>
					</div>
				);
			})}
			<div className={styles.footer_section}>
				<Button
					themeType="secondary"
					size="sm"
					onClick={() => {
						reset();
						setIdFilters(() => ({
							serialId : '',
							idType   : '',
							show     : false,
						}));
					}}
				>
					{t('myTickets:reset')}
				</Button>
				<Button
					themeType="accent"
					size="sm"
					onClick={handleSubmit(onSubmit)}
					disabled={!watchIdType || !watchSerial}
				>
					{t('myTickets:apply')}
				</Button>
			</div>
		</div>
	);
}

export default SidTypeFilters;
