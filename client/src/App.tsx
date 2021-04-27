import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { IMovie } from '../../infrastructure/src/interfaces/movie';

function App() {
  const apiEndpoint = 'https://11xy11mvif.execute-api.us-east-1.amazonaws.com/prod/';
  const [movies, setMovies] = useState<Array<IMovie>>([]);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    axios
      .get(apiEndpoint)
      .then(({ data }) => {
        setMovies(data);
      })
      .catch((err) => {
        setError({ message: 'API ERROR' });
      });
  }, []);

  return (
    <Container fluid className="p-3">
      <Jumbotron>
        <h1 className="header text-center">Welcome to Movies Page</h1>
      </Jumbotron>
      <Form.Control as="select">
        <option>All</option>
        <option>...</option>
      </Form.Control>
      <br />
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Row>
        {movies &&
          movies.map((movie, i) => (
            <Col key={i} xs="4">
              <Card>
                <Card.Title className="mt-2 font-weight-bold text-center">{movie.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">{movie.genre}</Card.Subtitle>
                <Table striped bordered hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Length</th>
                      <th>Review Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{movie.length}</td>
                      <td> {movie.reviewScore}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default App;