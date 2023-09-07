import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useEffect, useState} from "react";

export const SearchInput = () => {
    const [search, setSearch] = useState<String>('')
    const handleChange = (e:any):void => {
        setSearch(e.currentTarget.value)
    }

    useEffect(() => {
        console.log(search)
    }, [search])

    return (
        <Form>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Поиск"
              className=" mr-sm-2"
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
      </Form>
    )
}