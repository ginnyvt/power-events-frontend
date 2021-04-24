import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

import SingleEvent from '../Events/SingleEvent/SingleEvent';
import Spinner from '../Spinner/Spinner';

const Home = () => {
  const [key, setKey] = useState('upcoming');

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const handleChange = (key) => {
    setKey(key);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('http://localhost:5000/events', {
        params: {
          type: key,
        },
      });

      if (key === 'upcoming') {
        setUpcomingEvents(data.results);
        // if ((data.results.length = 0)) {
        //   setMessage(
        //     'There are recently no events being organized. Please subscribe to get the lastest updates once new events are released!'
        //   );
        // }
      }

      if (key === 'past') {
        setPastEvents(data.results);
        setDisableBtn(true);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [key]);

  return (
    <section>
      <div className='container'>
        <Tabs
          id='controlled-tab-events'
          activeKey={key}
          onSelect={handleChange}
        >
          <Tab eventKey='upcoming' title='Upcoming Events'>
            {loading && <Spinner />}
            <p className='mt-5'>{message}</p>
            <Container className='mt-5'>
              <Row>
                {upcomingEvents.map((event) => {
                  return (
                    <Col
                      key={event._id}
                      className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3'
                    >
                      <SingleEvent event={event} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Tab>

          <Tab eventKey='past' title='Past Events'>
            {loading && <Spinner />}
            <Container className='mt-5'>
              <Row>
                {pastEvents.map((event) => {
                  return (
                    <Col
                      key={event._id}
                      className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3'
                    >
                      <SingleEvent event={event} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default Home;
