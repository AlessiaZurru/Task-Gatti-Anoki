import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";

function Feed() {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  function handleClick() {
    console.log(imageArray);
  }
  const [imageArray, setImageArray] = useState([]);

  const executeLoop = async () => {
    for (let i = 0; i < 8; i++) {
      const res = await axios.get("https://api.thecatapi.com/v1/images/search");
      let items = [...imageArray]; // problema di fondo
      if (items[i]) {
        items[i] = res.data[0].url;
        setImageArray(items);
      } else setImageArray((prev) => [...prev, res.data[0].url]);
      await timer(5000);
    }
  };

  useEffect(() => {
    // codice2
    async function fetching() {
      executeLoop();
      setInterval(() => {
        executeLoop();
      }, 5000 * 8);
    }
    fetching();
  }, []);

  return (
    <>
      <Container fluid>
        <button onClick={handleClick}>cliccami</button>
        <Row>
          {imageArray.map((element, index) => {
            return (
              <Col lg={4} xs={12} key={index}>
                <img src={element} alt={index} className="img-fluid" />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Feed;
