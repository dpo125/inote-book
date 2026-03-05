import React from 'react'

const Alert = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="alert mb-4 shadow-lg rounded"
        role="alert"
        style={{
          width: "24rem",
          margin: "1.5rem",
          borderLeft: "6px solid",
          borderImage: "linear-gradient(to bottom, #FF9A8B, #FF6A88, #FF99AC) 1",
          backgroundColor: "#FFF8F0",
          color: "#333",
          fontWeight: "600",
          transition: "transform 0.2s, box-shadow 0.2s",
          border: "none",
          borderRadius: "12px",
          padding: "1.5rem"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
        }}
      >
        <div className="d-flex align-items-center">
          <i 
            className="fas fa-info-circle me-3" 
            style={{
              fontSize: "1.5rem",
              background: "linear-gradient(to right, #FF9A8B, #FF6A88, #FF99AC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          ></i>
          <span className="fs-6" style={{color: "#333"}}>{props.message}</span>
        </div>
      </div>
    </div>
  )
}

export default Alert