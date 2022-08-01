import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AlertBox() {

    const navigate = useNavigate();

    return (
        // <div>
            <>
                <Alert variant="danger">
                    <Alert.Heading>No Data Found</Alert.Heading>
                    <hr />
                    <p>
                        Please press More Mathces button to view another mathches
                    </p>
                    <div className="d-flex justify-content-center">
                        <Button onClick={() => navigate('/')} variant="outline-secondary">
                            More Matches
                        </Button>
                    </div>
                </Alert>

                {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
            </>
        // {/* </div> */}
    );
}

export default AlertBox;