import React, { useState } from 'react';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #4A90E2;
`;

const Loader = () => {
  const [loading, setLoading] = useState(true)
  
  return (
    <div className="sweet-loading">
      <ClipLoader
        css={override}
        size={35}
        color={"blue"}
        loading={loading}
      />
    </div>
  );
}

export default Loader
