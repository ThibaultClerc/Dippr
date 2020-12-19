import React, { useState } from 'react';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #4A90E2;
`;

const Loader = () => {
  const [loading, setLoading] = useState(true)
  
  return (
    <div className="sweet-loading">
      <PulseLoader
        css={override}
        size={15}
        color={"#F5436D"}
        loading={loading}
      />
    </div>
  );
}

export default Loader
