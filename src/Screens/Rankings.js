import React, { useEffect } from 'react';
import IccRankings from '../RapidApi/Stats/IccRankings';
import IccRecords from '../RapidApi/Stats/IccRecords';
import { googleAnalytics } from '../googleAnalytics/utils';

function Point_Table(props) {

    useEffect(() => {
        googleAnalytics()
    }, [])

    return (
        <div>
            <IccRankings />
            <IccRecords />
        </div>
    );
}

export default Point_Table;