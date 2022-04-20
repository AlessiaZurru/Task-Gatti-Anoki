import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";

function Feed() {
  const [imageArray, setImageArray] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // codice2
    async function fetching() {
      console.log(imageArray, counter);
      const res = await axios.get("https://api.thecatapi.com/v1/images/search");
      if (counter > 8) {
        let items = [...imageArray];
        items[counter % 9] = res.data[0].url;
        setImageArray(items);
        setCounter(counter + 1);
      } else {
        setImageArray([...imageArray, res.data[0].url]);
        setCounter(counter + 1);
      }
    }

    setTimeout(() => {
      fetching();
    }, 1000);
  }, [imageArray, counter]);

  function handleClick() {
    setCounter(0);
    setImageArray([]);
  }

  return (
    <>
      <Container fluid>
        <button onClick={handleClick} className="button">
          Cliccami
        </button>
        <Row>
          {imageArray.map((element, index) => {
            return (
              <Col lg={4} xs={12} key={index}>
                <div className="image--container">
                  <img src={element} alt={index} className="image" />
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Feed;
