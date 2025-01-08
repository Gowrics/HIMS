import React, { useEffect, useState } from "react";
import PageHead from "../Component/PageHead";
import { doctors } from "../assets/ArrayData";
import { useParams } from "react-router";

const DocterView = () => {
  const { id } = useParams();
  const [deptDocters, setDeptDocters] = useState([]);
  console.log("selected id", id);
  console.log("select", doctors);

  useEffect(() => {
    if (id) {
      setDeptDocters(
        doctors.filter((docter) => docter.deptCode === Number(id))
      );
    } else {
      setDeptDocters(doctors);
    }
  }, [id]);
  if (!deptDocters) {
    setDeptDocters(doctors);
  }
  return (
    <div className="page-content">
      <PageHead
        heading="Our Doctor's"
        title="Our Expert Doctor's"
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo alias earum recusandae ipsa cum? Inventore totam eius expedita sint asperiores eos, corrupti, distinctio fuga reiciendis possimus, dolore labore. Rerum, esse?"
      />
      {deptDocters.length === 0 ? (
        <p>No doctors available for this department.</p>
      ) : (
        <div className="row deptview row-cols-md-3 m-5 g-5">
          {deptDocters.map((doctor) => (
            <div className="col" key={doctor.id}>
              <div className="card">
                <img
                  src={doctor.doctorImg} // Make sure to use doctorImg as per your data
                  className="card-img-top"
                  width={"50px"}
                  height={"300px"}
                  alt={doctor.doctorDesignation}
                />
                <div className="card-body">
                  <h5 className="card-title">{doctor.doctorName}</h5>
                  <p className="card-text">{doctor.doctorDesignation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocterView;
