import { Button } from '@cogoport/components';
import { node, func, bool, string } from 'prop-types';
import React from 'react';

import styles from './styles.module.css';

function Header({ children, loading, onClose, onSubmit, submitText, isSubmitDisabled }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				{children}
			</div>
			<div className={styles.right}>
				<Button type="button" className="outline small" onClick={onClose} id="scope_select_cancel_btn">
					Cancel
				</Button>
				<Button
					type="button"
					className="small"
					isLoading={loading || isSubmitDisabled}
					onClick={onSubmit}
					style={{ marginLeft: 16 }}
					id="scope_select_submit_btn"
				>
					{submitText || 'Submit'}
				</Button>
			</div>
		</div>
	);
}

Header.propTypes = {
	loading          : bool,
	children         : node,
	onClose          : func.isRequired,
	onSubmit         : func.isRequired,
	submitText       : string,
	isSubmitDisabled : bool,
};

Header.defaultProps = {
	loading          : false,
	children         : null,
	submitText       : null,
	isSubmitDisabled : false,
};

export default Header;
