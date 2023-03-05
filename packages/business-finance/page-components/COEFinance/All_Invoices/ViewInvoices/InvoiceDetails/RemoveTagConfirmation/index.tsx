import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import useUpdateTag from '../../../../hook/useUpdateTag';

import styles from './styles.module.css';

interface RemoveTageInterface {
	billId?: string;
	getBillRefetch?: () => void;

	setRemoveTag: React.Dispatch<React.SetStateAction<boolean>>;
}
function RemoveTagConfirmation({
	setRemoveTag = () => {},
	getBillRefetch = () => {},
	billId = '',
}: RemoveTageInterface) {
	const onClose = () => {
		setRemoveTag(false);
		getBillRefetch();
	};

	const { loading, handleSubmit } = useUpdateTag({
		onClose,
		billId,
	});

	return (
		<div>
			<div className={styles.style_svg}>
				<IcMDelete />
			</div>

			<div className={styles.txt}>
				Are you sure you want to remove this Tag?
			</div>

			<div className={styles.btn_wrap}>
				<Button
					themeType="secondary"
					onClick={() => setRemoveTag(false)}
					disabled={loading}
				>
					No
				</Button>

				<Button
					themeType="primary"
					className={styles.primary}
					disabled={loading}
					onClick={() => handleSubmit()}
				>
					Yes
				</Button>
			</div>
		</div>
	);
}

export default RemoveTagConfirmation;
