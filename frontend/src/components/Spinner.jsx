import React from 'react'
import {HashLoader} from "react-spinners"

const Spinner = () => {
  return (
    <>
      <section
        style={{
          minHeight: "525px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HashLoader size={30} />
      </section>
    </>
  );
}

export default Spinner
