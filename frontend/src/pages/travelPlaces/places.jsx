import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";


export default function TravelPlace() {
  return (
    <div>
      
      <div class="container-fluid h-custom h-100">
        <div class="row d-flex justify-content-center align-items-center h-100s h-100">
            <div class="col-sm-9 col-md-6 col-lg-8 col-xl-12">
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Form>
                <label class="form-label" for="form3Example3">Select the places that you want to visit</label>
                <div>
                <InputGroup className="mb-4">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" placeholder="Central Province" />
                </InputGroup>
                </div>

                <div>
                <InputGroup className="mb-4">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" placeholder="North Western Province" />
                </InputGroup>
                </div>

                <div>
                <InputGroup className="mb-4">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" placeholder="Western Province" />
                </InputGroup>
                </div>
                
                <div>
                <InputGroup className="mb-4">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" placeholder="Eastern Province" />
                </InputGroup>
                </div>

                <div>
                <InputGroup className="mb-4">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" placeholder="Uva Province" />
                </InputGroup>
                </div>

                <div>
                <InputGroup className="mb-4">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" placeholder="Southern Province" />
                </InputGroup>
                </div>

                <div>
                <InputGroup className="mb-4">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" placeholder="Sabaragamuwa Province" />
                </InputGroup>
                </div>

                <div>
                <InputGroup className="mb-4">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" placeholder="North Central Province" />
                </InputGroup>
                </div>

                <div>
                <InputGroup className="mb-4">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" placeholder="Northern Province" />
                </InputGroup>
                </div>

                <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter number of dates</Form.Label>
                    <Form.Control type="email" placeholder="Enter number of dates that you wish to travel" />
                </Form.Group>
                <Button type = "submit">Submit</Button>
                </div>
                </Form>
            </div>
                
            </div>
        
        </div>
      
      </div>
    </div>
    
  );
  
}


