import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

const WARMTH_MAPPING = {
	flame_hot : 'Flaming Hot',
	hot       : 'Hot',
	warm      : 'Warm',
	cold      : 'Cold',
	icy_cold  : 'Icy Cold',
};

function TableItem(props) {
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
						{WARMTH_MAPPING?.[item]}
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
								key={`${item + element.name}`}
								control={control}
							/>

							<div className={styles.error_message}>
								{errors?.[element.name]?.message}
							</div>
						</div>
					);
				})}
			</div>

		</div>
	);
}

export default TableItem;
