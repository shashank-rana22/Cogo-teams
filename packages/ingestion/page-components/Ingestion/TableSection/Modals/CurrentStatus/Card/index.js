import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const colors = ['#FFFCE6', '#FDEBE9', '#FEF3E9', '#F9F9F9', '#F7FAEF', '#F3FAFA', '#FDFBF6', '#F2F3FA', '#FFD5CC'];

function Card({ count = 0, valueProps = {}, type = '' }) {
	const randomIndex = Math.floor(Math.random() * colors.length);
	const randomColor = colors[randomIndex];
	return (
		<div style={{ marginBottom: '10px' }}>
			<div style={{ marginBottom: '10px' }}>
				last
				{' '}
				{type}
				{' '}
				added :
				{' '}
				{count}
			</div>

			{!isEmpty(Object.keys(valueProps)) ? (
				<>
					<div className={styles.type_container}>
						{' '}
						latest
						{' '}
						{type}
						{' '}
						added :
					</div>
					<div className={styles.card_container} style={{ background: randomColor }}>

						{Object.entries(valueProps || {}).map(([key, val]) => (
							<div
								className={styles.loop_container}
								key={val}
							>
								<div style={{ color: '#222222' }}>
									{startCase(key)}
									{' '}
									:
								</div>
								<div style={{ color: '#221F20' }}>{val}</div>
							</div>
						))}
					</div>
				</>
			) : null}
		</div>
	);
}

export default Card;
