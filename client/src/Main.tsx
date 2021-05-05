import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { IMovie } from '../../infrastructure/src/interfaces/movie';


function Main() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [length, setLength] = useState("");
  const [reviewScore, setReviewScore] = useState("");
  const [movies, setMovies] = useState<Array<IMovie>>([]);
  const [error, setError] = useState<{ message: string } | null>(null);
  const apiEndpoint = "https://11xy11mvif.execute-api.us-east-1.amazonaws.com/prod/";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    const res = await axios.post( 'https://11xy11mvif.execute-api.us-east-1.amazonaws.com/prod/', {title, genre, length, reviewScore});
    console.log(res);

    alert("Movie Review Added!");
    setTimeout(function(){window.location.reload();},10);
    }

   /* const deleteMovie = async (movieTitle) => {
      const res = await axios.get( 'https://11xy11mvif.execute-api.us-east-1.amazonaws.com/prod/', {movieTitle});
    console.log(res);
    } */

    return (
      <Container fluid className="p-3">
        <Jumbotron>
          <h1 className="header text-center">Welcome to Movies Page</h1>
        </Jumbotron>
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
        <br />
        <Form onSubmit={e => handleSubmit(e)}> 
        <Jumbotron>
          <h1 className="header text-center">Submit A Movie</h1>
        </Jumbotron>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput2">
        <Form.Label>Genre</Form.Label>
        <Form.Control type="text" name="genre" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput3">
        <Form.Label>Length</Form.Label>
        <Form.Control type="text" name="length" placeholder="Length in Minutes" value={length} onChange={(e) => setLength(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput4">
        <Form.Label>Review Score</Form.Label>
        <Form.Control type="text"  name="score" placeholder="Score /5" value={reviewScore} onChange={(e) => setReviewScore(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </Container>
    
    );
}


  
export default Main;