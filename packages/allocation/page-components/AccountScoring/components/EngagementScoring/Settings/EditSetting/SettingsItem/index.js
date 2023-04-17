import { useForm } from '@cogoport/forms';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

const WARMTH_MAPPING = {
	flame_hot : 'Flaming Hot',
	hot       : 'Hot',
	warm      : 'Warm',
	cold      : 'Cold',
	icy_cold  : 'Icy Cold',
};

function TableItem({ item = '', useGetControls = () => {}, index = 0, inputStyle = 'input' }) {
	const controls = useGetControls(item);

	const formProps = useForm();
	const { control } = formProps;

	return (
		<div className={styles.container}>
			{ inputStyle === 'distribution_input'
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
				{
				controls.map((element) => {
					const el = { ...element };
					const Element = getFieldController(el.type);

					return (
						<div className={styles?.[inputStyle]}>
							{
								index === 0 && (
									<div className={styles.label}>
										{el.label}
									</div>
								)
							}

							<Element
								{...el}
								key={`${item + el.name}`}
								control={control}
							/>
						</div>
					);
				})
					}
			</div>

		</div>
	);
}

export default TableItem;
