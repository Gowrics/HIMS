import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { cards } from "../assets/ArrayData";
import { Link } from "react-router";
import PageHead from "./PageHead";
import { FormContext } from "../FormContext";
import Breadcrumbs from "./BreadCrumbs";

const DepartmentsView = () => {
  const { departmentData } = useContext(FormContext);

  const [selectedCard, setSelectedCard] = useState(null);
  return (
    <>
      <section className="page-content slide-up">
        <PageHead
          heading="About Us"
          title="Tackle The Challenge Of Delivering Health Care"
          text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo alias earum recusandae ipsa cum? Inventore totam eius expedita sint asperiores eos, corrupti, distinctio fuga reiciendis possimus, dolore labore. Rerum, esse?"
        />
        {/* Card Display */}
        {departmentData.length === 0 ? (
          <p>No departments.</p>
        ) : (
          <div className="row deptview row-cols-md-3 m-5 g-5">
            {departmentData.map((card) => (
              <div className="col" key={card.deptCode}>
                <div
                  className="card"
                  onClick={() => setSelectedCard(card)} // Set the selected card
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={card.deptImage}
                    className="card-img-top"
                    width={"50px"}
                    height={"200px"}
                    alt={card.title}
                  />
                  <div className="card-body">
                    <span>
                      {" "}
                      <h5 style={{ color: "#E22454" }} className="card-title">
                        {card.deptName}
                      </h5>{" "}
                      <h5 style={{ color: "#E22454" }} className="card-title">
                        {card.deptNameFl}
                      </h5>
                    </span>
                    <p className="card-text">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedCard && (
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setSelectedCard(null)} // Close the modal when background is clicked
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedCard.deptName}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedCard(null)} // Close button
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={selectedCard.deptImage}
                    className="img-fluid mb-3"
                    alt={selectedCard.deptName}
                  />
                  <p>{selectedCard.deptName}</p>
                  <Link
                    className="btn btn-lg me-4"
                    style={{ backgroundColor: "#122738", color: "white" }}
                    to={`/docterview/${selectedCard.deptCode}`}
                  >
                    View Doctors
                  </Link>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedCard(null)} // Close button
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default DepartmentsView;
