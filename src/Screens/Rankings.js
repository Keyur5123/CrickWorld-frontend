import React, { useEffect } from 'react';
import IccRankings from '../Utils/RapidApi/Stats/IccRankings';
import IccRecords from '../Utils/RapidApi/Stats/IccRecords';
import { googleAnalytics } from '../Utils/googleAnalytics/utils';

function Point_Table(props) {

    useEffect(() => {
        googleAnalytics()
    }, [])

    return (
        <div className='mt-5'>
            <IccRankings />
            <IccRecords />
        </div>
    );
}

export default Point_Table;