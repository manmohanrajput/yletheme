import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { useClientStore } from "./../../../contextProviders/clientContext";
import { fetchCourseDetails } from "./../../../apis/api";
import { nanoid } from "nanoid";
import Loader from '../../../Loader';
import courseImage  from '../../../images/Science.png'
const CourseItemList = () => {

    const clientStore = useClientStore();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])



    const [dataArray, setDataArray] = useState([]);
    const [dataStatus, setDataStatus] = useState(false)
    const [empty, setEmpty] = useState(true)
    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        const res = await fetchCourseDetails(clientStore.webHash, 3);

        if (res.status === "success") {
            clientStore.hideCourseList.bread = true
            setDataArray(buildCourse(res.response));
            console.log("Course List :",res.response);
            setDataStatus(true)
        }
        else {
            setEmpty(true)
            clientStore.hideCourseList.list = true
        }

    };



    const buildCourse = (res) => {
        let arr = [];

        for (let i = 0; i < res.length; i++) {
            let obj = {
                id: nanoid(),
                imgUrl: res[i]["course_image"],
                authorImg: "author.jpg",
                authorName: "John Doe",
                authorCourses: "13 Courses",
                price: "$20",
                courseSlug: res[i]["course_slug"],
                courseTitle: res[i]["course_name"],
                courseDesc: res[i]["course_detail"],
                courseLink: `/course-details/${res[i]["course_slug"]}`,
            };
            // console.log("Gallery Images:",imgUrl);
            arr.push(obj);
        }
       
        return arr;
    };

    return dataStatus ? (
        <Fragment>

            {dataArray.map((data, i) => (
                <Col md="12" key={i}>
                    <div className="course-item d-flex">
                        <div className="course-image-box">
                            <div className="course-image"
                                // style={{
                                //     // backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${data.imgUrl})`
                                //     backgroundImage: `url(${data.imgUrl})`
                                // }}
                                >
                                    
                                <img src={data.imgUrl &&  data.imgUrl.length>0 ? data.imgUrl : courseImage} style={{height:'240px',width:'250px'}} alt="courseImg-default"/>
                                    
                                   
                                   
                            </div>
                        </div>
                        <div className="course-content">
                            <h6 className="heading"><Link to={process.env.PUBLIC_URL + data.courseLink}>{data.courseTitle}</Link></h6>
                            <p className="desc" dangerouslySetInnerHTML={{ __html: `${data.courseDesc.slice(0, 150)} ...` }}></p>
                            <Link className="details-btn" to={process.env.PUBLIC_URL + data.courseLink}>View Details</Link>
                        </div>
                    </div>
                </Col>
            ))
            }
        </Fragment>
    ) : (empty ? (null) : <Loader />);

}

export default CourseItemList
