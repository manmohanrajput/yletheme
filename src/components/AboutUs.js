import React, { useEffect, useState, useRef } from 'react';
// import Datas from "../data/about-us/about-us.json";
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ModalVideo from 'react-modal-video';
// import CountUp from "react-countup";
// import { StyleFun } from "./styles/aboutUs.js";
import { Styles } from './styles/aboutUs.js';
import { useClientStore } from './../contextProviders/clientContext';
import { Observer } from 'mobx-react';
// import { fetchVideo } from "./../apis/api";
import { useLocation } from 'react-router';
import { getColorObj } from './common/element/elements';
import { updateColorObj } from '../utility';

const AboutUs = () => {
  const clientStore = useClientStore();

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  // console.log(location)

  const [data, setData] = useState({});
  const [dataStatus, setDataStatus] = useState(false);
  const [toggle, setToggle] = useState(0);
  // const [Styles, setStyles] = useState(StyleFun(clientStore.colors));
  const [modalV, setModalV] = useState(false);

  useEffect(() => {
    setModalV(true);
  }, []);

  useEffect(() => {
    updateData();
  }, [toggle, dataStatus]);

  const updateData = () => {
    if (clientStore.instituteDetails['About Us'] !== undefined && !dataStatus) {
      let obj = {
        mainImage: clientStore.instituteDetails["aboutus_image"],
        defImg: "https://speedlabs.s3.ap-south-1.amazonaws.com/EduCms/about%20us.png",
        videoBackground: 'vd-bg.jpg',
        title:
          'We Have Experienced Professionals & We Do Our Best To Achieve Your Goal. Your Happiness Is Our First Priority.',
        desc1: clientStore.instituteDetails['About Us'],
      };
      setData(obj);
      setDataStatus(true);
      console.log("ABout US", obj.mainImage)
    }
    if (!dataStatus) setToggle(toggle + 1);
  };

  return (
    <Observer>
      {() => {
        return dataStatus ? (
          <Styles colors={clientStore.colors}>
            {/* About Us */}
            <section className='about-us'>
              <Container>
                <Row>
                  <Col md='6'>
                    <div className='about-image'>
                      {dataStatus ? (
                        <img src={data.mainImage && data.mainImage.length > 0 ? (data.mainImage) : (data.defImg)} className='main-img' alt='about-img?' />
                      ) : (
                        null
                      )}
                      <img
                        src={
                          process.env.PUBLIC_URL + '/assets/images/pattern.png'
                        }
                        className='pattern-img'
                        alt=''
                      />
                      {/* {modalV ? (<div
                        className="video-player"
                        style={{
                          backgroundImage: `url(https://yt3.ggpht.com/ytc/AKedOLQBuw62seqtR718dImbTQ0J1ilmg6ouCTS1nbyncQA=s900-c-k-c0x00ffffff-no-rj)`,
                        }}
                      >
                        <ModalVideo
                          channel="youtube"
                          isOpen={isOpen}
                          videoId="uXFUl0KcIkA"
                          onClose={() => setIsOpen(false)}
                        />
                        <button onClick={() => setIsOpen(true)} className="play-button">
                          <i className="las la-play"></i>
                        </button>
                      </div>) : null} */}
                    </div>
                  </Col>
                  <Col md='6'>
                    <div className='about-content'>
                      <h4 className='about-title'>{data.title}</h4>
                      <p className='about-para'>
                        {dataStatus ? (
                          <span
                            dangerouslySetInnerHTML={{ __html: data.desc1 }}
                          ></span>
                        ) : (
                          <span>
                            {data.desc1}
                            <span>{data.desc2}</span>
                          </span>
                        )}
                      </p>
                      {location.pathname !==
                      process.env.PUBLIC_URL + '/about' ? (
                        <Link
                          className='readmore-btn'
                          to={process.env.PUBLIC_URL + '/about'}
                        >
                          Read More
                        </Link>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Styles>
        ) : null;
      }}
    </Observer>
  );
};

export default AboutUs;
