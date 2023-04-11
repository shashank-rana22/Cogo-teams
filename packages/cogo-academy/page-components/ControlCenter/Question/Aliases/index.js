import { Input } from '@cogoport/components';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Aliases({ showAlias, setShowAlias = () => {}, alias = {}, filteredAliases = [] }) {
	const id = alias?.id;

	const aliasIndex = showAlias.findIndex((obj) => obj.id === id);

	const showAddIcon = filteredAliases.slice(-1)[0];

	const { id: showAddIconId, question_abstract } = showAddIcon || {};

	const onClickDeleteIcon = () => {
		const updatedAlias = [...showAlias];
		const index = updatedAlias.findIndex((aliass) => aliass.id === id);
		updatedAlias[index] = { ...updatedAlias[index], status: 'inactive' };
		setShowAlias(updatedAlias);
	};

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<Input
					size="md"
					placeholder="Enter alias"
					value={showAlias[aliasIndex]?.question_abstract}
					onChange={(event) => {
						setShowAlias((prevAliases) => {
							const existingAliasIndex = prevAliases.findIndex(
								(element) => element.id === id,
							);
							return prevAliases.map((element, index) => (index === existingAliasIndex
								? { id, question_abstract: event }
								: element));
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

					{showAddIconId === id && question_abstract && (
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
