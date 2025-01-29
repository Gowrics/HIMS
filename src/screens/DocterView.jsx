import React, { useContext, useEffect, useState } from "react";
import PageHead from "../Component/PageHead";
import { useParams } from "react-router";
import { FormContext } from "../FormContext";

const DocterView = () => {
  const { docterData } = useContext(FormContext);
  const { id } = useParams();
  const [deptDocters, setDeptDocters] = useState([]);

  // UseEffect to filter doctors based on department id
  useEffect(() => {
    if (id) {
      const filteredDoctors = docterData.filter(
        (docter) => docter.department.deptCode === Number(id)
      );
      setDeptDocters(filteredDoctors);
    } else {
      setDeptDocters(docterData);
    }
  }, [id, docterData]); // Add docterData to dependencies to avoid stale data

  return (
    <>
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
              <div className="col slide-up" key={doctor.deptCode}>
                <div className="card">
                  <img
                    src={doctor.drImg} // Ensure drImg exists in your data
                    className="card-img-top"
                    width={"50px"}
                    height={"300px"}
                    alt={doctor.drDesignation}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{doctor.doctorName}</h5>
                    <p className="card-text">{doctor.drDesignation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DocterView;
