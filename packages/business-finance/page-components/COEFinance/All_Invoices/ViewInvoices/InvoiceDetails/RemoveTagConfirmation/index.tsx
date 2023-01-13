import React, { useEffect } from 'react';
import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import useUpdateTag from '../../../../hook/useUpdateTag';
import styles from './styles.module.css';

interface RemoveTageInterface {
	billId?:string
	getBillRefetch?:()=> void
	collectionPartyId?:string
	setRemoveTag: React.Dispatch<React.SetStateAction<boolean>>
}
const RemoveTagConfirmation = ({
	setRemoveTag = () => {},
	getBillRefetch = () => {},
	billId = '',
	collectionPartyId = '',
}:RemoveTageInterface) => {
	const onClose = () => {
		setRemoveTag(false);
		getBillRefetch();
	};

	const { loading, handleSubmit, data } = useUpdateTag({
		onClose,
		billId,
		collectionPartyId,
	});


	return (
		<div>
			<div className={styles.StyleSvg}>
				<IcMDelete/>
			</div>

			<div className={styles.Txt}>Are you sure you want to remove this Tag?</div>

			<div className={styles.BtnWrap}>
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
};

export default RemoveTagConfirmation;
