import { Input } from '@cogoport/components';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Aliases({ showAlias, setShowAlias = () => {}, alias = {}, filteredAliases = [] }) {
	const { id } = alias || {};

	const updatedAlias = [...showAlias];
	const index = updatedAlias.findIndex((aliass) => aliass.id === id);

	const showAddIcon = filteredAliases.slice(-1)[0];

	const { id: showAddIconId, question_abstract } = showAddIcon || {};

	const onClickDeleteIcon = () => {
		updatedAlias[index] = { ...updatedAlias[index], status: 'inactive' };
		setShowAlias(updatedAlias);
	};

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<Input
					size="md"
					placeholder="Add alias"
					value={showAlias[index]?.question_abstract}
					onChange={(event) => {
						updatedAlias[index] = { ...updatedAlias[index], question_abstract: event };
						setShowAlias(updatedAlias);
					}}

				/>

				<div className={styles.icon_wrapper}>
					<IcMDelete
						width={30}
						height={30}
						style={{ cursor: 'pointer' }}
						onClick={onClickDeleteIcon}
					/>

					{showAddIconId === id && question_abstract && (
						<IcMPlusInCircle
							width={28}
							height={28}
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
