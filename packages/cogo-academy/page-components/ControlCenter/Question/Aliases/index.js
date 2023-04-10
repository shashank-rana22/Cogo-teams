import { Input } from '@cogoport/components';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Aliases({ showAlias, setShowAlias = () => {}, alias = {} }) {
	const id = alias?.id;

	const showAddIcon = showAlias.slice(-1)[0];

	const { id: showAddIconId, value } = showAddIcon || {};

	const onClickDeleteIcon = () => {
		const index = showAlias.findIndex((obj) => obj.id === id);

		if (index !== -1) {
			const updatedArray = showAlias.filter((obj) => obj.id !== id);
			setShowAlias(updatedArray);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<Input
					size="md"
					placeholder="Enter alias"
					value={showAlias[id]?.value}
					onChange={(event) => {
						setShowAlias((prevAliases) => {
							const existingAliasIndex = prevAliases.findIndex(
								(al) => al.id === id,
							);
							return prevAliases.map((al, index) => (index === existingAliasIndex
								? { id, value: event }
								: al));
						});
					}}

				/>

				<div className={styles.icon_wrapper}>
					<IcMDelete
						width={26}
						height={26}
						style={{ cursor: 'pointer' }}
						onClick={onClickDeleteIcon}
					/>

					{showAddIconId === id && value && (
						<IcMPlusInCircle
							width={26}
							height={26}
							onClick={() => setShowAlias((pv) => (
								[...pv, { id: (showAlias || []).length }]))}
							style={{ marginLeft: '6px', cursor: 'pointer' }}
						/>

					)}

				</div>
			</div>
		</div>
	);
}

export default Aliases;
