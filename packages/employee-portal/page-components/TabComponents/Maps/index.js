import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';

import getFieldController from '../../../configs/getElementController';
import controls from '../../../utils/map-controls';

import styles from './styles.module.css';

const Map = dynamic(() => import('../Map'), {
	ssr: false,
});

function Maps({ setInformationPage }) {
	const formProps = useForm();

	const { control } = formProps;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>MAPS</div>
			</div>

			<div className={styles.map_field_container}>
				{controls.map((controlItem) => {
					const el = { ...controlItem };
					const Element = getFieldController(el.type);

					if (!Element) return null;

					return (
						<div key={el.name}>
							<span className={styles.label}>{el.label}</span>
							<div className={styles.input_group}>
								<Element
									{...el}
									key={el.name}
									control={control}
									id={`${el.name}_input`}
								/>
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.lower_text}>
				{' '}
				<h3>Our Mumbai Office Address:</h3>
				Cogoport, 6th Floor, B Wing, Ackruti Trade Centre,
				{' '}
				<br />
				Kondivita, MIDC, Andheri East, Mumbai - 400069 Maharashtra, India
			</div>

			<Map />
		</div>
	);
}

export default Maps;
