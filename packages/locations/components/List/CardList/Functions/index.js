import React from 'react';

import Status from './Status';

export const renderStatus = (item, field) => <Status value={item[field?.key]} />;
