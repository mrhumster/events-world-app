import {useGetLoggerItemQuery, useGetUserDataQuery} from "../services/backend";
import {LoggerIFace} from "../types";
import {Navigationbar} from "../components";
import React from "react";
import {Button, Container, Table} from "react-bootstrap";
import logger from "./logger";

export const Log = () => {
  const {data, refetch, isLoading} = useGetLoggerItemQuery({})
  const user_data = useGetUserDataQuery({})
  const current_theme = user_data.data?.data[0].theme
  return (
    <div className={current_theme === 'light' ? 'bg-light' : 'bg-dark'} style={{height: '100vh'}} data-bs-theme={current_theme}>
      <Navigationbar></Navigationbar>

      <Container className="pt-5">
        <Button className='my-3' variant='outline-secondary' onClick={() => {logger.clear(); refetch()}}>Очистить данные</Button>
        <Table striped bordered hover size="sm">
          <thead>
          <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Описание</th>
          </tr>
          </thead>
          <tbody>
          {data && data.map((item: LoggerIFace, index: number) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td><code>{new Date(item.datetime).toLocaleString()}</code></td>
              <td>{item.description}</td>
            </tr>
          )}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}