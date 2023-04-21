import { startCase } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

const accounts = { // temporary data
	flame_hot : '200',
	hot       : '800',
	warm      : '900',
	cold      : '-',
	icy_cold  : '-',
};

function SettingsItem(props) {
	const {
		item = '', useGetControls = () => {},
		index = 0, inputStyle, control, errors,
	} = props;

	const controls = useGetControls(item);

	return (
		<div className={styles.container}>
			{inputStyle === 'distribution_input'
			&& (
				<div className={styles.warmth_container}>
					{
								index === 0 && (
									<div className={styles.label}>
										WARMTH
									</div>
								)
							}

					<div className={styles.headers}>
						{startCase(item.warmth) || ''}
					</div>
				</div>
			)}
			<div className={styles.input_row}>
				{controls.map((element) => {
					const Element = getFieldController(element.type);

					return (
						<div className={styles?.[inputStyle] || styles.input}>
							{index === 0 && (
								<div className={styles.label}>
									{element.label}
								</div>
							)}

							<Element
								{...element}
								key={element.name}
								control={control}
							/>

							<div className={styles.error_message}>
								{errors?.[element.name]?.message}
							</div>
						</div>
					);
				})}
			</div>
			{inputStyle === 'distribution_input'
			&& (
				<div className={styles.accounts_container}>
					{
								index === 0 && (
									<div className={styles.label}>
										NUMBER OF ACCOUNTS
									</div>
								)
							}

					<div className={styles.headers}>
						{accounts?.[item]}
					</div>
				</div>
			)}

		</div>
	);
}

export default SettingsItem;
