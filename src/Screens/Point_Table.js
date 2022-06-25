import React from 'react';
import { Container } from 'react-bootstrap';

function Point_Table(props) {
    return (
        <div>
            <Container>
                <table cellSpacing="0" className='mt-2 Score_Table' style={{ width: "100%", boxShadow: "3px 6px 3px #ccc", backgroundColor: "#EEEEEE" }}>
                    <tr style={{ backgroundColor: "#BC8CF2" }}>
                        <th colSpan="6">Batsmen</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>R</th>
                        <th>B</th>
                        <th>4s</th>
                        <th>6s</th>
                        <th>SR</th>
                    </tr>
                    <tr >
                        <th>Virat kohali-</th>
                        <th>14</th>
                        <th>55</th>
                        <th>0</th>
                        <th>11</th>
                    </tr>
                    <tr>
                        <th>Virat kohali-</th>
                        <th>14</th>
                        <th>55</th>
                        <th>0</th>
                        <th>11</th>
                        <th>111.9</th>
                    </tr>
                </table>
            </Container>
        </div>
    );
}

export default Point_Table;