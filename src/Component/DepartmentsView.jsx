import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { cards } from "../assets/ArrayData";
import { Link } from "react-router";
import PageHead from "./PageHead";

const DepartmentsView = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  return (
    <section className="page-content">
      <PageHead
        heading="About Us"
        title="Tackle The Challenge Of Delivering Health Care"
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo alias earum recusandae ipsa cum? Inventore totam eius expedita sint asperiores eos, corrupti, distinctio fuga reiciendis possimus, dolore labore. Rerum, esse?"
      />
      {/* Card Display */}
      <div className="row deptview row-cols-md-3 m-5 g-5">
        {cards.map((card) => (
          <div className="col" key={card.id}>
            <div
              className="card"
              onClick={() => setSelectedCard(card)} // Set the selected card
              style={{ cursor: "pointer" }}
            >
              <img
                src={card.img}
                className="card-img-top"
                width={"50px"}
                height={"200px"}
                alt={card.title}
              />
              <div className="card-body">
                <h5 style={{ color: "#E22454" }} className="card-title">
                  {card.title}
                </h5>
                <p className="card-text">{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                <h5 className="modal-title">{selectedCard.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedCard(null)} // Close button
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedCard.img}
                  className="img-fluid mb-3"
                  alt={selectedCard.title}
                />
                <p>{selectedCard.text}</p>
                <Link
                  className="btn btn-lg me-4"
                  style={{ backgroundColor: "#122738", color: "white" }}
                  to={`/docterview/${selectedCard.id}`}
                >
                  View Docters
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
  );
};

export default DepartmentsView;
