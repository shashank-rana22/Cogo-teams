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
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			{ inputStyle === 'distribution_input'
				&& (
					<div>
						{
									index === 0 && (
										<div className={styles.label}>
											WARMTH
										</div>
									)
								}

						{/* change styling for item label */}
						<div style={{ width: '100px', fontSize: '12px', padding: '16px' }}>
							{WARMTH_MAPPING?.[item]}
						</div>
					</div>
				)}
			{
					controls.map((element) => {
						const el = { ...element };
						const Element = getFieldController(el.type);

						return (
							<div>
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
									className={styles?.[inputStyle]}
								/>
							</div>
						);
					})
						}

		</div>
	);
}

export default TableItem;
