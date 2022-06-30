import React from 'react';
import IccRankings from '../RapidApi/Stats/IccRankings';
import IccRecords from '../RapidApi/Stats/IccRecords';

function Point_Table(props) {

    return (
        <div>
            <IccRankings />
            <IccRecords />
        </div>
    );
}

export default Point_Table;